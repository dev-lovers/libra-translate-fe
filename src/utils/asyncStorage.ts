import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key: string, value: any) => {
  try {
    let jsonValue: string | null = null;

    if (typeof value !== "string") {
      jsonValue = JSON.stringify(value);
    } else {
      jsonValue = value;
    }

    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    throw new Error("Erro ao salvar dados.");
  }
};

const recoverData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);

    if (data !== null) {
      return data;
    }

    return null;
  } catch (error) {
    throw new Error("Erro ao recuperar dados.");
  }
};

const deleteData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error("Erro ao deletar dados.");
  }
};

export { storeData, recoverData, deleteData };
