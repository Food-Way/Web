import "./SignIn.css";
import loginIMG from "../../assets/img/images/loginImg.png";
import { ButtonPrimary } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { useState } from "react";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);

    console.log("value is:", email);
  };

  const handleChangeSenha = (event) => {
    const value = String(event.target.value);

    setPassword(value);

    console.log("value is:", password);
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
              <ButtonPrimary text="Entrar" />
            </form>
          </div>
        </div>
        <img src={loginIMG} className="img-login" />
      </div>
    </main>
  );
};

export default SignIn;
