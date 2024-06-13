import { Camera, CameraType, FlashMode, CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system";
import React, { useState, useEffect, useRef } from "react";
import { Linking, View, Dimensions } from "react-native";
import {
  ActivityIndicator,
  Card,
  Text,
  Dialog,
  Portal,
  IconButton,
  Button,
} from "react-native-paper";
import uploadImage from "../../services/translate";

interface ImageData {
  base64: string;
  height: number;
  uri: string;
  width: number;
}

const windowHeight = Dimensions.get("window").height;
const cardHeight = windowHeight * 0.6;

export default function CamView({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const cameraRef = useRef(null);
  const [cameraIsReady, setCameraIsReady] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("front");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [hasError, setHasError] = useState<boolean>(false);
  const [letter, setLetter] = useState<string>("");

  const showDialog = () => setVisibleDialog(!visibleDialog);
  const hideDialog = () => setVisibleDialog(!visibleDialog);

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

  const toggleCameraflash = () =>
    setFlash((current) => (current === "off" ? "on" : "off"));

  const sendImage = async (imageData: ImageData) => {
    try {
      const data = {
        filename: `image_${Date.now()}.${imageData.uri.slice(-3)}`,
        content: imageData.base64,
      };

      const response = await uploadImage(data);

      if (response) {
        const predictedLetter: string = response.predicted_letters[0];
        setLetter(predictedLetter);
      } else {
        setHasError(!hasError);
      }

      showDialog();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const takePicture = async () => {
    if (cameraIsReady && cameraRef.current) {
      try {
        const options = {
          quality: 0.5,
          base64: true,
          onPictureSaved: (data: ImageData) => {
            sendImage(data);
          },
        };

        await cameraRef.current.takePictureAsync(options);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    requestCameraPermissions();

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
    <View style={{ flex: 1 }}>
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
          <View style={{ height: cardHeight }}>
            <CameraView
              ref={cameraRef}
              onCameraReady={onCameraReady}
              facing={facing}
              flash={flash}
              style={{ flex: 1 }}
            />
          </View>
        </Card>
        <View
          style={{ flexDirection: "column", alignItems: "center", padding: 5 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: 5,
            }}
          >
            <IconButton
              disabled={cameraIsReady && visibleDialog}
              icon={flash === "off" ? "flashlight-off" : "flashlight"}
              iconColor="#000000"
              size={60}
              onPress={toggleCameraflash}
            />
            <IconButton
              disabled={cameraIsReady && visibleDialog}
              icon="camera-iris"
              iconColor="#000000"
              size={60}
              onPress={async () => await takePicture()}
            />
            <IconButton
              disabled={cameraIsReady && visibleDialog}
              icon="camera-flip"
              iconColor="#000000"
              size={60}
              onPress={toggleCameraFacing}
            />
          </View>
        </View>
      </View>
      <Portal>
        <Dialog visible={visibleDialog}>
          <Dialog.Title>Tradução do Sinal</Dialog.Title>
          <Dialog.Content>
            {hasError ? (
              <Text variant="bodyMedium" style={{ color: "red" }}>
                Ocorreu um erro. Tente novamente.
              </Text>
            ) : (
              <>
                <Text variant="bodyMedium">
                  Confira a tradução da letra correspondente ao sinal em LIBRAS
                  que você fez:
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 50,
                    fontWeight: "bold",
                  }}
                >
                  {letter}
                </Text>
              </>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
