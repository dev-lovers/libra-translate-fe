import axios from "axios";

const baseUrl = "http://127.0.0.1:5000/predict";

const uploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post(baseUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem: ", error);
    throw error;
  }
};

export default uploadImage;
