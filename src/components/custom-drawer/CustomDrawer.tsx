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
          style={{ flexDirection: "column", alignItems: "center", padding: 5 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Avatar.Image
              size={100}
              source={require("../../assets/images/avatar.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            {/* <Text style={{ textAlign: "center" }}>{user.name}</Text> */}
            <Text style={{ textAlign: "center" }}>User Name</Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              icon={"logout"}
              mode="elevated"
              buttonColor="#ff0000"
              labelStyle={{ color: "#ffffff" }}
              style={{ width: 200, padding: 2 }}
              //   onPress={handleLogoutButton}
            >
              Sair
            </Button>
          </View>
        </View>
      </View> */}
    </DrawerContentScrollView>
  );
}
