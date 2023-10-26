import api from "../../services/api";
import { useEffect } from "react";

export function Auth() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("userData")).token;
        const response = await api.get("users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response status:", response.status);
      } catch (error) {
        // Tratar o erro de forma silenciosa, sem imprimir no console
      }
    };

    fetchData();
  }, []);
}
