import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAllOrders } from './utils';

const FirebaseData = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getAllOrders()
      .then((data) => {
        if (data) {
          setData(data[0]);
        }
      })
      .catch((Err) => {
        console.log(Err);
      });

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text} key={data.id}>
        User ID = {data.id}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default FirebaseData;
