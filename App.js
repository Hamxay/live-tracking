import React from "react";
import { View } from "react-native";

import LoginScreen from "./src/login";
import Map from "./src/map";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen/> 
      {/* <Map user={{role:'client'}}/> */}
    </View>
  );
};

export default App;
