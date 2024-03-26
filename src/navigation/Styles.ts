import { StackNavigationOptions } from "@react-navigation/stack";
import { DrawerNavigationOptions } from "@react-navigation/drawer";

const stackScreenOptions: StackNavigationOptions = {
  headerTintColor: "#ffffff",
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#d48405",
  },
  headerTitleStyle: {
    color: "#ffffff",
    textAlign: "center",
  },
};

const stackScreenSignInOptions = (): StackNavigationOptions => {
  return {
    ...stackScreenOptions,
    title: "Login",
  };
};

const stackScreenSignUpOptions = (): StackNavigationOptions => {
  return {
    ...stackScreenOptions,
    title: "Cadastrar",
  };
};

const drawerScreenOptions = (): DrawerNavigationOptions => {
  return {
    headerTintColor: "#ffffff",
    drawerItemStyle: {
      padding: 2,
    },
  };
};

const stackScreenDrawerOptions: StackNavigationOptions = {
  headerShown: false,
};

const stackScreenAuthScreensOptions: StackNavigationOptions = {
  headerShown: false,
};

const stackScreenCameraOptions = (): StackNavigationOptions => {
  return {
    ...stackScreenOptions,
    headerShown: false,
  };
};

const stackScreenCameraScreensOptions: StackNavigationOptions = {
  headerShown: false,
};

export {
  stackScreenSignInOptions,
  stackScreenSignUpOptions,
  drawerScreenOptions,
  stackScreenDrawerOptions,
  stackScreenAuthScreensOptions,
  stackScreenCameraOptions,
  stackScreenCameraScreensOptions,
};
