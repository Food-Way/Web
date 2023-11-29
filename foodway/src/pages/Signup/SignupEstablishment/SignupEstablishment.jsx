import InputField from "../../../components/InputField/InputField";
import "./SignupEstablishment.css";
import {
  ButtonPrimary,
  ButtonPrimaryLink,
  ButtonSecondary,
} from "../../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../../components/Auth/Auth";
import { ButtonStep } from "../../../components/Button/Button";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import CheckboxSelect from "../../../components/CheckboxSelect/CheckboxSelect";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../../../services/api";

const SignupEstablishment = () => {
  const navigate = useNavigate();
  const clearFields = () => {
    setAddressData({
      cep: "",
      number_address: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
    });

    setFormData({
      nameFantasy: "",
      nameResponsible: "",
      email: "",
      cep: "",
      number_address: "",
      cnpj: "",
      complement: "",
      password: "",
      confirmPassword: "",
      culinary: "",
    });

    setMessageCEP("");
    setFindCep(false);
    setSelectedValues([]);
    setSelectedCulinaries([]);
    setStep(1);
  };
  const [messageCEP, setMessageCEP] = useState("");
  const [findCep, setFindCep] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedCulinaries, setSelectedCulinaries] = useState([]);
  const loginIMG =
    "https://foodway.blob.core.windows.net/public/cadastroEstablishment.png";

  const [formData, setFormData] = useState({
    nameFantasy: "",
    nameResponsible: "",
    email: "",
    cep: "",
    number_address: "",
    cnpj: "",
    complement: "",
    password: "",
    confirmPassword: "",
    culinary: "",
  });

  const handleSteps = () => {
    if (step === 1) {
      if (formData.nameFantasy === "") {
        toast.error("Preencha o campo Nome Fantasia");
        return;
      } else if (formData.nameResponsible === "") {
        toast.error("Preencha o campo Nome Responsável");
        return;
      } else if (formData.email === "") {
        toast.error("Preencha o campo Email");
        return;
      }
      handleNext();
    }
    if (step === 2) {
      if (addressData.cep === "") {
        toast.error("Preencha o campo CEP");
        return;
      } else if (addressData.number_address === "") {
        toast.error("Preencha o campo Número");
        return;
      } else if (formData.complement === "") {
        toast.error("Preencha o campo Complemento");
        return;
      }
      handleNext();
    }
    if (step === 3) {
      if (formData.cnpj === "") {
        toast.error("Preencha o campo CNPJ");
        return;
      } else if (formData.password === "") {
        toast.error("Preencha o campo Senha");
        return;
      } else if (formData.confirmPassword === "") {
        toast.error("Preencha o campo Confirmar Senha");
        return;
      } else if (formData.password !== formData.confirmPassword) {
        toast.error("As senhas não coincidem");
        return;
      }
      handleOpen();
    }
  };

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

  const handleRegisterEstablishment = () => {
    if (selectedValues.length < 3) {
      toast.error("Selecione pelo menos tres preferências");
    } else {
      handleClose();
      const filteredCulinaries = selectedCulinaries.filter((culinary) =>
        selectedValues.includes(culinary.name)
      );

      const data = {
        name: formData.nameResponsible,
        email: formData.email,
        password: formData.password,
        typeUser: "ESTABLISHMENT",
        profilePhoto: "",
        establishmentName: formData.nameFantasy,
        description: "",
        cnpj: formData.cnpj.replace(/[^\d]+/g, ""),
        address: {
          cep: addressData.cep.replace("-", ""),
          number: addressData.number_address,
          complement: formData.complement,
          street: addressData.street.replace(/ /g, "+"),
          neighborhood: addressData.neighborhood.replace(/ /g, "+"),
          city: addressData.city.replace(/ /g, "+"),
          state: addressData.state.replace(/ /g, "+"),
        },
        culinary: filteredCulinaries,
      };
      console.log(data);

      api
        .post("establishments", data)
        .then((response) => {
          if (response.status === 201) {
            clearFields();
            toast.success("Cadastro realizado com sucesso! Redirecionando...");
            setTimeout(() => {
              navigate("/sign-in");
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error.response);
          console.log(data);
          console.log(error);
          toast.error("Erro ao cadastrar");
        });
    }
  };
  const [addressData, setAddressData] = useState({
    cep: "",
    number_address: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const handleCEP = async () => {
    const { cep, number_address } = addressData; // Destructuring cep and number_address directly
    const cepFormated = cep.replace("-", "");

    if (cepFormated.length === 8) {
      try {
        const cepResponse = await axios.get(
          `https://viacep.com.br/ws/${cepFormated}/json/`
        );

        // Destructure the response and map it to addressData
        const { logradouro, bairro, localidade, uf } = cepResponse.data;

        setAddressData({
          ...addressData,
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf,
        });

        setMessageCEP(
          `CEP encontrado: ${logradouro}, ${bairro}, ${localidade}, ${uf}`
        );
        setFindCep(true);
        console.log(messageCEP);
      } catch (error) {
        console.log(error);
        setFindCep(false);
        setMessageCEP("CEP não encontrado");
      }
    } else if (cepFormated.length === 0) {
      setMessageCEP("");
      setFindCep(false);
    } else {
      setFindCep(false);
      setMessageCEP("CEP inválido");
    }
    console.log(addressData);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const handleInputAddress = (event) => {
    const { id, value } = event.target;
    let cepFormated = value.replace("-", "");
    cepFormated = cepFormated.replace("_", "");
    if (cepFormated.length === 9) {
    } else {
      setAddressData({ ...addressData, [id]: value });
      console.log(addressData);
    }
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
                      <ButtonSecondary
                        text="<"
                        onclick={handleClose}
                        className="button-secondary-v2"
                      />{" "}
                    </div>
                    <div>
                      <ButtonPrimary
                        className="button-primary-v2"
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
                    onclick={handleSteps}
                  />
                )}
                {step === 2 && (
                  <ButtonStep
                    className="step-position"
                    step="2"
                    onclick={handleSteps}
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
                    id="nameFantasy"
                    value={formData.nameFantasy}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="Nome responsável*"
                    placeholder="insira seu nome"
                    id="nameResponsible"
                    value={formData.nameResponsible}
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
                  <div className="cep-container">
                    <div className="input-field">
                      <InputField
                        type="text"
                        label="CEP*"
                        placeholder="insira seu CEP"
                        onMouseLeave={handleCEP}
                        className={
                          findCep ? "input-field-green" : "input-field-default"
                        }
                        mask="99999-999"
                        id="cep"
                        value={addressData.cep}
                        onChange={handleInputAddress}
                      />
                    </div>
                    <div className="message-container">
                      <p>{messageCEP}</p>
                    </div>
                  </div>
                  <InputField
                    type="text"
                    label="Número*"
                    placeholder="insira seu número"
                    id="number_address"
                    value={addressData.number_address}
                    onChange={handleInputAddress}
                  />
                  <InputField
                    type="text"
                    label="Complemento*"
                    placeholder="insira seu complemento"
                    id="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                  />
                </>
              )}
              {step === 3 && (
                <>
                  <InputField
                    type="text"
                    label="CNPJ*"
                    placeholder="insira seu CNPJ"
                    id="cnpj"
                    value={formData.cpf}
                    mask="99.999.999/9999-99"
                    onChange={handleInputChange}
                    maxLength={9}
                  />
                  <InputField
                    type="password"
                    label="Senha*"
                    placeholder="insira sua senha"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                  <InputField
                    type="password"
                    label="Confirmar Senha*"
                    placeholder="confirme sua senha"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                </>
              )}
              <span className="redirect-option">
                Não possui uma conta? <Link to="/sign-up">Cadastre-se</Link>
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
              {step === 3 && (
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
          <img className="img-login" src={loginIMG} />
        </div>
      </div>
    </main>
  );
};

export default SignupEstablishment;
