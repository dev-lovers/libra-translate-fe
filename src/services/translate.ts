import axios from "axios";

interface Data {
  filename: string;
  content: string;
}

const baseUrl = "http://192.168.100.94:8000/predict_v2";

const uploadImage = async (data: Data) => {
  try {
    const response = await axios.post(baseUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default uploadImage;
