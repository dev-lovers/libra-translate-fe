import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Card, IconButton, List } from "react-native-paper";
import { useSettings } from "../../contexts/SettingsContext";

interface DataItem {
  id: number;
  icon: string;
  text: string;
}

export default function Translate({ navigation }) {
  const { isStatusBarHidden, toggleStatusBar } = useSettings();
  const [data, setData] = useState<DataItem[]>([
    {
      id: 1,
      icon: "numeric-1-circle",
      text: "Localize o botão que contém o ícone da câmera e clique sobre ele.",
    },
    {
      id: 2,
      icon: "numeric-2-circle",
      text: "Uma nova tela será aberta, exibindo a câmera do dispositivo.",
    },
    {
      id: 3,
      icon: "numeric-3-circle",
      text: "Posicione suas mãos ou gestos na frente da câmera de forma clara e visível.",
    },
    {
      id: 4,
      icon: "numeric-4-circle",
      text: "Aguarde alguns segundos enquanto o sistema detecta e identifica seus gestos.",
    },
    {
      id: 5,
      icon: "numeric-5-circle",
      text: "Os gestos identificados serão exibidos na tela ou em um feedback visual.",
    },
  ]);
  const isFocused = useIsFocused();

  const handleIconButtonCamera = () => {
    navigation.navigate("cameraScreens", { screen: "camera" });
  };

  useEffect(() => {
    if (isFocused && !!isStatusBarHidden) {
      toggleStatusBar();
    }
  }, [isFocused, isStatusBarHidden]);

  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, justifyContent: "flex-start", padding: 5 }}>
        <View style={{ flexDirection: "column", padding: 5 }}>
          <View style={{ flexDirection: "column", padding: 5 }}>
            <Card>
              <Card.Title
                title="Instruções"
                titleStyle={{ textAlign: "center", fontSize: 20 }}
              />
              <Card.Content>
                {data.map((data: DataItem) => (
                  <List.Item
                    key={data.id}
                    titleNumberOfLines={3}
                    title={data.text}
                    left={(props) => <List.Icon {...props} icon={data.icon} />}
                  />
                ))}
              </Card.Content>
            </Card>
          </View>
        </View>
        <View
          style={{ flexDirection: "column", alignItems: "center", padding: 5 }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
          >
            <IconButton
              icon="camera"
              iconColor="#000000"
              size={50}
              mode="outlined"
              onPress={handleIconButtonCamera}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
