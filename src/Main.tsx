import React from "react";
import { registerRootComponent } from "expo";
import { SafeAreaView } from "react-native-safe-area-context";
import App from "./App";

const SafeAreaViewStyle = { flex: 1, backgroundColor: "#d48405" };

export default function Main() {
  return (
    <SafeAreaView style={SafeAreaViewStyle}>
      <App />
    </SafeAreaView>
  );
}

registerRootComponent(Main);
