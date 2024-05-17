import React, { ComponentType, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { recoverData } from "../utils/main";
import { useSettings } from "../contexts/SettingsContext";
import { useAuth } from "../contexts/AuthContext";
import { CustomDrawer } from "../components/main";
import { SignUp, SignIn, Home, Translate, Camera } from "../screens/main";
import {
  stackScreenSignInOptions,
  stackScreenSignUpOptions,
  drawerScreenOptions,
  stackScreenDrawerOptions,
  stackScreenAuthScreensOptions,
  stackScreenCameraOptions,
  stackScreenCameraScreensOptions,
} from "./Styles";

const PaperProviderTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d48405",
    secondary: "#ffffff",
  },
};

type MaterialCommunityIconName =
  keyof (typeof MaterialCommunityIcons)["glyphMap"];
type MaterialIconName = keyof (typeof MaterialIcons)["glyphMap"];

interface MenuOption {
  id: number;
  name: string;
  icon: MaterialCommunityIconName | MaterialIconName;
  title: string;
  component: ComponentType<any>;
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthScreens = () => {
  return (
    <Stack.Navigator initialRouteName="signIn">
      <Stack.Group>
        <Stack.Screen
          name="signIn"
          component={SignIn}
          options={stackScreenSignInOptions}
        />
        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={stackScreenSignUpOptions}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const DrawerScreens = () => {
  const { user } = useAuth();

  const [screenMenu, setScreenMenu] = useState<MenuOption[]>([
    {
      id: 1,
      name: "home",
      icon: "home",
      title: "Home",
      component: Home,
    },
    {
      id: 2,
      name: "translate",
      icon: "hand-okay",
      title: "Traduzir",
      component: Translate,
    },
  ]);

  const getIconComponent = (
    icon: MaterialCommunityIconName | MaterialIconName,
    size: number,
    color: string
  ) => {
    if (MaterialCommunityIcons.glyphMap[icon]) {
      return (
        <MaterialCommunityIcons
          name={icon as MaterialCommunityIconName}
          size={size}
          color={color}
        />
      );
    }
    if (MaterialIcons.glyphMap[icon]) {
      return (
        <MaterialIcons
          name={icon as MaterialIconName}
          size={size}
          color={color}
        />
      );
    }

    return (
      <MaterialCommunityIcons
        name="help-circle-outline"
        size={size}
        color={color}
      />
    );
  };

  const drawerAuthorizedScreenOptions = (screen: {
    icon: MaterialCommunityIconName | MaterialIconName;
    title: string;
  }): DrawerNavigationOptions => {
    return {
      drawerIcon: () => getIconComponent(screen.icon, 20, "#000000"),
      drawerStyle: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "#ffffff",
      },
      headerStyle: {
        backgroundColor: "#d48405",
      },
      headerTitleStyle: {
        color: "#ffffff",
        textAlign: "center",
      },
      headerTitleAlign: "center",
      title: screen.title,
      drawerItemStyle: {
        padding: 2,
      },
    };
  };

  useEffect(() => {
    const numbersArray = [99];

    const filterScreens = () => {
      const filteredMenu = screenMenu.filter(
        (screen) => !numbersArray.includes(screen.id)
      );

      setScreenMenu(filteredMenu);
    };

    filterScreens();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={drawerScreenOptions}
    >
      <Drawer.Group>
        {screenMenu.map((screen) => (
          <Drawer.Screen
            key={screen.id}
            name={screen.name}
            component={screen.component}
            options={drawerAuthorizedScreenOptions({
              icon: screen.icon,
              title: screen.title,
            })}
          />
        ))}
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

const CameraScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="camera"
          component={Camera}
          options={stackScreenCameraOptions}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default function Navigation() {
  const { isStatusBarHidden } = useSettings();
  const { authenticate } = useAuth();

  const getUserData = async () => {
    const userDataStr = await recoverData("userData");

    if (userDataStr) {
      const userData = JSON.parse(userDataStr);

      authenticate(userData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
    };

    fetchData();
  }, []);

  return (
    <PaperProvider theme={PaperProviderTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* {userIsLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="drawerScreens"
              component={DrawerScreens}
              options={stackScreenDrawerOptions}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="authScreens"
              component={AuthScreens}
              options={stackScreenAuthScreensOptions}
            />
          </Stack.Group>
        )} */}
          <Stack.Group>
            <Stack.Screen
              name="drawerScreens"
              component={DrawerScreens}
              options={stackScreenDrawerOptions}
            />
            <Stack.Screen
              name="cameraScreens"
              component={CameraScreens}
              options={stackScreenCameraScreensOptions}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={isStatusBarHidden} style="inverted" />
    </PaperProvider>
  );
}
