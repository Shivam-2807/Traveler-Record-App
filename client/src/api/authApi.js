import api from "./axios.js";

export function registerUser(payload) {
  return api.post("/auth/register", payload);
}

export function loginUser(payload) {
  return api.post("/auth/login", payload);
}

export function getCurrentUser() {
  return api.get("/auth/me");
}
