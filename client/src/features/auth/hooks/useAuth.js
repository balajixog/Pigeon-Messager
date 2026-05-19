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

        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return {
    user,
    loading,
    logout,
  };
}

export default useAuth;
