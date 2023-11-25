import axios from "axios";

const API_KEY = "6525107e-0575-49fa-b626-17ab2f3e62d2";

const api = axios.create({
 headers: {
  "X-Api-Key": API_KEY,
 },
 baseURL: "https://api.pokemontcg.io/v2",
});

export default api;
