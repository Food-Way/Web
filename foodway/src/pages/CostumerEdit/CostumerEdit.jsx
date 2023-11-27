import "./CostumerEdit.css";
import { ButtonPrimary } from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { TextAreaField } from "../../components/InputField/InputField";
import { Box, Input, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const CostumerEdit = () => {
  const [content, setContent] = useState("");
  const [selectedFileCover, setSelectedFileCover] = useState(null);
  const [selectedFileProfile, setSelectedFileProfile] = useState(null);
  const [coverImageUrlLocal, setCoverImageUrlLocal] = useState();
  const [coverImageName, setCoverImageName] = useState();
  const [profileImageUrlLocal, setProfileImageUrlLocal] = useState();
  const [profileImageName, setProfileImageName] = useState();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    password: "",
  });
  const [user, setUser] = useState({
    name: "",
    bio: "",
  });

  async function getUser() {
    try {
      const idUser = atob(sessionStorage.getItem("idUser"));
      const response = await api.get(`/customers/profile/${idUser}`, {
        headers: {
          Authorization: "Bearer " + atob(sessionStorage.getItem("token")),
        },
      });

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

  useEffect(() => {
    getUser();
  }, []);
  const checkPassword = () => {
    if (formData.password.trim === "") {
      toast.error("A senha não pode ser vazia");
      return false;
    } else {
      return true;
    }
  };
  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEdit = () => {
    setContent("edit");
    setOpen(true);
  };
  const handleOpenCover = () => {
    setContent("cover");
    setOpen(true);
  };
  const handleOpenProfile = () => {
    setContent("profile");
    setOpen(true);
  };

  const handleUpdateProfileInfo = async () => {
    const profileUpdateData = {
      name: formData.name,
      bio: formData.bio,
      email: atob(sessionStorage.getItem("email")),
      profilePhoto: "",
      profileHeaderImg: "",
      password: formData.password,
    };
    try {
      //atualiza os dados do perfil
      const updateResponse = await api.patch(
        `/customers/profile/${atob(sessionStorage.getItem("idUser"))}`,
        profileUpdateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${atob(sessionStorage.getItem("token"))}`,
          },
        }
      );
      console.log("updateResponse", updateResponse);

      if (updateResponse.status === 200) {
        toast.success("Perfil atualizado com sucesso!");
        setCoverImageUrlLocal(updateResponse.data.profileHeaderImg);
        handleClose();
      }
    } catch (updateError) {
      toast.error("Suas credenciais estão incorretas!");
      console.error("Erro ao atualizar os dados do perfil:", updateError);
    }
  };

  const handleFileChangeCover = async (event) => {
    const file = event.target.files[0];
    try {
      const isValid = await validarImagemCover(file);
      if (isValid) {
        setSelectedFileCover(file);
      } else {
        // Informar ao usuário que a imagem não atende aos requisitos
        console.error(
          "A imagem precisa ter pelo menos 1280 pixels de largura."
        );
      }
    } catch (error) {
      console.error("Erro de validação:", error);
    }
  };
  const handleFileChangeProfile = async (event) => {
    const file = event.target.files[0];
    try {
      const isValid = await validarImagemProfile(file);
      if (isValid) {
        setSelectedFileProfile(file);
      } else {
        // Informar ao usuário que a imagem não atende aos requisitos
        console.error(
          "A imagem precisa ter pelo menos 1280 pixels de largura."
        );
      }
    } catch (error) {
      console.error("Erro de validação:", error);
    }
  };

  const validarImagemCover = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
          if (img.width >= 1280) {
            resolve(true); // A imagem atende ao requisito de largura
          } else {
            toast.error(
              "A imagem precisa ter pelo menos 1280 pixels de largura."
            );
            reject("A imagem precisa ter pelo menos 1280 pixels de largura.");
          }
        };
      };

      reader.readAsDataURL(file);
    });
  };
  const validarImagemProfile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
          if (img.width >= 400) {
            resolve(true); // A imagem atende ao requisito de largura
          } else {
            toast.error(
              "A imagem precisa ter pelo menos 400 pixels de largura."
            );
            reject("A imagem precisa ter pelo menos 400 pixels de largura.");
          }
        };
      };

      reader.readAsDataURL(file);
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
  const handleResizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
          const maxWidth = 1280; // Defina a largura máxima desejada
          const maxHeight = 1280; // Defina a altura máxima desejada
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
            const newName = handleGenerateNewImageName(file); // Gera um novo nome para o arquivo redimensionado
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
  const handlePostImageCover = async () => {
    const oldName = coverImageName;
    if (checkPassword) {
      if (selectedFileCover) {
        // Verifica se há um arquivo selecionado
        try {
          // Tenta redimensionar a imagem
          const resizedFile = await handleResizeImage(selectedFileCover); // Redimensiona a imagem
          const formDataFile = new FormData(); // Cria um objeto FormData
          formDataFile.append("files", resizedFile); // Adiciona o arquivo redimensionado ao objeto FormData

          try {
            // Tenta realizar o upload da imagem
            const response = await api.post(
              "/files/user-images",
              formDataFile,
              {
                // Envia o arquivo para a API
                headers: {
                  "Content-Type": resizedFile.type,
                  Authorization: `Bearer ${atob(
                    sessionStorage.getItem("token")
                  )}`,
                },
              }
            );
            if (response.status === 200) {
              //imagem enviada com sucesso para a azure
              toast.success("Capa atualizada com sucesso!");

              console.log("Capa atualizada com sucesso!" + response.data[0]);
              const imageName = response.data[0];
              console.log("ImageName before set", imageName);
              setCoverImageName(imageName); // this set is not working
              console.log("coverImageName after set", coverImageName);

              const profileUpdateData = {
                name: "",
                profilePhoto: "",
                email: atob(sessionStorage.getItem("email")),
                bio: "",
                profileHeaderImg: `https://foodway.blob.core.windows.net/user-images/${imageName}`,
                password: formData.password,
              };

              // Atualiza os dados do perfil
              console.log("profileUpdateData", profileUpdateData);

              try {
                //atualiza os dados do perfil
                const updateResponse = await api.patch(
                  `/customers/profile/${atob(
                    sessionStorage.getItem("idUser")
                  )}`,
                  profileUpdateData,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${atob(
                        sessionStorage.getItem("token")
                      )}`,
                    },
                  }
                );
                console.log("updateResponse", updateResponse);
                console.log(
                  "updateResponse.data.profileHeaderImg after update",
                  updateResponse.data.profileHeaderImg
                );
                // Atualiza a imagem de capa localmente

                if (updateResponse.status === 200) {
                  toast.success("Perfil atualizado com sucesso!");

                  setCoverImageUrlLocal(updateResponse.data.profileHeaderImg);
                  handleClose();
                }
              } catch (updateError) {
                toast.error("Suas credenciais estão incorretas!");
                console.error(
                  "Erro ao atualizar os dados do perfil:",
                  updateError
                );
              }
            }
            if (response.status === 500) {
              toast.error("Suas credenciais estão incorretas!");
            }
          } catch (error) {
            console.error("Erro ao realizar o upload da capa:", error);
          }
        } catch (error) {
          console.error("Erro ao redimensionar a imagem:", error);
        }
      } else {
        console.error("Nenhum arquivo selecionado para upload.");
      }
    }
  };
  const handlePostImageProfile = async () => {
    const oldName = profileImageName;
    if (checkPassword) {
      if (selectedFileProfile) {
        // Verifica se há um arquivo selecionado
        try {
          // Tenta redimensionar a imagem
          const resizedFile = await handleResizeImage(selectedFileProfile); // Redimensiona a imagem
          const formDataFile = new FormData(); // Cria um objeto FormData
          formDataFile.append("files", resizedFile); // Adiciona o arquivo redimensionado ao objeto FormData

          try {
            // Tenta realizar o upload da imagem
            const response = await api.post(
              "/files/user-images",
              formDataFile,
              {
                // Envia o arquivo para a API
                headers: {
                  "Content-Type": resizedFile.type,
                  Authorization: `Bearer ${atob(
                    sessionStorage.getItem("token")
                  )}`,
                },
              }
            );
            if (response.status === 200) {
              //imagem enviada com sucesso para a azure
              toast.success("Profile picture atualizada com sucesso!");

              console.log("Profile picture com sucesso!" + response.data[0]);
              const imageName = response.data[0];
              console.log("ImageName before set", imageName);
              setProfileImageName(imageName); // this set is not working
              console.log("ProfileImageName after set", profileImageName);

              const profileUpdateData = {
                name: " ",
                profileHeaderImg: "",
                email: atob(sessionStorage.getItem("email")),
                bio: "",
                profilePhoto: `https://foodway.blob.core.windows.net/user-images/${imageName}`,
                password: formData.password,
              };

              // Atualiza os dados do perfil
              console.log("profileUpdateData", profileUpdateData);

              try {
                //atualiza os dados do perfil
                const updateResponse = await api.patch(
                  `/customers/profile/${atob(
                    sessionStorage.getItem("idUser")
                  )}`,
                  profileUpdateData,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${atob(
                        sessionStorage.getItem("token")
                      )}`,
                    },
                  }
                );
                console.log("updateResponse", updateResponse);
                console.log(
                  "updateResponse.data.profileHeaderImg after update",
                  updateResponse.data.profilePhoto
                );
                // Atualiza a imagem de capa localmente

                if (updateResponse.status === 200) {
                  toast.success("Perfil atualizado com sucesso!");

                  setProfileImageUrlLocal(updateResponse.data.profilePhoto);
                  handleClose();
                }
              } catch (updateError) {
                toast.error("Suas credenciais estão incorretas!");
                console.error(
                  "Erro ao atualizar os dados do perfil:",
                  updateError
                );
              }
            }
          } catch (error) {
            console.error("Erro ao realizar o upload da img perfil:", error);
          }
        } catch (error) {
          console.error("Erro ao redimensionar a imagem:", error);
        }
      } else {
        console.error("Nenhum arquivo selecionado para upload.");
      }
    }
  };

  return (
    <div className="costumer">
      <img className="costumer-cover" src={coverImageUrlLocal} alt="" />

      <Modal
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-edit-profile">
          {content === "edit" ? (
            <div>
              <h2>Confirme as alterações</h2>
              <p className="descriptio-warn">
                Ao confirmar as alterações, seu perfil será atualizado.
              </p>
              <InputField
                type={"password"}
                className="input-field-profile"
                label="Senha"
                id="password"
                onChange={handleInputChange}
              />
              <ButtonPrimary
                text="Atualizar informações"
                className="send-cover-btn"
                onclick={handleUpdateProfileInfo}
              />
            </div>
          ) : null}
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
              <InputField
                type={"password"}
                className="input-field-profile"
                label="Senha"
                id="password"
                onChange={handleInputChange}
              />
              <input
                className="input-file"
                type="file"
                name="cover"
                id="cover"
                onChange={handleFileChangeCover}
              />
              <ButtonPrimary
                text="Atualizar capa"
                className="send-cover-btn"
                onclick={handlePostImageCover}
              />
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
              <InputField
                type={"password"}
                className="input-field-profile"
                label="Senha"
                id="password"
                onChange={handleInputChange}
              />
              <input
                className="input-file"
                type="file"
                name="cover"
                id="cover"
                onChange={handleFileChangeProfile}
              />
              <ButtonPrimary
                text="Atualizar Imagem Perfil"
                className="send-cover-btn"
                onclick={handlePostImageProfile}
              />
            </div>
          ) : null}
        </Box>
      </Modal>
      <div className="costumer-container">
        <div className="costumer-section-form">
          <h1 className="title-edit-profile">Editar Perfil</h1>
          <div className="profile-edit">
            <div className="image-section">
              <img className="perfil-img" src={profileImageUrlLocal} alt="" />
              <ButtonPrimary
                text="Selecione a foto de Perfil"
                className="button-edit"
                onclick={handleOpenProfile}
              />
              <ButtonPrimary
                className="button-edit"
                text="Selecione uma capa"
                onclick={handleOpenCover}
              />
            </div>
            <div className="profile-info-section">
              <form>
                <InputField
                  classNameGeral="button-edit-div"
                  className="input-field-profile"
                  label="Nome de perfil"
                  value={formData.name} // Update the value prop to use formData.name
                  type="text"
                  id="name"
                  onChange={handleInputChange}
                />
                <TextAreaField
                  className="input-field-profile"
                  classNameGeral="button-edit-div"
                  value={formData.bio} // Update the value prop to use formData.bio
                  label="Bio"
                  type="text"
                  id="bio"
                  onChange={handleInputChange}
                />
                <div className="profile-form-edit">
                  <ButtonPrimary
                    className="button-save"
                    text="Salvar"
                    onclick={handleOpenEdit}
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
