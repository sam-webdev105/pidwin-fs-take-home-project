import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

// auth
const login = (formData) => API.post("/api/user/login", formData);
const signUp = (formData) => API.post("/api/user/signup", formData);
const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);

// game
const syncGame = (formData) => API.post("/api/game/sync", formData);
const playGame = (formData) => API.post("/api/game/play", formData);

const api = { login, signUp, changePassword, syncGame, playGame }
export default api