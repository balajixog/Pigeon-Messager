import { useEffect, useState } from "react";
import api from "@/api/axios";

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/me");
        setUser(response.data);
      } catch (error) {
        console.error("Auth failed", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore — logout locally regardless
    }
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return { user, loading, logout };
}

export default useAuth;
