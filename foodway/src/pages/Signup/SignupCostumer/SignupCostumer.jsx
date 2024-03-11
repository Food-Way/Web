import React, { useState } from "react";
import InputField from "../../../components/InputField/InputField";
import CheckboxSelect from "../../../components/CheckboxSelect/CheckboxSelect";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonStep,
} from "../../../components/Button/Button";

import { Auth } from "../../../components/Auth/Auth";
import "./SignupCostumer.css";
import { Button, Modal } from "@mui/material";
import api from "../../../services/api";
import loginIMG from "../../../../public/loginImg.png";

const SignUpCostumer = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [selectedCulinaries, setSelectedCulinaries] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    culinary: "",
  });

  const loginIMG = "https://foodway-public-s3.s3.amazonaws.com/website-images/login-img.png";

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleNext();
  };

  const handleSteps = () => {
    if (step === 1) {
      if (!formData.name || !formData.lastname || !formData.email) {
        toast.error("Preencha todos os campos obrigatórios.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("As senhas não correspondem.");
        return;
      }
      handleNext();
    }

    if (step === 2) {
      console.log(formData.cpf);
      if (!formData.cpf || formData.cpf.replace(/[^\d]+/g, "").length !== 11 || !isNaN(formData.cpf)) {
        toast.error("O CPF deve ter 11 caracteres numéricos.");
        return;
      }
      if (
        !formData.password ||
        formData.password.length < 8 ||
        !/[a-z]/.test(formData.password) ||
        !/[A-Z]/.test(formData.password) ||
        !/[0-9]/.test(formData.password) ||
        !/[.,:;!?@#$%^*()_+-]/.test(formData.password)
      ) {
        toast.error(
          "A senha deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo."
        );
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("As senhas não correspondem.");
        return;
      }
      handleOpen();
    }
  };

  const handleRegisterCostumer = () => {
    if (selectedValues.length < 3) {
      toast.error("Selecione pelo menos tres preferências");
    } else {
      handleClose();
      const filteredCulinaries = selectedCulinaries
        .filter((culinary) => selectedValues.includes(culinary.name))
        .map(({ photo, ...rest }) => rest);
      console.log(filteredCulinaries);
      setFormData({ ...formData, culinary: selectedValues });

      const data = {
        name: formData.name.trim() + " " + formData.lastname.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        typeUser: "CLIENT",
        cpf: formData.cpf.replace(/[^\d]+/g, ""),
        culinary: filteredCulinaries,
        bio: "",
        profilePhoto: "",
      };
      console.log(data);
      api
        .post("customers", data)
        .then((response) => {
          if (response.status === 201) {
            toast.success(
              "Cadastro realizado com sucesso! Redirecionando... para login"
            );
            setTimeout(() => {
              navigate("/sign-in");
            }, 2000);
          }
        })
        .catch((error) => {
          var message = "Ocorreu um erro ao realizar o cadastro.";
          if (error.response.status === 400) {
            const errors = error.response.data.errors;
            message += " Verifique os campos informados.";
          } else {
            message += " Erro interno no servidor.";
          }
          toast.error(message);
        });
    }
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
                    selectedCulinaries={selectedCulinaries}
                    setSelectedCulinaries={setSelectedCulinaries}
                  />
                  <div className="button-div">

                    <ButtonSecondary text="<" onclick={handleClose} />{" "}

                    <ButtonPrimary
                      text="Criar >"
                      onclick={handleRegisterCostumer}
                    />

                  </div>
                </div>
              </div>
            </Modal>
            <form>
              <span className="action-sec">

                <h1 className="title">Cadastro de Usuário</h1>
              </span>
              {step === 1 && (
                <>
                  <InputField
                    type="text"
                    label="Nome*"
                    placeholder="insira seu nome"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="Sobrenome*"
                    placeholder="insira seu sobrenome"
                    id="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="email"
                    label="Email*"
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
                    label="CPF*"
                    placeholder="insira seu CPF"
                    id="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    mask={"999.999.999-99"}
                  />
                  <InputField
                    type="password"
                    label="Senha"
                    placeholder="insira sua senha"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autocomplete="new-password"
                  />
                  <InputField
                    type="password"
                    label="Confirmar Senha"
                    placeholder="confirme sua senha"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autocomplete="new-password"
                  />
                </>
              )}
              <span className="redirect-option">
                Já possui uma conta? <Link to="/sign-in">Faça login</Link>
              </span>
              {step === 1 && (
                <ButtonPrimary text="Avançar" onclick={handleSteps} />
              )}
              {step === 2 && (
                <div className="section-btn">
                  <div className="section-item">
                    <ButtonSecondary text="Voltar" onclick={handleBack} />
                  </div>
                  <div className="section-item">
                    <ButtonPrimary text="Avançar" onclick={handleSteps} />
                  </div>
                </div>
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
