import React, { useState, useEffect } from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Button,
  Card,
  Dialog,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { storeData } from "../../utils/main";
import { useAuth } from "../../contexts/AuthContext";
import { Loading } from "../../components/main";

interface User {
  token: string | null;
  id: number | null;
  name: string;
  email: string | null;
  unavailableScreens: number[] | null;
}

interface InformationCards {
  id: number;
  title: string;
  image: string;
  description: string;
}

export default function Home() {
  const { authenticate, user } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [informationCards, setInformationCards] = useState<InformationCards[]>([
    {
      id: 1,
      title: "O que são Linguagens de Sinais?",
      image:
        "https://img.freepik.com/vetores-premium/conjunto-de-diferentes-gestos-com-as-maos-ilustracoes-da-palma-da-mao-humana-mostrando-numeros-gesticulando-sinais_74855-20714.jpg?w=740",
      description:
        "Linguagens de sinais são sistemas de comunicação que utilizam gestos, expressões faciais e movimentos das mãos e do corpo para transmitir significados, sendo utilizadas principalmente por comunidades surdas.",
    },
    {
      id: 2,
      title: "LIBRAS",
      image: "https://picsum.photos/700",
      description:
        "LIBRAS (Língua Brasileira de Sinais) é a língua de sinais usada pela comunidade surda no Brasil. É reconhecida oficialmente como meio de comunicação e expressão.",
    },
    {
      id: 3,
      title: "História da LIBRAS",
      image:
        "https://www.handtalk.me/br/wp-content/uploads/sites/8/2017/04/122-capa-blogpost-historia-libras.png",
      description:
        "A LIBRAS tem suas origens no século XIX, com influências da língua de sinais francesa. Foi reconhecida oficialmente no Brasil em 2002 pela Lei nº 10.436.",
    },
    {
      id: 4,
      title: "Importância das Linguagens de Sinais",
      image:
        "https://academiadelibras.com/wp-content/uploads/2019/12/Dificuldades-dos-surdos-na-sociedade_1-1.jpg",
      description:
        "As linguagens de sinais permitem que pessoas surdas se comuniquem efetivamente, promovendo inclusão social, acesso à educação e participação em diversas atividades sociais.",
    },
    {
      id: 5,
      title: "Estrutura Gramatical da LIBRAS",
      image:
        "https://png.pngtree.com/png-clipart/20230824/original/pngtree-different-hand-gestures-on-blackboard-hand-sign-language-art-vector-png-image_10638901.png",
      description:
        "A LIBRAS possui uma estrutura gramatical própria, com regras específicas para a formação de frases, expressão de conceitos abstratos e uso de verbos.",
    },
    {
      id: 6,
      title: "Variações Regionais da LIBRAS",
      image:
        "https://static.todamateria.com.br/upload/ma/pa/mapadasregioesdobrasil2-cke.jpg",
      description:
        "Assim como as línguas faladas, a LIBRAS também possui variações regionais, com diferenças na forma de sinalizar certos conceitos e palavras.",
    },
    {
      id: 7,
      title: "Aquisição da Linguagem de Sinais por Crianças",
      image: "https://picsum.photos/700",
      description:
        "Crianças surdas podem adquirir a linguagem de sinais naturalmente, assim como crianças ouvintes adquirem a língua falada, por meio da interação com falantes nativos.",
    },
    {
      id: 8,
      title: "Desafios da Comunicação com Surdos",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTIvGOXWmWXzs0K0NyZDoORKW-y4-KONgbc7Mk715wg&s",
      description:
        "Apesar dos avanços na inclusão de surdos, ainda existem desafios na comunicação, como a falta de intérpretes em locais públicos e a falta de acesso a informações em LIBRAS.",
    },
  ]);

  const showDialog = () => setVisibleDialog(true);

  const dismissKeyboard = () => Keyboard.dismiss();

  const hideDialog = async () => {
    const userData: User = {
      token: null,
      id: null,
      name: userName,
      email: null,
      unavailableScreens: null,
    };

    await storeData("userData", userData);

    authenticate(userData);

    setVisibleDialog(false);
  };

  useEffect(() => {
    const fetchData = () => {
      if (!user) {
        setLoading(true);

        setTimeout(() => {
          showDialog();
        }, 1000);
      } else {
        setVisibleDialog(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Portal>
          <Dialog visible={visibleDialog}>
            <Dialog.Title>Olá!!</Dialog.Title>
            <Dialog.Content>
              <View
                style={{
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
                    <Text variant="bodyMedium">
                      Bem-vindo(a)! Estamos felizes em tê-lo(a) conosco. Por
                      favor, insira o seu nome:
                    </Text>
                  </View>
                  <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 5,
                      }}
                    >
                      <TextInput
                        mode="outlined"
                        label="Nome"
                        value={userName}
                        onChangeText={(text) => setUserName(text)}
                        style={{ flex: 1, backgroundColor: "#ffffff" }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={async () => {
                  if (userName) {
                    await hideDialog();
                  }
                }}
              >
                Salvar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Loading />
      </View>
    );
  }

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
          <ScrollView
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, padding: 10 }}
          >
            {informationCards.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <Card>
                  <Card.Cover
                    source={{ uri: item.image }}
                    resizeMode="stretch"
                  />
                  <Card.Title title={item.title} titleNumberOfLines={2} />
                  <Card.Content>
                    <Text style={{ marginBottom: 10, fontSize: 16 }}>
                      {item.description}
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
