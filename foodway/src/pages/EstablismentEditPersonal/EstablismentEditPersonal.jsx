import { InputField } from "../../components/InputField/InputField";
import { ButtonPrimary } from "../../components/Button/Button";
import { useState, useEffect } from "react";
import "./EstablishmentEditPersonal.css";
import api from "../../services/api";
import { json } from "react-router-dom";
const EstablismentEditPersonal = () => {
  const token = atob(sessionStorage.getItem("token"));
  const id = atob(sessionStorage.getItem("idUser"));
  const [formData, setFormData] = useState({});
  const getEstablishment = () => {
    console.log("Token " + token);
    console.log("Id " + id);
    api
      .get(`establishments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEstablishment();
  }, []);

  useEffect(() => {
    console.log("FormData", formData);
  }, [formData]);

  return (
    <div className="establishment-edit">
      <div className="establishment-edit-container">
        <div className="establishment-edit-container-form">
          <div className="form-container-edit-profile">
            {" "}
            <div className="title">
              <h2>Informações do estabelecimento</h2>
            </div>
            <form>
              <div className="input-fields">
                <InputField
                  id={"nome-establishment"}
                  label="Nome Estabelecimentos"
                  defaultValue={formData.establishmentName}
                  value={formData.establishmentName}
                  type="text"
                  placeholder="Nome do estabelecimento"
                  className="input-field-default-establisment-edit"
                  classNameGeral="form-group-establisment-edit"
                />

                <InputField
                  disabled={true}
                  id={"cnpj"}
                  label="CNPJ"
                  type="text"
                  defaultValue={formData.cnpj}
                  value={formData.cnpj}
                  placeholder="CNPJ"
                  mask="99.999.999/9999-99"
                  className="input-field-default-establisment-edit"
                  classNameGeral="form-group-establisment-edit"
                />
              </div>
              <InputField
                id={"email"}
                label="E-mail"
                defaultValue={formData.email}
                value={formData.email}
                type="email"
                placeholder="E-mail"
                classNameGeral="form-group-establisment-edit-fill"
              />
              <hr
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#979797",
                  border: "none",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
              <div className="title">
                <h2>Pagina do estabelecimento</h2>
              </div>
            </form>
            <div className="establishment-edit-sec-btn">
              <ButtonPrimary
                className="button-establishment-edit"
                text={"Atualizar"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EstablismentEditPersonal;
