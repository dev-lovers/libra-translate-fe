import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Linking, View } from "react-native";
import { Camera, CameraType, FlashMode, AutoFocus } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  Text,
  Dialog,
  Portal,
  IconButton,
  Button,
} from "react-native-paper";
import { useSettings } from "../../contexts/SettingsContext";
import SnackbarElement from "../../components/snackbar/Snackbar";

export default function CameraView({ navigation }) {
  const isFocused = useIsFocused();
  const { isStatusBarHidden, toggleStatusBar } = useSettings();
  const [hasPermission, setHasPermission] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(true);
  const { width: winWidth, height: winHeight } = Dimensions.get("window");
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraFlashMode, setCameraFlashMode] = useState(FlashMode.off);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [record, setRecord] = useState(null);

  const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);

  const navigateToTranslateScreen = () =>
    navigation.navigate("drawerScreens", { screen: "translate" });

  const handleCogButton = () => {
    navigateToTranslateScreen();
    Linking.openSettings();
  };

  const toggleCameraType = () =>
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );

  const handleCameraFlipButton = () => toggleCameraType();

  const toggleCameraFlashMode = () =>
    setCameraFlashMode((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );

  const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);

  const onDismissSnackBar = () => setVisibleSnackbar(false);

  const startRecord = async () => {
    if (cameraRef) {
      try {
        // const data = await cameraRef.current.recordAsync({ quality: "4:3" });
        const data = await cameraRef.current.recordAsync();
        console.log(data.uri);
      } catch (error) {
        setSnackbarMessage(
          "Algo deu errado ao iniciar a gravação. Por favor, tente novamente mais tarde."
        );
        onToggleSnackBar();
      }
    }
  };

  const onCameraReady = () => {
    startRecord();
  };

  const navigateAndResetSnackbarMessage = () => {
    setSnackbarMessage("");
    navigateToTranslateScreen();
  };

  const stopRecord = () => {
    if (cameraRef) {
      try {
        cameraRef.current.stopRecording();
      } catch (e) {
        setSnackbarMessage("Algo deu errado ao finalizar a gravação.");
        onToggleSnackBar();
      }
    }
  };

  const handleCloseButton = () => {
    stopRecord();
    navigateToTranslateScreen();
  };

  const onMountError = () => {
    stopRecord();
    navigateAndResetSnackbarMessage();
  };

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  useEffect(() => {
    if (isFocused && hasPermission && !isStatusBarHidden) {
      toggleStatusBar();
    }
  }, [isFocused, hasPermission, isStatusBarHidden]);

  useEffect(() => {
    if (hasPermission === false) {
      showDialog();
    }
  }, [hasPermission]);

  const requestCameraPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const microphonePermission =
      await Camera.requestMicrophonePermissionsAsync();
    setHasPermission(
      cameraPermission.granted === true && microphonePermission.granted === true
    );
  };

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
        ref={cameraRef}
        onCameraReady={onCameraReady}
        onMountError={onMountError}
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
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <IconButton
              icon="close"
              iconColor="#ffffff"
              size={50}
              onPress={handleCloseButton}
            />
            <IconButton
              icon={cameraFlashMode === FlashMode.off ? "flash-off" : "flash"}
              iconColor="#ffffff"
              size={50}
              onPress={toggleCameraFlashMode}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton
                icon="camera-flip"
                iconColor="#ffffff"
                size={50}
                onPress={handleCameraFlipButton}
              />
            </View>
          </View>
        </View>
      </Camera>
      <SnackbarElement
        visible={visibleSnackbar}
        onDismissSnackBar={onDismissSnackBar}
        label="Fechar"
        labelColor="#ffffff"
        takeAction={navigateAndResetSnackbarMessage}
        backgroundColor="#000000"
        message={snackbarMessage}
      />
    </View>
  );
}
