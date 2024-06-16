import {
  InputField,
  TextAreaField,
} from "../../components/InputField/InputField";
import { ButtonPrimary } from "../../components/Button/Button";
import { useState, useEffect } from "react";
import "./EstablishmentEditPersonal.css";
import api_call from "../../services/apiImpl";
import api from "../../services/api.js";
import { toast } from "react-toastify";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parseJWT from "../../util/parseJWT";
import GenericModal from "../../components/GenericModel/GenericModel";
import UploadImage from "../../components/UploadImage/UploadImage.jsx";

const EstablismentEditPersonal = () => {
  const bodyToken = parseJWT();
  const token = atob(sessionStorage.getItem("token"));
  const [formData, setFormData] = useState({});
  const [selectedFileCover, setSelectedFileCover] = useState(null);
  const [selectedFileProfile, setSelectedFileProfile] = useState(null);
  const [coverImageUrlLocal, setCoverImageUrlLocal] = useState();
  const [profileImageUrlLocal, setProfileImageUrlLocal] = useState();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = (content) => {
    handleOpen();
    setContent(content);
  };

  async function getEstablishment() {
    const response = await api_call('get', `establishments/${bodyToken.idUser}`, null, token, null);
    setFormData(response.data);
    sessionStorage.setItem("establishmentName", btoa(response.data.establishmentName));
    sessionStorage.setItem("coverPhoto", btoa(response.data.profileHeaderImg));
    sessionStorage.setItem("profilePhoto", btoa(response.data.profilePhoto));
    setProfileImageUrlLocal(response.data.profilePhoto);
    setCoverImageUrlLocal(response.data.profileHeaderImg);
  }

  async function deleteEstablishmentImages(type) {
    const emailActual = bodyToken.email;
    const passwordActual = formData.passwordConfirmEditPhoto;
    const defaultImageUrl = "https://foodway.s3.amazonaws.com/public-images/default-user-image.png";
    const defaultBannerUrl = "https://foodway.s3.amazonaws.com/public-images/default-banner.png";

    const images = {
      profile: { profilePhoto: defaultImageUrl, profileHeaderImg: "" },
      cover: { profilePhoto: "", profileHeaderImg: defaultBannerUrl },
    };

    const data = {
      emailActual,
      passwordActual,
      ...images[type],
    };

    try {
      const response = await api_call("patch", `establishments/profile/${bodyToken.idUser}`, data, token, null);
      if (response.status === 200) {
        toast.success("Imagem deletada com sucesso");
        getEstablishment();
        handleClose();
      }
    } catch (error) {
      toast.error("Erro ao atualizar informações");
    }
  }

  const isFieldEmpty = (field, fieldName) => {
    if ((field ?? "").trim() === "") {
      toast.error(`${fieldName} não pode ser vazio`);
      return true;
    }
    return false;
  };

  const validateEstablishmentInformation = (data) => {
    return (
      !isFieldEmpty(data.establishmentName, "Nome estabelecimento") &&
      !isFieldEmpty(data.name, "Nome") &&
      !isFieldEmpty(data.emailNew, "E-mail") &&
      !isFieldEmpty(data.passwordActual, "Senha")
    );
  };

  const validatePasswordUpdate = (data, passwordNewConfirmation) => {
    return (
      !isFieldEmpty(data.passwordActual, "Senha atual") &&
      !isFieldEmpty(data.passwordNew, "Nova senha") &&
      !isFieldEmpty(passwordNewConfirmation, "Confirmação de senha") &&
      data.passwordNew === passwordNewConfirmation
    );
  };

  async function updateEstablishment(responsibility) {
    const data = {
      name: formData.name,
      establishmentName: formData.establishmentName,
      emailActual: bodyToken.email,
      emailNew: formData.email,
      passwordActual: formData.passwordConfirm,
      passwordNew: formData.passwordNew,
      phone: formData.phone,
      description: formData.description,
    };

    let isValid = false;
    switch (responsibility) {
      case "information":
        isValid = validateEstablishmentInformation(data);
        break;
      case "password":
        isValid = validatePasswordUpdate(data, formData.passwordNewConfirmation);
        if (!isValid) {
          toast.error("Senhas não conferem");
        }
        break;
      default:
        toast.error("Responsabilidade desconhecida");
        return;
    }

    if (!isValid) return;

    try {
      const response = await api_call("patch", `establishments/personal/${bodyToken.idUser}`, data, token, null);
      if (response.status === 200) {
        toast.success("Informações atualizadas com sucesso");
        setTimeout(() => {
          window.location.reload();
          getEstablishment();
          handleClose();
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error("Erro ao atualizar informações");
            break;
          case 500:
            toast.error("Erro no servidor");
            break;
          case 401:
            toast.error("Erro de autenticação: confira sua senha");
            break;
          default:
            toast.error("Erro ao atualizar informações");
        }
      } else {
        toast.error("Erro ao conectar com o servidor");
      }
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = async (type, event) => {
    const file = event.target.files[0];
    try {
      const isValid = await validateImage(type, file);
      if (isValid) {
        if (type === "cover") {
          setSelectedFileCover(file);
        } else {
          setSelectedFileProfile(file);
        }
      } else {
        toast.error("A imagem precisa ter pelo menos 1280 pixels de largura.");
        console.error("A imagem precisa ter pelo menos 1280 pixels de largura.");
      }
    } catch (error) {
      console.error("Erro de validação:", error);
    }
  };

  const validateImage = async (type, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
          if (type === "profile") {
            if (img.width >= 400) {
              resolve(true);
            } else {
              toast.error("A imagem precisa ter pelo menos 400 pixels de largura.");
              reject("A imagem precisa ter pelo menos 400 pixels de largura.");
            }
          } else {
            if (img.width >= 1280) {
              resolve(true);
            } else {
              toast.error("A imagem precisa ter pelo menos 1280 pixels de largura.");
              reject("A imagem precisa ter pelo menos 1280 pixels de largura.");
            }
          }
        }
      }
      reader.readAsDataURL(file);
    });
  };

  const handleResizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
          const maxWidth = 1280;
          const maxHeight = 1280;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxWidth;
              height = width / aspectRatio;
            } else {
              height = maxHeight;
              width = height * aspectRatio;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            const newName = handleGenerateNewImageName(file);
            const resizedFile = new File([blob], newName, {
              type: file.type,
            });
            resolve(resizedFile);
          }, file.type);
        };
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleGenerateNewImageName = (file) => {
    const splittedName = file.name.split(".");
    const extension = splittedName[splittedName.length - 1];
    const randomString = Math.random().toString(36).substring(2, 7);
    const timestamp = Date.now();
    const newName = `${formData.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-cover-${randomString}-${timestamp}.${extension}`;
    return newName;
  };

  async function uploadFileToS3(file, type) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("idUser", bodyToken.idUser);
    formData.append("typeUser", atob(sessionStorage.getItem("typeUser")));

    try {
      const token = atob(sessionStorage.getItem("token"));
      const response = await api.post(type === "cover" ? "files/upload-profile-header" : "files/upload-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao realizar upload de imagem:", error);
      throw error;
    }
  }

  const handlePostImage = async (type) => {
    const fileToUpload = type === "cover" ? selectedFileCover : selectedFileProfile;
    if (!fileToUpload) {
      toast.error("Nenhum arquivo foi selecionado.");
      return;
    }
    try {
      const resizedFile = await handleResizeImage(fileToUpload);
      const uploadResponse = await uploadFileToS3(resizedFile, type);
      if (uploadResponse) {
        const successMessage = type === "cover" ? "Capa atualizada com sucesso!" : "Imagem de perfil atualizada com sucesso!";
        toast.success(successMessage);
        const imageUrl = uploadResponse.data;
        
        if (type === "cover") {
          setCoverImageUrlLocal(imageUrl);
          sessionStorage.setItem("coverPhoto", btoa(imageUrl));
        } else {
          setProfileImageUrlLocal(imageUrl);
          sessionStorage.setItem("profilePhoto", btoa(imageUrl));
        }

        const profileUpdateData = {
          profilePhoto: type === "cover" ? null : imageUrl,
          profileHeaderImg: type === "cover" ? imageUrl : null,
        };

        const updateResponse = await api.patch(`/establishments/profile/${bodyToken.idUser}`, profileUpdateData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${atob(sessionStorage.getItem("token"))}`,
          },
        });

        if (updateResponse.status === 200) {
          toast.success("Perfil atualizado com sucesso!");
          handleClose();
          
          setTimeout(() => {getEstablishment();}, 2000); 

        } else {
          throw new Error("Atualização de perfil falhou");
        }
      } else {
        toast.error("Falha no upload da imagem.");
      }
    } catch (error) {
      const errorMessage = error.message || "Erro ao processar a solicitação.";
      console.error(errorMessage, error);
    }
  };

  useEffect(() => {
    getEstablishment();
  }, []);

  useEffect(() => {
  }, [formData]);

  return (
    <div className="establishment-edit">
      <GenericModal open={open} classNameModal={content === "edit-info" ? "save-edit-establishment-modal" : "update-password-establishment-modal"} handleClose={handleClose}>
        {content === "edit-info" && (
          <div className="edit-modal-confirm">
            <h3 className="title-edit-profile">Confirme Informações</h3>
            <InputField
              id="passwordConfirm"
              label="Senha"
              type="password"
              defaultValue={formData.passwordConfirm}
              value={formData.passwordConfirm}
              onChange={handleInputChange}
            />
            <ButtonPrimary
              text="Confirmar"
              onclick={() => updateEstablishment("information")}
            />
          </div>
        )}
        {content === "edit-password" && (
          <div className="edit-modal-password">
            <h3 className="title-edit-profile">Confirme Informações</h3>
            <InputField
              id="passwordConfirm"
              label="Senha"
              type="password"
              defaultValue={formData.passwordConfirm}
              value={formData.passwordConfirm}
              onChange={handleInputChange}
            />
            <InputField
              id="passwordNew"
              label="Nova Senha"
              type="password"
              defaultValue={formData.passwordNew}
              value={formData.passwordNew}
              onChange={handleInputChange}
            />
            <InputField
              id="passwordNewConfirmation"
              label="Confirme a nova senha"
              type="password"
              defaultValue={formData.passwordNewConfirmation}
              value={formData.passwordNewConfirmation}
              onChange={handleInputChange}
            />
            <div className="btn-box-modal-password">
              <ButtonPrimary
                text="Confirmar"
                onclick={() => updateEstablishment("password")}
              />
            </div>
          </div>
        )}
        {content === "edit-cover-image" && (
          <div className="edit-modal-default">
            <h3 className="title-edit-profile">Altere a foto de capa</h3>
            <img
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
              src={
                selectedFileCover === null
                  ? coverImageUrlLocal
                  : URL.createObjectURL(selectedFileCover)
              }
              alt={coverImageUrlLocal}
            />
            <div className="upload-edit-background-box">
              <input
                className="input-file"
                type="file"
                name="cover"
                id="cover"
                onChange={(event) => handleFileChange("cover", event)}
              />
            </div>
            <ButtonPrimary text="Confirmar" onclick={() => handlePostImage("cover")} />
          </div>
        )}
        {content === "edit-profile-image" && (
          <div className="edit-modal-default">
            <h3 className="title-edit-profile">Altere a foto de perfil</h3>
            <img
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid black",
                marginTop: "5rem",
              }}
              src={
                selectedFileProfile === null
                  ? profileImageUrlLocal
                  : URL.createObjectURL(selectedFileProfile)
              }
              alt={profileImageUrlLocal}
            />
            <div className="upload-edit-profile-box">
              <input
                className="input-file"
                type="file"
                name="PROFILE"
                id="profile"
                onChange={(event) => handleFileChange("profile", event)}
              />
            </div>
            <ButtonPrimary 
              text="Confirmar"
              onclick={() => handlePostImage("profile")}
            />
          </div>
        )}
        {content === "delete-cover-image" && (
          <div>
            <h3 className="title-edit-profile">Confirme Informações</h3>
            <InputField
              id="passwordConfirmEditPhoto"
              label="Senha"
              type="password"
              defaultValue={formData.passwordConfirmEditPhoto}
              value={formData.passwordConfirmEditPhoto}
              onChange={handleInputChange}
            />
            <ButtonPrimary
              text="Confirmar"
              onclick={() => deleteEstablishmentImages("cover")}
            />
          </div>
        )}
        {content === "delete-profile-image" && (
          <div>
            <h3 className="title-edit-profile">Confirme Informações</h3>
            <InputField
              id="passwordConfirmEditPhoto"
              label="Senha"
              type="password"
              defaultValue={formData.passwordConfirmEditPhoto}
              value={formData.passwordConfirmEditPhoto}
              onChange={handleInputChange}
            />
            <ButtonPrimary
              text="Confirmar"
              onclick={() => deleteEstablishmentImages("profile")}
            />
          </div>
        )}
      </GenericModal>
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
                    id={"establishmentName"}
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
                  rows={3}
                  label="Descrição"
                  id={"description"}
                  defaultValue={formData.description}
                  value={formData.description}
                  placeholder="Descrição do estabelecimento"
                  classNameGeral="form-group-establisment-edit-fill"
                  onChange={handleInputChange}
                />
              </form>
              <div className="establishment-edit-sec-btn">
                <ButtonPrimary
                  className="button-establishment-edit"
                  onclick={() => {
                    handleOpenModal("edit-info");
                  }}
                  text={"Atualizar"}
                />
                <ButtonPrimary
                 
                  className="establishment-edit-sec-delete"
                  text={"Atualizar senha"}
                  onclick={() => {
                    handleOpenModal("edit-password");
                  }}
                />
              </div>
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
                      className="cover-img-edit-establishment"
                      src={
                        selectedFileCover === null
                          ? coverImageUrlLocal
                          : URL.createObjectURL(selectedFileCover)
                      }
                      alt="Capa do Estabelecimento"
                    />
                    <img
                      className="cover-img-edit-establishment-profile"
                      src={
                        selectedFileProfile === null
                          ? profileImageUrlLocal
                          : URL.createObjectURL(selectedFileProfile)
                      }
                      alt="Perfil do Estabelecimento"
                    />
                  </div>
                </div>
                <div className="section-01">
                  <div className="main-section-btn-preview">
                    <div className="section-btn-profile-picture">
                      <ButtonPrimary
                        onclick={() => {
                          handleOpenModal("edit-cover-image");
                        }}
                        className="establishment-edit-sec-add"
                        text={"Adicionar foto de capa"}
                      />
                       
                    </div>
                    <div className="section-btn-profile-picture">
                      <ButtonPrimary
                        onclick={() => {
                          handleOpenModal("edit-profile-image");
                        }}
                        className="establishment-edit-sec-add"
                        text={"Adicionar foto de perfil"}
                      />
                       
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EstablismentEditPersonal;
