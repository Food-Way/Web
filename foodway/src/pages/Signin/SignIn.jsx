import "./SignIn.css";

import { ButtonPrimary } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { Auth } from "../../components/Auth/Auth";
import { Modal } from "@mui/material";

const SignIn = () => {
  const loginIMG = "https://foodway.blob.core.windows.net/public/loginImg.png";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeSenha = (event) => {
    const value = String(event.target.value);
    setPassword(value);
  };

  const handleLogoff = () => {
    sessionStorage.clear();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const handleLogin = async () => {
    console.log("handleLogin: ", email, " ", password);
    const data = {
      email: email,
      password: password,
    };
    if (email === "" || password === "") {
      toast.error("Preencha todos os campos");
      return;
    } else if (email.includes("@") === false) {
      toast.error("Email inválido");
      return;
    } else {
      try {
        const response = await api.post("users/login", data);
        if (response.status === 200) {
          console.log("Login successful!");
          console.log("Response data:", response.data);
          sessionStorage.setItem("name", response.data.name);
          sessionStorage.setItem("email", btoa(response.data.email));
          sessionStorage.setItem("idUser", btoa(response.data.idUser));
          sessionStorage.setItem("token", btoa(response.data.token));
          sessionStorage.setItem("typeUser", btoa(response.data.typeUser));
          toast.success("Login realizado com sucesso!");
          if (response.data.typeUser === "CLIENT") {
            setTimeout(() => {
              console.log("Redirecting to /perfil...");
              navigate("/user-profile");
              location.reload();
              sessionStorage.setItem("my-profile", btoa(true));
            }, 2000);
          } else if (response.data.typeUser === "ESTABLISHMENT") {
            console.log("Redirecting to /establishment/performance...");
            navigate("/establishment/performance");
          }
        } else {
          console.log("Login failed with status code:", response.status);
          console.log("Response data:", response.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Login failed with status code:", error.response.status);
          toast.error("Email ou senha incorretos!");
          console.log("Response data:", error.response.data);
        }
      }
    }
  };

  return (
    <main className="main-signin">
      <Auth />
      <div className="container">
        <div className="form-signin">
          <div className="form-container-signin">
            <h1 className="title">Login</h1>
            <form onSubmit={handleSubmit}>
              <InputField
                type="email"
                label="Email"
                placeholder="insira seu email"
                id="email"
                value={email}
                autocomplete="current-email"
                onChange={handleChangeEmail}
              />
              <InputField
                type="password"
                label="Senha"
                placeholder="insira sua senha"
                id="password"
                value={password}
                autocomplete="current-password"
                onChange={handleChangeSenha}
              />
              <span className="">
                Não possui uma conta? <Link to="/sign-up">Cadastre-se</Link>
              </span>
              <ButtonPrimary text="Entrar" onclick={handleLogin} />
            </form>
          </div>
        </div>
        <div className="imgContainer">
          <img src={loginIMG} className="img-login" />
        </div>
      </div>
    </main>
  );
};

export default SignIn;
