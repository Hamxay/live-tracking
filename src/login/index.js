import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { firebaseSignIn } from '../firebase/utils';
import Map from '../map';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    if (username && password) {
      setIsLoading(true); // Start loading
      const obj = {
        email: username,
        password,
      };
      firebaseSignIn(obj)
        .then(res => {
          if (res) {
            setUserData(res);
            setLogin(false);
          }
        })
        .catch(err => {
          console.log({"Error due to": JSON.stringify(err)});
        })
        .finally(() => {
          setIsLoading(false); // Stop loading, whether success or error
        });
    } else {
      Alert.alert('Error', 'Please enter both email and password.');
    }
  };

  return (
    <>
      {login ? (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {/* Show loading indicator or sign-in button */}
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Button title="Sign In" onPress={handleSignIn} />
          )}
        </View>
      ) : (
        <Map user={userData} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginScreen;
