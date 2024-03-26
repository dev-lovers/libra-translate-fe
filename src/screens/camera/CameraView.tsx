import React, { useState, useEffect } from "react";
import { Dimensions, Linking, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  Text,
  Dialog,
  Portal,
  IconButton,
  Button,
} from "react-native-paper";
import { Camera, CameraType, FlashMode, AutoFocus } from "expo-camera";
import { useSettings } from "../../contexts/SettingsContext";

export default function CameraView({ navigation }) {
  const isFocused = useIsFocused();
  const { isStatusBarHidden, toggleStatusBar } = useSettings();

  const [hasPermission, setHasPermission] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(true);
  const { width: winWidth, height: winHeight } = Dimensions.get("window");
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraFlashMode, setCameraFlashMode] = useState(FlashMode.off);

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onCameraReady = () => {
    console.log("onCameraReady");
  };

  const toggleCameraType = () => {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleCameraFlashMode = () => {
    setCameraFlashMode((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  };

  const navigateToTranslateScreen = () => {
    navigation.navigate("drawerScreens", { screen: "translate" });
  };

  const handleCogButton = () => {
    navigateToTranslateScreen();
    Linking.openSettings();
  };

  const handleCloseButton = () => {
    navigateToTranslateScreen();
  };

  const handleCameraFlipButton = () => toggleCameraType();

  const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  useEffect(() => {
    if (isFocused && !isStatusBarHidden) {
      toggleStatusBar();
    }
  }, [isFocused, isStatusBarHidden]);

  useEffect(() => {
    if (hasPermission === false) {
      showDialog();
    }
  }, [hasPermission]);

  if (hasPermission === null) {
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

  if (hasPermission === false) {
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
            <Button
              icon="cog-outline"
              mode="contained"
              onPress={handleCogButton}
            >
              Acessar configurações
            </Button>
            <Portal>
              <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                <Dialog.Title>Permissão de Câmera</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">
                    Por favor, conceda permissão de acesso à câmera nas
                    configurações do dispositivo.
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Fechar</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Camera
        onCameraReady={onCameraReady}
        style={{
          flex: 1,
          position: "absolute",
          height: winHeight,
          width: winWidth,
        }}
        ratio="16:9"
        type={cameraType}
        flashMode={cameraFlashMode}
        autoFocus={AutoFocus.auto}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            <IconButton
              icon="close"
              iconColor="#ffffff"
              size={50}
              onPress={handleCloseButton}
            />
            <IconButton
              icon="camera-flip"
              iconColor="#ffffff"
              size={50}
              onPress={handleCameraFlipButton}
            />
            <IconButton
              icon={cameraFlashMode === FlashMode.off ? "flash-off" : "flash"}
              iconColor="#ffffff"
              size={50}
              onPress={toggleCameraFlashMode}
            />
          </View>
        </View>
      </Camera>
    </View>
  );
}
