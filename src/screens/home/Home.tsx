import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ textAlign: "center" }}>Home Page</Text>
    </View>
  );
}
