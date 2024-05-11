import axios from "axios";
import alphabetE from "./alphabetE.jpg";

export async function postImage(image) {
  let formData = new FormData();
  formData.append("image", image, "test.jpg");

  try {
    const response = await axios.post(
      "https://isl-serv.onrender.com/predict",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    if (response.status !== 200) throw new Error("Failiure");
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function testServer() {
  try {
    const response = await axios.get("https://isl-serv.onrender.com/");
    console.log(response.data);
    if (response.status === 200 && response.data === "hi") return true;
    return false;
  } catch (err) {
    return false;
  }
}

export const controller = new AbortController();
