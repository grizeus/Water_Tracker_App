import axios from "axios";

const instanceWater = axios.create({
  withCredentials: true,
  baseURL: "https://water-back-hj53.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instanceWater;
