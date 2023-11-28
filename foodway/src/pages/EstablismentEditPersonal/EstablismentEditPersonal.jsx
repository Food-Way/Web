import {
  InputField,
  TextAreaField,
} from "../../components/InputField/InputField";
import { ButtonPrimary } from "../../components/Button/Button";
import { useState, useEffect } from "react";
import "./EstablishmentEditPersonal.css";
import api from "../../services/api";
const EstablismentEditPersonal = () => {
  const token = atob(sessionStorage.getItem("token"));
  const id = atob(sessionStorage.getItem("idUser"));
  const [formData, setFormData] = useState({});
  const [savedImagesNames, setSavedImagesNames] = useState([]);
  const [
    selectedFilesEstablishmentImages,
    setSelectedFilesEstablishmentImages,
  ] = useState([]);

  const handleRemoveEstablishmentImages = () => {
    setSelectedFilesEstablishmentImages([]);
  };

  const handleFileChangeEstablishmentImages = async (event) => {
    const files = event.target.files;

    // Salva os arquivos em um array
    const selectedFiles = [];
    for (const file of files) {
      if (files.length > 5) {
        alert("Você só pode adicionar 5 imagens");
        return;
      }
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        alert("Você só pode adicionar imagens");
        return;
      }
      selectedFiles.push(file);
    }
    console.log("selectedFiles", selectedFiles);
    // Atribui o array de arquivos ao estado
    setSelectedFilesEstablishmentImages(selectedFiles);
  };

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

  const updateEstablishment = () => {
    const data = {
      establishmentName: formData.establishmentName,
      cnpj: formData.cnpj,
      email: formData.email,
      phone: formData.phone,
      description: formData.description,
      images: savedImagesNames,
    };
    api
      .patch(`establishments/personal/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error " + error);
      });
  };

  useEffect(() => {
    getEstablishment();
  }, []);

  useEffect(() => {
    console.log("FormData", formData);
  }, [formData]);

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
            <div className="form_1">
              <div className="title">
                <h2>Informações do estabelecimento</h2>
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </div>
                <TextAreaField
                  label="Descrição"
                  id={"description"}
                  defaultValue={formData.description}
                  value={formData.description}
                  placeholder="Descrição do estabelecimento"
                  classNameGeral="form-group-establisment-edit-fill"
                  onChange={handleInputChange}
                />
              </form>
            </div>
            <div
              style={{
                width: "50%",
                margin: "0px 20px",
              }}
            >
              <form className="form_2">
                <div className="section-01">
                  <div className="title">
                    <h2>Pagina do estabelecimento</h2>
                  </div>
                  <div className="perfil-edit-establishment-preview">
                    <img
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      src="https://foodway.blob.core.windows.net/user-images/marcelo-alcatra-cover-00onl-1700935012373.jpg"
                      alt=""
                    />
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "40rem",
                        left: "53vw",
                      }}
                      src=" https://foodway.blob.core.windows.net/user-images/matheus-fernandes-rodrigues-cover-aafdn-1700865720614.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="section-01">
                  <div className="main-section-btn-preview">
                    <div className="section-btn-profile-picture">
                      <ButtonPrimary
                        onclick={handleRemoveEstablishmentImages}
                        className="establishment-edit-sec-add"
                        text={"Adicionar foto de capa"}
                      />
                      <ButtonPrimary
                        onclick={handleRemoveEstablishmentImages}
                        className="establishment-edit-sec-delete"
                        text={"R"}
                      />
                    </div>
                    <div className="section-btn-profile-picture">
                      <ButtonPrimary
                        onclick={handleRemoveEstablishmentImages}
                        className="establishment-edit-sec-add"
                        text={"Adicionar foto de perfil"}
                      />
                      <ButtonPrimary
                        onclick={handleRemoveEstablishmentImages}
                        className="establishment-edit-sec-delete"
                        text={"R"}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="establishment-edit-sec-btn">
            <ButtonPrimary
              className="button-establishment-edit"
              text={"Atualizar"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EstablismentEditPersonal;
