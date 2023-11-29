import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { HandleFormModal } from "../../components/Modal/Modal";
import Product from "../../components/Product/Product";
const Adicionar = "https://foodway.blob.core.windows.net/public/adicionar.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
const ImageFilter = "https://foodway.blob.core.windows.net/public/filter.svg";
import Report from "../../components/Report/Report";
import api from "../../services/api";
import { useParams } from "react-router-dom";

import "./MenuDash.css";

const MenuDash = () => {
    const routeParams = useParams();
    const id = routeParams.id;
    const [menu, setMenu] = useState([]);

    function getMenu({ filter }) {
        const response = api.get(`products/establishments/${id}/${filter}`, {
            headers: {
                Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    setMenu(response.data);
                    console.log("response: ", response.data);
                    console.log("Menu: ", menu);
                }
            })
            .catch((erro) => console.log(erro));
    };

    function showFilter() {
        var filter = document.querySelector(".filter-box");
        filter.classList.toggle("filter-box-show");
    }

    function selectFilter(id) {
        var selectedFilter = document.getElementById(id);

        if (id == 1) {
            getMenu({ filter: "minPrice" });
        } else if (id == 2) {
            getMenu({ filter: "maxPrice" });
        } else if (id == 3) {
            getMenu({ filter: "name" });
        } else if (id == 4) {
            getMenu({ filter: "nameDesc" });
        }

        for (let index = 1; index <= 4; index++) {
            var indexFilter = document.getElementById(`${index}`);
            if (
                indexFilter.classList.contains("item-filter-active") &&
                `${index}` != id
            ) {
                indexFilter.classList.toggle("item-filter-active");
            }
        }

        selectedFilter.classList.toggle("item-filter-active");
    }

    useEffect(() => {
        getMenu({ filter: "name" });
    }, []);

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
        <>
            <div className="menu-dashboard-container">
                <div className="menu-dashboard-box">
                    <span className="title">Cardápio</span>
                    <div className="add-item">
                        <div className="add-item-box">
                            <img src={Adicionar} alt="" />

                            <HandleFormModal
                                confirmText="Criar"
                                cancelText="Cancelar"
                                lblCampo1="Nome"
                                lblCampo2="Preço"
                                iptCampo2="productPrice"
                                iptCampo1="productName"
                                successTitle="Produto Criado!"
                                content="Criar Produto"
                                status={201}
                                method="post"
                                uri="products"
                            />
                        </div>
                    </div>
                    <div className="dash-container">
                        <section>
                            <div className="menu-dash-container">
                                <div className="menu-dash-header">
                                    <SearchBar placeholder="Buscar produto" />
                                    <div className="menu-filter-box">
                                        <img src={ImageFilter} className="filter" alt="" />
                                        <div className="item-filter-box">
                                            <span className="item-filter" id="1" onClick={() => { selectFilter("1") }}>Preço -</span>
                                            <span className="item-filter" id="2" onClick={() => { selectFilter("2") }}>Preço +</span>
                                            <span className="item-filter" id="3" onClick={() => { selectFilter("3") }}>A-Z</span>
                                            <span className="item-filter" id="4" onClick={() => { selectFilter("4") }}>Z-A</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-dash-box">
                                    {menu.map((item) => (
                                        <>
                                            <Product
                                                editIsAble={true}
                                                key={item.idProduct}
                                                idProduct={item.idProduct}
                                                name={item.name}
                                                price={item.price}
                                            />
                                        </>
                                    ))}
                                </div>
                            </div>
                        </section>
                        <div className="side-infos">
                            <div className="side-qr-code">
                                <span className="title">QrCode</span>
                                <div className="qr-code-box">
                                    <QRCode className="qr-code" value="samuel" />
                                </div>
                            </div>
                            <div className="side-report">
                                <span className="title">Relatórios</span>
                                <div className="report-side-container">
                                    <div className="report-side-box">
                                        <Report />
                                        <Report />
                                        <Report />
                                        <Report />
                                        <Report />
                                        <Report />
                                        <Report />
                                        <Report />
                                        <Report />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default MenuDash;