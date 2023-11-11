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

const SignupEstablishment = () => {
  const [step, setStep] = useState(1);

  // const [selectedValues, setSelectedValues] = useState([]);
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

  // const handleSteps = () => {
  //   if (step === 1) {
  //     if (!formData.name || !formData.lastname || !formData.email) {
  //       toast.error("Preencha todos os campos obrigatórios.");
  //       return;
  //     }

  //     if (formData.password !== formData.confirmPassword) {
  //       toast.error("As senhas não correspondem.");
  //       return;
  //     }
  //     handleNext();
  //   }

  //   if (step === 2) {
  //     if (!formData.cpf || formData.cpf.length !== 11 || isNaN(formData.cpf)) {
  //       toast.error("O CPF deve ter 11 caracteres numéricos.");
  //       return;
  //     }
  //     if (
  //       !formData.password ||
  //       formData.password.length < 8 ||
  //       !/[a-z]/.test(formData.password) ||
  //       !/[A-Z]/.test(formData.password) ||
  //       !/[0-9]/.test(formData.password) ||
  //       !/[.,:;!?@#$%^*()_+-]/.test(formData.password)
  //     ) {
  //       toast.error(
  //         "A senha deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo."
  //       );
  //       return;
  //     }
  //     if (formData.password !== formData.confirmPassword) {
  //       toast.error("As senhas não correspondem.");
  //       return;
  //     }
  //     handleOpen();
  //   }
  // };

  // const handleRegisterCostumer = () => {
  //   if (selectedValues.length < 3) {
  //     // toast.error("Selecione pelo menos tres preferências");
  //     // return;
  //   } else {
  //     handleClose();
  //     setFormData({ ...formData, culinary: selectedValues });

  //     console.log(formData);
  //     const data = {
  //       name: formData.name.trim() + " " + formData.lastname.trim(),
  //       email: formData.email,
  //       password: formData.password,
  //       typeUser: "CLIENT",
  //       cpf: formData.cpf,
  //       culinary: [
  //         {
  //           id: 1,
  //           name: "Brasileira",
  //         },
  //         {
  //           id: 2,
  //           name: "Italiana",
  //         },
  //         {
  //           id: 3,
  //           name: "Japonesa",
  //         },
  //       ],
  //       bio: "sss",
  //       profilePhoto: "sss",
  //     };
  //     api
  //       .post("customers", data)
  //       .then((response) => {
  //         if (response.status === 201) {
  //           toast.success(
  //             "Cadastro realizado com sucesso! Redirecionando... para login"
  //           );
  //           setTimeout(() => {
  //             navigate("/sign-in");
  //           }, 2000);
  //         }
  //       })
  //       .catch((error) => {
  //         var message = "Ocorreu um erro ao realizar o cadastro.";
  //         if (error.response.status === 400) {
  //           const errors = error.response.data.errors;
  //           message += " Verifique os campos informados.";
  //         } else {
  //           message += " Erro interno no servidor.";
  //         }
  //         toast.error(message);
  //       });
  //   }
  // };

  return (
    <main className="main-signup-establishment">
      <Auth />
      <div className="container">
        <div className="form-establishment">
          <div className="form-container-establishment">
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
