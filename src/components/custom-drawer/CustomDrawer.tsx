import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";

export default function CustomDrawer(props: any) {
  const { user } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
              }}
            >
              {/* <Avatar.Image
                size={100}
                source={require("../../assets/images/avatar.png")}
              /> */}
              <Avatar.Icon icon="account" size={100} color="#000000" />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {user?.name}
              </Text>
            </View>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 5,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              Versão 1.0.0
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
