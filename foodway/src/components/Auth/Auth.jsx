import { useEffect } from "react";
import api_call from "../../services/apiImpl";

import { toast } from 'react-toastify';



function Auth() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("userData")).token;
        const response = await api_call("get", "users", null, token);
        console.log("Response status:", response.status);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
}

function hasValidSession(navigate) {


  toast.error("Se Logue para realizar essa ação")
  toast.info("Redirecionado para login")
  setTimeout(() => {
    navigate("/sign-in");
  }, 3000)
}



export { Auth, hasValidSession }
