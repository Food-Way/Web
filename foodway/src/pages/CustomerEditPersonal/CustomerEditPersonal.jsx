import {
  InputField,
  TextAreaField,
} from "../../components/InputField/InputField";
import { ButtonPrimary } from "../../components/Button/Button";
import { useState, useEffect } from "react";

import api from "../../services/api";

const CustomerEditPersonal = () => {
  const token = atob(sessionStorage.getItem("token"));
  const id = atob(sessionStorage.getItem("idUser"));
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  return (
    <div className="establishment-edit">
      <div className="establishment-edit-container">
        <div className="establishment-edit-container-form">
          <div className="form-container-edit-profile">
            {" "}
            <div className="title">
              <h2>Informações do usuario</h2>
            </div>
            <form>
              <div className="input-fields">
                <InputField
                  id={"nome-establishment"}
                  label="Nome Estabelecimento"
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
              <div className="input-fields">
                <InputField
                  id={"email"}
                  label="E-mail"
                  defaultValue={formData.email}
                  value={formData.email}
                  type="email"
                  placeholder="E-mail"
                  className="input-field-default-establisment-edit"
                  classNameGeral="form-group-establisment-edit"
                />
                <InputField
                  text={"Número comercial"}
                  mask="(99) 99999-9999"
                  id={"phone"}
                  label="Telefone"
                  defaultValue={formData.phone}
                  value={formData.phone}
                  type="text"
                  placeholder="Telefone"
                  className="input-field-default-establisment-edit"
                  classNameGeral="form-group-establisment-edit"
                />
              </div>
              <TextAreaField
                label="Descrição"
                id={"description"}
                defaultValue={formData.description}
                value={formData.description}
                placeholder="Descrição do estabelecimento"
                classNameGeral="form-group-establisment-edit-fill"
              />

              <div className="establishment-edit-sec-btn">
                <ButtonPrimary
                  className="button-establishment-edit"
                  text={"Atualizar"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEditPersonal;
