import React, { useState } from "react";
import InputField from "../../../components/InputField/InputField";
import { ButtonPrimary } from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { Auth } from "../../../components/Auth/Auth";

const SignUpCostumer = () => {
  const [step, setStep] = useState(1); // To track the current step of the form

  // Input values for each step
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  });

  const loginIMG = "https://foodway.blob.core.windows.net/public/loginImg.png";

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <main className="main-signupestablishment">
      <Auth />
      <div className="container">
        <div className="form">
          <div className="form-container">
            <h1 className="title">Cadastro de Usuário</h1>
            <form>
              {step === 1 && (
                <>
                  <InputField
                    type="text"
                    label="Nome"
                    placeholder="insira seu nome"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="Sobrenome"
                    placeholder="insira seu sobrenome"
                    id="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="email"
                    label="Email"
                    placeholder="insira seu email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="current-email"
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <InputField
                    type="text"
                    label="CPF"
                    placeholder="insira seu CPF"
                    id="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="password"
                    label="Senha"
                    placeholder="insira sua senha"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                  />
                  <InputField
                    type="password"
                    label="Confirmar Senha"
                    placeholder="confirme sua senha"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                  />
                </>
              )}
              <span className="">
                Não possui uma conta? <Link to="/sign-up">Cadastre-se</Link>
              </span>
              {step === 1 && (
                <ButtonPrimary text="Avançar" onClick={handleNext} />
              )}
              {step === 2 && (
                <>
                  <ButtonPrimary text="Voltar" onClick={handleBack} />
                  <ButtonPrimary text="Cadastrar" />
                </>
              )}
            </form>
          </div>
        </div>
        <div className="imgContainer">
          <img className="img-login" src={loginIMG} alt="Login" />
        </div>
      </div>
    </main>
  );
};

export default SignUpCostumer;
