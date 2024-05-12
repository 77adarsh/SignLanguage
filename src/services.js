import axios from "axios";

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
    if (response.status === 400) return;
    return response.data;
  } catch (error) {
    throw error;
  }
}

const timer = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(reject.bind(this, "Connection to Server Timeout"), time * 1000);
  });
};

export async function testServer() {
  try {
    const response = await Promise.race([
      axios.get("https://isl-serv.onrender.com/"),
      timer(0.5),
    ]);

    console.log(response.data);
    if (response.status === 200) return true;
    return false;
  } catch (err) {
    throw err;
  }
}

export const controller = new AbortController();
