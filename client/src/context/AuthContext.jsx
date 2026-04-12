import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../api/authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("traveler_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("traveler_token");

    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("traveler_user", JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem("traveler_token");
        localStorage.removeItem("traveler_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function register(payload) {
    const { data } = await registerUser(payload);
    localStorage.setItem("traveler_token", data.token);
    localStorage.setItem("traveler_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  async function login(payload) {
    const { data } = await loginUser(payload);
    localStorage.setItem("traveler_token", data.token);
    localStorage.setItem("traveler_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("traveler_token");
    localStorage.removeItem("traveler_user");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      register
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
