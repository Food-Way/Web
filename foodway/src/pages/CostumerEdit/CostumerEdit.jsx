import "./CostumerEdit.css";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { TextAreaField } from "../../components/InputField/InputField";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import parseJWT from "../../util/parseJWT";
import api_call from "../../services/apiImpl";
import GenericModel from "../../components/GenericModel/GenericModel";
import UploadImage from "../../components/UploadImage/UploadImage";
import api from "../../services/api";

const CostumerEdit = () => {
  const bodyToken = parseJWT();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState("");
  const [selectedFileCover, setSelectedFileCover] = useState(null);
  const [selectedFileProfile, setSelectedFileProfile] = useState(null);
  const [coverImageUrlLocal, setCoverImageUrlLocal] = useState();
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
        setProfileImageUrlLocal(response.data.profilePhoto);
        setCoverImageUrlLocal(response.data.profileHeaderImg);
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
  };

  const handleOpenModal = (type, event) => {
    event.preventDefault();
    setContent(type);
    setOpen(true);
  }

  const handleFileChange = async (type, event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Nenhum arquivo foi selecionado.");
      return;
    }
  
    const isValid = await validateImage(type, file);
    if (isValid) {
      type === "cover" ? setSelectedFileCover(file) : setSelectedFileProfile(file);
    } else {
      toast.error("A imagem não atende aos requisitos de tamanho.");
    }
  };
  
  const validateImage = (type, file) => {
    const minWidth = type === "profile" ? 400 : 1280;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          if (img.width >= minWidth) {
            resolve(true);
          } else {
            const errorMessage = `A imagem precisa ter pelo menos ${minWidth} pixels de largura.`;
             
            reject(errorMessage);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };
  
  const uploadFileToS3 = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("idUser", bodyToken.idUser);
    formData.append("typeUser", atob(sessionStorage.getItem("typeUser")));
    formData.append("objectKey", `/user-images/${file.name}`);
    formData.append("path", "user-images");
  
    try {
      const token = atob(sessionStorage.getItem("token"));
      const response = await api.post(
        type === "cover" ? "files/upload-profile-header" : "files/upload-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      sessionStorage.setItem("profilePhoto", btoa(response));
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar upload de imagem:", error);
      throw error;
    }
  };
  
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
        const imageUrl = uploadResponse.url;
  
        if (type === "cover") {
          sessionStorage.setItem("coverPhoto", btoa(imageUrl));
          setCoverImageUrlLocal(imageUrl);
        } else {
          setProfileImageUrlLocal(imageUrl);
          ContactSupportOutlined.log("Imagem de perfil teste: ", btoa(imageUrl));
          sessionStorage.setItem("profilePhoto", btoa(imageUrl));
        }
  
        const profileUpdateData = {
          name: "",
          profilePhoto: type === "cover" ? "" : imageUrl,
          email: atob(sessionStorage.getItem("email")),
          bio: "",
          password: formData.password,
          ...(type === "cover" ? { profileHeaderImg: imageUrl } : {}),
        };
  
        const updateResponse = await api.patch(`/customers/profile/${bodyToken.idUser}`, profileUpdateData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${atob(sessionStorage.getItem("token"))}`,
          },
        });
  
        if (updateResponse.status === 200) {
          toast.success("Perfil atualizado com sucesso!");
          handleClose();
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
  
  const handleResizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
  
        img.onload = () => {
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
    const extension = file.name.split(".").pop();
    const randomString = Math.random().toString(36).substring(2, 7);
    const timestamp = Date.now();
    const newName = `${formData.name.replace(/\s+/g, "-").toLowerCase()}-cover-${randomString}-${timestamp}.${extension}`;
    return newName;
  };
  

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="costumer">
      <img className="costumer-cover" src={selectedFileCover === null
                  ? coverImageUrlLocal
                  : URL.createObjectURL(selectedFileCover)} alt="" />
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
            <div className="btn-switch-background-box">
              <ButtonPrimary
                width={"18vw"}
                height={"6vh"}
                text="Atualizar capa"
                className="send-cover-btn"
                onclick={() => handlePostImage("cover")}
              />
              <ButtonSecondary
                width={"15.7vw"}
                height={"6vh"}
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
            <div className="btn-switch-profile-box">
              <ButtonPrimary
                width={"18vw"}
                height={"6vh"}
                text="Atualizar Foto de Perfil"
                className="send-cover-btn"
                onclick={() => handlePostImage("profile")}
              />
              <ButtonSecondary
                width={"15.7vw"}
                height={"6vh"}
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
              <img className="perfil-img" src={selectedFileProfile === null
                  ? profileImageUrlLocal
                  : URL.createObjectURL(selectedFileProfile)} alt="" />
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