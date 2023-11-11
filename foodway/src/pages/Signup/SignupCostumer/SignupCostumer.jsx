import React, { useState } from "react";
import InputField from "../../../components/InputField/InputField";
import CheckboxSelect from "../../../components/CheckboxSelect/CheckboxSelect";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonStep,
} from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { Auth } from "../../../components/Auth/Auth";
import "./SignupCostumer.css";
import { Modal } from "@mui/material";

const SignUpCostumer = () => {
  const [step, setStep] = useState(1); // To track the current step of the form

  const [selectedValues, setSelectedValues] = useState([]);

  // Input values for each step
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    culinary: "",
  });

  const handleRegister = () => {
    console.log("Handle Register");
  };

  const loginIMG = "https://foodway.blob.core.windows.net/public/loginImg.png";

  const handleNext = () => {
    console.log("Handle Next");
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    console.log("Handle Back");
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("Handle Close");
    setOpen(false);
    handleNext();
  };

  return (
    <main className="main-signup-costumer">
      <Auth />

      <div className="container">
        <div className="form-costumer">
          <div className="form-container-costumer">
            <Modal open={open} onClose={handleClose}>
              <div className="modal-body">
                <div className="modal-container">
                  <h1 className="modal-title">Selecione suas preferências</h1>
                  <CheckboxSelect
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                  />
                  <div className="button-div">
                    <ButtonPrimary text="Finalizar" onclick={handleClose} />
                  </div>
                </div>
              </div>
            </Modal>
            <form>
              <span className="action-sec">
                {step === 1 && (
                  <ButtonStep
                    className="step-position"
                    step="1"
                    onclick={handleNext}
                  />
                )}
                {step === 2 && (
                  <ButtonStep
                    className="step-position"
                    step="2"
                    onclick={handleBack}
                  />
                )}
                <h1 className="title">Cadastro de Usuário</h1>
              </span>
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
              <span className="redirect-option">
                Não possui uma conta? <Link to="/sign-up">Cadastre-se</Link>
              </span>
              {step === 1 && (
                <ButtonPrimary text="Avançar" onclick={handleNext} />
              )}
              {step === 2 && (
                <>
                  <ButtonSecondary text="Voltar" onclick={handleBack} />
                  <ButtonPrimary text="Avançar" onclick={handleOpen} />
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
