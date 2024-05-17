import React, { useState, useEffect, useRef } from "react";
import { Linking, View } from "react-native";
import { Camera, CameraType, CameraView } from "expo-camera";
import {
  ActivityIndicator,
  Card,
  Text,
  Dialog,
  Portal,
  IconButton,
  Button,
} from "react-native-paper";
import { SnackbarElement } from "../../components/main";

export default function CamView({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef(null);
  const [record, setRecord] = useState(null);
  const [visibleSnackbar, setVisibleSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);

  const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);

  const onDismissSnackBar = () => setVisibleSnackbar(false);

  const navigateToTranslateScreen = () =>
    navigation.navigate("drawerScreens", { screen: "translate" });

  const handleCogButton = () => {
    navigateToTranslateScreen();
    Linking.openSettings();
  };

  const toggleCameraFacing = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const handleCameraFlipButton = () => toggleCameraFacing();

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

  const requestCameraPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setHasPermission(cameraPermission.granted === true);
  };

  useEffect(() => {
    requestCameraPermissions();
  }, []);

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
            <Button
              icon="cog-outline"
              mode="contained"
              onPress={handleCogButton}
            >
              Acessar configurações
            </Button>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        padding: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Card style={{ width: "90%", borderRadius: 10, overflow: "hidden" }}>
          <View style={{ height: 300 }}>
            <CameraView
              ref={cameraRef}
              onCameraReady={onCameraReady}
              facing={facing}
              style={{ flex: 1 }}
            />
          </View>
        </Card>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton
              icon="camera-flip"
              iconColor="#000000"
              size={60}
              onPress={handleCameraFlipButton}
            />
          </View>
        </View>
      </View>
      {/* <View
        style={{ flexDirection: "column", alignItems: "center", padding: 5 }}
      >
        <SnackbarElement
          visible={visibleSnackbar}
          onDismissSnackBar={onDismissSnackBar}
          label="Fechar"
          labelColor="#ffffff"
          takeAction={navigateAndResetSnackbarMessage}
          backgroundColor="#000000"
          message={snackbarMessage}
        />
      </View> */}
    </View>
  );
}
