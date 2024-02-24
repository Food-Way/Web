import {
  InputField,
  TextAreaField,
} from "../../components/InputField/InputField";
import { ButtonPrimary } from "../../components/Button/Button";
import { useState, useEffect } from "react";
import "./EstablishmentEditPersonal.css";
import api from "../../services/api";
import { Box, Input, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EstablismentEditPersonal = () => {
  const token = atob(sessionStorage.getItem("token"));
  const id = atob(sessionStorage.getItem("idUser"));
  const [formData, setFormData] = useState({});
  const [selectedFileCover, setSelectedFileCover] = useState(null);
  const [selectedFileProfile, setSelectedFileProfile] = useState(null);
  const [coverImageUrlLocal, setCoverImageUrlLocal] = useState();
  const [coverImageName, setCoverImageName] = useState();
  const [profileImageUrlLocal, setProfileImageUrlLocal] = useState();
  const [profileImageName, setProfileImageName] = useState();

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

  const deleteEstablishmentImages = (tipo) => {
    let data = {};

    if (tipo === "profile") {
      data = {
        emailActual: atob(sessionStorage.getItem("email")),
        passwordActual: formData.passwordpasswordConfirmacaoEditPhoto,
        profilePhoto:
          "https://foodway.blob.core.windows.net/public/default-user-image.png",
        profileHeaderImg: "",
      };
    }
    if (tipo === "cover") {
      data = {
        emailActual: atob(sessionStorage.getItem("email")),
        passwordActual: formData.passwordpasswordConfirmacaoEditPhoto,
        profilePhoto: "",
        profileHeaderImg:
          "https://foodway.blob.core.windows.net/public/default-banner.png",
      };
    }
    console.log("Data");
    console.log(data);
    api
      .patch(`establishments/profile/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Imagem deletada com sucesso");
          getEstablishment();
          handleClose();
        }
      })
      .catch((error) => {
        toast.error("Erro ao atualizar informações");
      });
  };

  const updateEstablishment = (responsabilidade) => {
    const data = {
      name: formData.name,
      emailActual: atob(sessionStorage.getItem("email")),
      emailNew: formData.email,
      passwordActual: formData.passwordpasswordConfirmacao,
      passwordNew: formData.passwordNew,
      phone: formData.phone,
      description: formData.description,
    };

    if (responsabilidade === "information") {
      if (data.name === "") {
        toast.error("Nome não pode ser vazio");
        return;
      }
      if (data.emailNew === "") {
        toast.error("E-mail não pode ser vazio");
        return;
      }
      if (data.phone === "") {
        toast.error("Telefone não pode ser vazio");
        return;
      }
      if (data.description === "") {
        toast.error("Descrição não pode ser vazio");
        return;
      }
      if (data.passwordActual === "") {
        toast.error("Senha não pode ser vazio");
        return;
      }
    }

    if (responsabilidade === "password") {
      if (data.passwordActual === "" || data.passwordNew === undefined) {
        toast.error("Senha não pode ser vazio");
        return;
      }
      if (data.passwordNew === "" || data.passwordNew === undefined) {
        toast.error("Nova senha não pode ser vazio");
        return;
      }
      if (
        data.passwordNewConfirmation === "" ||
        data.passwordNew === undefined
      ) {
        toast.error("Confirmação de senha não pode ser vazio");
        return;
      }
      if (data.passwordNew !== formData.passwordNewConfirmation) {
        console.log("data.passwordNew");
        console.log(data.passwordNew);
        console.log("data.passwordNewConfirmation");
        console.log(formData.passwordNewConfirmation);
        toast.error("Senhas não conferem");
        return;
      }
    }

    console.log("Data");
    console.log(data);

    api
      .patch(`establishments/personal/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Informações atualizadas com sucesso");
          getEstablishment();
          handleClose();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error("Erro ao atualizar informações");
        }
        if (error.response.status === 500) {
          toast.error("Erro no servidor");
        }
        if (error.response.status === 401) {
          toast.error("Erro de autenticação:confira sua senha");
        }
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

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = (content) => {
    // if (content === "edit-info") {
    //   if(formData.establishmentName=== "" || formData.establishmentName=== undefined){
    // }
    handleOpen();
    setContent(content);
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
    if (
      formData.passwordCoverConfirm !== "" &&
      formData.passwordCoverConfirm !== undefined
    ) {
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
              "files/public-establisments-images",
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
                emailActual: atob(sessionStorage.getItem("email")),
                passwordActual: formData.passwordCoverConfirm,
                profilePhoto: "",
                profileHeaderImg: `https://foodway.blob.core.windows.net/public-establisments-images/${imageName}`,
              };

              // Atualiza os dados do perfil
              console.log("profileUpdateData", profileUpdateData);

              try {
                //atualiza os dados do perfil
                const updateResponse = await api.patch(
                  `/establishments/profile/${atob(
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
    } else {
      toast.error("Senha não pode ser vazio");
    }
  };
  const handlePostImageProfile = async () => {
    const oldName = profileImageName;
    if (
      formData.passwordCoverConfirm !== "" &&
      formData.passwordCoverConfirm !== undefined
    ) {
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
              "/files/public-establisments-images",
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
                emailActual: atob(sessionStorage.getItem("email")),
                passwordActual: formData.passwordCoverConfirm,
                profilePhoto: `https://foodway.blob.core.windows.net/public-establisments-images/${imageName}`,
                profileHeaderImg: "",
              };

              // Atualiza os dados do perfil
              console.log("profileUpdateData", profileUpdateData);

              try {
                //atualiza os dados do perfil
                const updateResponse = await api.patch(
                  `/establishments/profile/${atob(
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
    } else {
      toast.error("Senha não pode ser vazio");
    }
  };

  return (
    <div className="establishment-edit">
      <Modal
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-edit-profile">
          {content === "edit-info" ? (
            <div className="edit-modal-default ">
              <h3 className="title-edit-profile">Confirme Informações</h3>
              <InputField
                id="passwordpasswordConfirmacao"
                label="Senha"
                type="password"
                defaultValue={formData.passwordpasswordConfirmacao}
                value={formData.passwordpasswordConfirmacao}
                onChange={handleInputChange}
              />
              <ButtonPrimary
                text="Confirmar"
                onclick={() => updateEstablishment("information")}
              />
            </div>
          ) : (
            <></>
          )}
          {content === "edit-password" ? (
            <div className="edit-modal-default ">
              <h3 className="title-edit-profile">Confirme Informações</h3>
              <InputField
                id="passwordpasswordConfirmacao"
                label="Senha"
                type="password"
                defaultValue={formData.passwordpasswordConfirmacao}
                value={formData.passwordConfirmacao}
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
              <ButtonPrimary
                text="Confirmar"
                onclick={() => updateEstablishment("password")}
              />
            </div>
          ) : (
            <></>
          )}
          {content === "edit-cover-image" ? (
            <div className="edit-modal-default ">
              <h3 className="title-edit-profile">Altere a foto de capa</h3>
              <img
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                }}
                src={
                  selectedFileCover === null
                    ? coverImageUrlLocal
                    : URL.createObjectURL(selectedFileCover)
                }
                alt={coverImageUrlLocal}
              />
              <InputField
                type={"password"}
                className="input-field-profile"
                label="Senha"
                id="passwordCoverConfirm"
                defaultValue={formData.passwordCoverConfirm}
                value={formData.passwordCoverConfirm}
                onChange={handleInputChange}
              />
              <Input type="file" onChange={handleFileChangeCover} />
              <ButtonPrimary text="Confirmar" onclick={handlePostImageCover} />
            </div>
          ) : (
            <></>
          )}
          {content === "edit-profile-image" ? (
            <div className="edit-modal-default ">
              <h3 className="title-edit-profile">Altere a foto de perfil</h3>
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={
                  selectedFileProfile === null
                    ? coverImageUrlLocal
                    : URL.createObjectURL(selectedFileProfile)
                }
                alt={coverImageUrlLocal}
              />
              <InputField
                type={"password"}
                className="input-field-profile"
                label="Senha"
                id="passwordCoverConfirm"
                defaultValue={formData.passwordCoverConfirm}
                value={formData.passwordCoverConfirm}
                onChange={handleInputChange}
              />
              <Input type="file" onChange={handleFileChangeProfile} />
              <ButtonPrimary
                text="Confirmar"
                onclick={handlePostImageProfile}
              />
            </div>
          ) : (
            <></>
          )}
          {content === "delete-cover-image" ? (
            <div>
              <h3 className="title-edit-profile">Confirme Informações</h3>
              <InputField
                id="passwordpasswordConfirmacaoEditPhoto"
                label="Senha"
                type="password"
                defaultValue={formData.passwordpasswordConfirmacaoEditPhoto}
                value={formData.passwordpasswordConfirmacaoEditPhoto}
                onChange={handleInputChange}
              />
              <ButtonPrimary
                text="Confirmar"
                onclick={() => deleteEstablishmentImages("cover")}
              />
            </div>
          ) : (
            <></>
          )}
          {content === "delete-profile-image" ? (
            <div>
              <h3 className="title-edit-profile">Confirme Informações</h3>
              <InputField
                id="passwordpasswordConfirmacaoEditPhoto"
                label="Senha"
                type="password"
                defaultValue={formData.passwordpasswordConfirmacaoEditPhoto}
                value={formData.passwordpasswordConfirmacaoEditPhoto}
                onChange={handleInputChange}
              />
              <ButtonPrimary
                text="Confirmar"
                onclick={() => deleteEstablishmentImages("profile")}
              />
            </div>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
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
                  width="200px"
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
                        coverImageUrlLocal === undefined
                          ? formData.profileHeaderImg
                          : coverImageUrlLocal
                      }
                      alt=""
                    />
                    <img
                      className="cover-img-edit-establishment-profile"
                      src={
                        profileImageUrlLocal === undefined
                          ? formData.profilePhoto
                          : profileImageUrlLocal
                      }
                      alt=""
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
                      <ButtonPrimary
                        onclick={() => {
                          handleOpenModal("delete-cover-image");
                        }}
                        width="40px"
                        className="establishment-edit-sec-delete"
                        text={<FontAwesomeIcon icon={faTrashCan} />}
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
                      <ButtonPrimary
                        onclick={() => {
                          handleOpenModal("delete-profile-image");
                        }}
                        width="40px"
                        className="establishment-edit-sec-delete"
                        text={<FontAwesomeIcon icon={faTrashCan} />}
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
