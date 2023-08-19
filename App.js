import React from "react";
import { View } from "react-native";

import LoginScreen from "./src/login";
import Map from "./src/map";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen/> 
      {/* <Map/> */}
    </View>
  );
};

export default App;
