import "./CostumerEdit.css";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { TextAreaField } from "../../components/InputField/InputField";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import parseJWT from "../../util/parseJwt";
import api_call from "../../services/apiImpl";
import GenericModel from "../../components/GenericModel/GenericModel";

const CostumerEdit = () => {
  const bodyToken = parseJWT();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState("");
  const [selectedFileCover, setSelectedFileCover] = useState(null);
  const [selectedFileProfile, setSelectedFileProfile] = useState(null);
  const [coverImageUrlLocal, setCoverImageUrlLocal] = useState();
  const [coverImageName, setCoverImageName] = useState();
  const [profileImageUrlLocal, setProfileImageUrlLocal] = useState();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    password: "",
  });

  async function getUser() {
    try {
      const response = await api_call("get", `/customers/profile/${bodyToken.idUser}`, null, atob(sessionStorage.getItem("token"), null))
      if (response.status === 200) {
        // setCoverImageUrlLocal(response.data.profileHeaderImg);
        console.log("Imagem de capa teste: ", response.data.profileHeaderImg);
        setProfileImageUrlLocal(response.data.profilePhoto);
        setCoverImageUrlLocal(response.data.profileHeaderImg);
        console.log(response.data);
        setFormData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateProfileInfo = async () => {

    if (!formData.name.trim() || !formData.bio.trim()) {
      toast.error("Preencha todos os campos para prosseguir");
      return;
    }

    const profileUpdateData = {
      name: formData.name,
      bio: formData.bio,
      profilePhoto: "",
      profileHeaderImg: "",
    };
    try {
      const updateResponse = await api_call("patch", `/customers/profile/${bodyToken.idUser}`, profileUpdateData, atob(sessionStorage.getItem("token")), null)

      console.log("updateResponse", updateResponse);

      if (updateResponse.status === 200) {
        toast.success("Perfil atualizado com sucesso!");
        setCoverImageUrlLocal(updateResponse.data.profileHeaderImg);
        setTimeout(() => {
          window.location.reload();
          sessionStorage.setItem("username", btoa(formData.name));
        }, 2000);

        handleClose();
      }
    } catch (updateError) {
      toast.error("Suas credenciais estão incorretas!");
      console.error("Erro ao atualizar os dados do perfil:", updateError);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const handleOpenModal = (type, event) => {
    event.preventDefault();
    setContent(type);
    setOpen(true);
  }

  const handleFileChange = async (type, event) => {
    const file = event.target.files[0];
    try {
      const isValid = await validateImage(type, file);
      if (isValid) {
        setSelectedFileProfile(file);
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
              toast.error(
                "A imagem precisa ter pelo menos 400 pixels de largura."
              );
              reject("A imagem precisa ter pelo menos 400 pixels de largura.");
            }
          } else {
            if (img.width >= 1280) {
              resolve(true);
            } else {
              toast.error(
                "A imagem precisa ter pelo menos 1280 pixels de largura."
              );
              reject("A imagem precisa ter pelo menos 1280 pixels de largura.");
            }
          };
        }
      }
      reader.readAsDataURL(file);
    });
  };

  // handle post image

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="costumer">
      <img className="costumer-cover" src={coverImageUrlLocal} alt="" />
      <GenericModel open={open} handleClose={handleClose}>
        {content === "cover" ? (
          <div className="cover-section">
            <h2>Adicione uma capa de perfil</h2>
            <img
              className="cover-img-preview"
              src={
                selectedFileCover === null
                  ? coverImageUrlLocal
                  : URL.createObjectURL(selectedFileCover)
              }
              alt=""
            />
            <p className="descriptio-warn">Selecione uma image de até 1MB</p>
            <input
              className="input-file"
              type="file"
              name="cover"
              id="cover"
              onChange={(event) => handleFileChange("cover", event)}
            />
            <div>
              <ButtonPrimary
                text="Atualizar capa"
                className="send-cover-btn"
              onclick={() => handlePostImage("cover")}
              />
              <ButtonSecondary
                text={"Cancelar"}
                onclick={handleClose}
              />
            </div>
          </div>
        ) : null}
        {content === "profile" ? (
          <div className="picture-section">
            <h2>Adicione uma foto de perfil</h2>
            <img
              className="picture-img-preview"
              src={
                selectedFileProfile === null
                  ? profileImageUrlLocal
                  : URL.createObjectURL(selectedFileProfile)
              }
              alt=""
            />
            <p className="descriptio-warn">Selecione uma image de até 1MB</p>
            <input
              className="input-file"
              type="file"
              name="cover"
              id="cover"
              onChange={(event) => handleFileChange("profile", event)}
            />
            <div>
              <ButtonPrimary
                text="Atualizar Foto de Perfil"
                className="send-cover-btn"
              onClick={() => handlePostImage("profile")}
              />
              <ButtonSecondary
                text={"Cancelar"}
                onclick={handleClose}
              />
            </div>
          </div>
        ) : null}
      </GenericModel>
      <div className="costumer-container">
        <div className="costumer-section-form">
          <h1 className="title-edit-profile">Editar Perfil</h1>
          <div className="profile-edit">
            <div className="image-section">
              <img className="perfil-img" src={profileImageUrlLocal} alt="" />
              <ButtonPrimary
                text="Selecione a foto de Perfil"
                className="button-edit"
                onclick={(event) => handleOpenModal("profile", event)}
              />
              <ButtonPrimary
                className="button-edit"
                text="Selecione uma capa"
                onclick={(event) => handleOpenModal("cover", event)}
              />
            </div>
            <div className="profile-info-section">
              <form>
                <InputField
                  classNameGeral="button-edit-div"
                  className="input-field-profile"
                  label="Nome de perfil"
                  value={formData.name}
                  type="text"
                  id="name"
                  onChange={handleInputChange}
                />
                <TextAreaField
                  className="input-field-profile"
                  classNameGeral="button-edit-div"
                  value={formData.bio}
                  label="Bio"
                  type="text"
                  id="bio"
                  onChange={handleInputChange}
                />
                <div className="profile-form-edit">
                  <ButtonPrimary
                    className="button-save"
                    text="Salvar"
                    onclick={handleUpdateProfileInfo}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostumerEdit;