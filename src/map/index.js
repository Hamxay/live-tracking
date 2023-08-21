import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {updateOrder} from '../firebase/utils';

const MapContainer = ({user}) => {
  const [venderCoordinates, setVenderCoordinates] = useState(null);
  const [clientCoordinates, setClientCoordinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    // Fetch device location initially and set it to currentLocation
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
         const orderObj = {
          id: '1',
          coordinate: {latitude, longitude},
        };
        updateOrder(orderObj, user.role);
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );

    const unsubscribe = firestore()
      .collection('order')
      .onSnapshot(
        snapshot => {
          const data = snapshot.docs.map(doc => doc.data());
          if (data && data[0]) {
            if (data[0].vender_coordinates) {
              setVenderCoordinates(data[0].vender_coordinates);
            }
            if (data[0].client_coordinates) {
              setClientCoordinates(data[0].client_coordinates);
            }
          }
        },
        err => {
          console.log('Error fetching real-time updates:', err);
        },
      );

    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const orderObj = {
          id: '1',
          coordinate: {latitude, longitude},
        };
        // updateOrder(orderObj, 'vender');
        updateOrder(orderObj, user.role);
      },
      error => console.log(error),
      {enableHighAccuracy: true, distanceFilter: 10},
    );

    return () => Geolocation.clearWatch(watchID); // Clean up the listener
  }, []);

  return (
    <MapView style={{flex: 1}} initialRegion={currentLocation}>
      {venderCoordinates && (
        <Marker
          coordinate={venderCoordinates}
          title="Vendor"
          description="Vendor's Location"
        />
      )}

      {clientCoordinates && (
        <Marker
          coordinate={clientCoordinates}
          title="Client"
          description="Client's Location"
        />
      )}
    </MapView>
  );
};

export default MapContainer;
