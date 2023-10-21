import "./SignIn.css";

import { ButtonPrimary } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { useState } from "react";
import api from "../../services/api";
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

  const handleLogin = async () => {
    console.log("handleLogin: ", email, " ", password);
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await api.post("users/login", data);
      if (response.status === 200) {
        console.log("Login successful!");
        console.log("Response data:", response.data);
        sessionStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/");
      } else {
        console.log("Login failed with status code:", response.status);
        console.log("Response data:", response.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Login failed with status code:", error.response.status);
        console.log("Response data:", error.response.data);
      }
    }
  };

  return (
    <main className="main-signin">
      <div className="container">
        <div className="form">
          <div className="form-container">
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
                Não possui uma conta? <Link>Cadastre-se</Link>
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
