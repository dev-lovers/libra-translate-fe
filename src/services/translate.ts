import axios from "axios";

const baseUrl = "http://localhost:8000/predict";

const uploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post(baseUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default uploadImage;
