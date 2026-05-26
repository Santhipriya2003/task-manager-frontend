import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-backend-1-8vdt.onrender.com"
});

export default API;