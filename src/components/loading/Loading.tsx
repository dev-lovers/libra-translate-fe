import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
      }}
    >
      <View
        style={{ flexDirection: "column", alignItems: "center", padding: 5 }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
        >
          <ActivityIndicator animating={true} size="large" />
        </View>
      </View>
    </View>
  );
}
