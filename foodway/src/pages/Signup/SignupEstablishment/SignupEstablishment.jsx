import InputField from "../../../components/InputField/InputField";
import "./SignupEstablishment.css";
import {
  ButtonPrimary,
  ButtonPrimaryLink,
  ButtonSecondary,
} from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { Auth } from "../../../components/Auth/Auth";
import { ButtonStep } from "../../../components/Button/Button";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import CheckboxSelect from "../../../components/CheckboxSelect/CheckboxSelect";
import { toast } from "react-toastify";

const SignupEstablishment = () => {
  const [step, setStep] = useState(1);

  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedCulinaries, setSelectedCulinaries] = useState([]);
  const loginIMG =
    "https://foodway.blob.core.windows.net/public/cadastroEstablishment.png";

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegisterEstablishment = () => {};

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleNext();
  };

  return (
    <main className="main-signup-establishment">
      <Auth />
      <div className="container">
        <div className="form-establishment">
          <div className="form-container-establishment">
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
                    <div>
                      {" "}
                      <ButtonSecondary text="<" onclick={handleClose} />{" "}
                    </div>
                    <div>
                      <ButtonPrimary
                        text="Criar >"
                        onclick={handleRegisterEstablishment}
                      />
                    </div>
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
                    // // onclick={handleSteps}
                  />
                )}
                {step === 2 && (
                  <ButtonStep
                    className="step-position"
                    step="2"
                    /* onclick={handleBack} */
                  />
                )}
                <h1 className="title">Cadastro de Estabelecimento</h1>
              </span>
              {step === 1 && (
                <>
                  <InputField
                    type="text"
                    label="Nome Fantasia*"
                    placeholder="insira seu nome"
                    id="name_fantasy"
                    /*  value={formData.name} */
                    /* onChange={handleInputChange}*/
                  />
                  <InputField
                    type="text"
                    label="Nome responsável*"
                    placeholder="insira seu nome"
                    id="name_responsible"
                    /* value={formData.lastname} */
                    /* onChange={handleInputChange}*/
                  />
                  <InputField
                    type="email"
                    label="Email*"
                    placeholder="insira seu email"
                    id="email"
                    /* value={formData.email} */
                    /* onChange={handleInputChange}*/
                    autoComplete="current-email"
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <InputField
                    type="text"
                    label="CNPJ*"
                    placeholder="insira seu CNPJ"
                    id="cnpj"
                    /* value={formData.cpf} *
                    /* onChange={handleInputChange}*/
                  />
                  <InputField
                    type="text"
                    label="CEP*"
                    placeholder="insira seu CEP"
                    id="cep"
                    /* value={formData.password} */
                    /* onChange={handleInputChange}*/
                  />
                  <InputField
                    type="text"
                    label="Numero*"
                    placeholder="insira seu numero"
                    id="number_address"
                    /* value={formData.confirmPassword} */
                    /* onChange={handleInputChange}*/
                  />
                </>
              )}
              {step === 3 && (
                <>
                  <InputField
                    type="password"
                    label="Senha*"
                    placeholder="insira sua senha"
                    id="password"
                    /* value={formData.password} */
                    /* onChange={handleInputChange}*/
                    autoComplete="current-password"
                  />
                  <InputField
                    type="password"
                    label="Confirmar Senha*"
                    placeholder="confirme sua senha"
                    id="confirmPassword"
                    /* value={formData.confirmPassword} */
                    /* onChange={handleInputChange}*/
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
                <div className="section-btn">
                  <div className="section-item">
                    <ButtonSecondary text="Voltar" onclick={handleBack} />
                  </div>
                  <div className="section-item">
                    <ButtonPrimary text="Avançar" onclick={handleNext} />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="section-btn">
                  <div className="section-item">
                    <ButtonSecondary text="Voltar" onclick={handleBack} />
                  </div>
                  <div className="section-item">
                    <ButtonPrimary text="Avançar" onclick={handleNext} />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="imgContainer">
          <img className="img-login" src={loginIMG} />
        </div>
      </div>
    </main>
  );
};

export default SignupEstablishment;
