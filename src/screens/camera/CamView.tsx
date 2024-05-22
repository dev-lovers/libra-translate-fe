import React, { useState, useEffect, useRef } from "react";
import { Linking, View, Dimensions } from "react-native";
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
import { LoadingDots } from "@mrakesh0608/react-native-loading-dots";

const windowHeight = Dimensions.get("window").height;
const cardHeight = windowHeight * 0.6;

export default function CamView({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraIsReady, setCameraIsReady] = useState<boolean>(false);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("front");
  const cameraRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);

  const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);

  const navigateToTranslateScreen = () =>
    navigation.navigate("drawerScreens", { screen: "translate" });

  const handleCogButton = () => {
    navigateToTranslateScreen();
    Linking.openSettings();
  };

  const requestCameraPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const microphonePermission =
      await Camera.requestMicrophonePermissionsAsync();

    setHasPermission(
      cameraPermission.granted === true && microphonePermission.granted === true
    );
  };

  const onCameraReady = () => {
    setCameraIsReady(true);
  };

  const toggleCameraFacing = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const handleCameraFlipButton = () => toggleCameraFacing();

  const startStreaming = async () => {
    // if (cameraRef.current) {
    //   try {
    //     const options = {
    //       quality: 0.5,
    //       base64: true,
    //       onPictureSaved: (data) => {
    //         console.log(data.base64);
    //       },
    //     };
    //     const id = setInterval(async () => {
    //       await cameraRef.current.takePictureAsync(options);
    //     }, 100);
    //     setIntervalId(id);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  useEffect(() => {
    requestCameraPermissions();

    if (hasPermission === false) {
      showDialog();
    }

    if (cameraIsReady) {
      startStreaming();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }

      setCameraIsReady(false);
    };
  }, [hasPermission, cameraIsReady]);

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
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
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
            <LoadingDots animation="typing" size={15} />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            height: cardHeight,
            width: "95%",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <View style={{ height: "100%" }}>
            <CameraView
              style={{ flex: 1 }}
              ref={cameraRef}
              onCameraReady={onCameraReady}
              facing={facing}
              videoQuality="720p"
            />
          </View>
        </Card>
        <View
          style={{ flexDirection: "column", alignItems: "center", padding: 5 }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
          >
            <IconButton
              icon="camera-flip"
              iconColor="#000000"
              size={60}
              onPress={handleCameraFlipButton}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
