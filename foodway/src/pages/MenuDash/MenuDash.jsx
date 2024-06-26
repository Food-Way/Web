import React, { useEffect, useState } from "react";
// import QRCode from "react-qr-code";
import Product from "../../components/Product/Product";
import SearchBar from "../../components/SearchBar/SearchBar";
const Plus = "https://foodway.s3.amazonaws.com/public-images/adicionar.svg";
const ImageFilter = "https://foodway.s3.amazonaws.com/public-images/filter.svg";
import Report from "../../components/Report/Report";
import api_call from "../../services/apiImpl";
import ContentLoader from 'react-content-loader';
import parseJWT from "../../util/parseJWT";
import GenericModal from "../../components/GenericModel/GenericModel.jsx";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button.jsx";
import { InputField } from "../../components/InputField/InputField";
import { toast } from 'react-toastify';
import "./MenuDash.css";
import jsPDF from 'jspdf';
import {api} from "../../services/api";
 

const MenuDash = () => {
  const bodyToken = parseJWT();
  const [selectedFile, setSelectedFile] = useState(null);
  const [menu, setMenu] = useState([]);
  let protocol = window.location.protocol;
  let host = window.location.hostname;
  let port = window.location.port ? ':' + window.location.port : '';
  let urlBase = protocol + '//' + host + port + '/';

  const qrData = `${urlBase}establishment-menu/${bodyToken.idUser}`;
  const qrSize = "200x200";
  const bgColor = "f7f7f7";
  const color = "222222";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [openCreateProductModal, setOpenCreateProductModal] = useState(false);
  const handleOpenCreateProductModal = () => setOpenCreateProductModal(true);
  const handleCloseCreateProductModal = () => setOpenCreateProductModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleFileChange = async ( event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Nenhum arquivo foi selecionado.");
      return;
    }
    console.log(file);
    setSelectedFile(file); 
  };

  async function getMenu({ filter }) {
    const response = await api_call("get", `products/establishments/${bodyToken.idUser}/${filter}`, null, atob(sessionStorage.getItem("token")));
    // console.log(response.data);
    setMenu(response.data);
  }


  const uploadFileToS3 = async (file) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("idUser", bodyToken.idUser);
    formData.append("typeUser", atob(sessionStorage.getItem("typeUser")));
    try {

      const token = atob(sessionStorage.getItem("token"));
      const response = await api.post(`files/upload-product-image`,formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response");
      
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar upload de imagem:", error);
      throw error;
    }
  };

  const handlePostProduct = async () => {
    if (name === "" || price === "") {
      toast.error('Preencha todos os campos');
      return;
    } else if (price < 0 || isNaN(price)) {
      toast.error('Preço inválido');
      return;
    } else if (Number(name)) {
      toast.error('Nome inválido');
    } else {
      try {
        const uploadResponse = await uploadFileToS3(selectedFile);
        console.log(uploadResponse);
        const response = await api_call("post", "products", {
          name: name,
          price: price,
          idEstablishment: bodyToken.idUser,
          photo: uploadResponse
        }, atob(sessionStorage.getItem("token")), null);
        if (response.status === 201) {
          toast.success('Produto criado com sucesso!');
          setTimeout(() => {
            handleCloseCreateProductModal();
            location.reload();
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        toast.error('Erro ao criar produto');
      }
    }
  }

  function showFilter() {
    var filter = document.querySelector(".filter-box");
    filter.classList.toggle("filter-box-show");
  }

  const MenuLoader = () => (
    <ContentLoader
      speed={2}
      width={880}
      height={550}
      viewBox="0 0 880 550"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="10" y="10" rx="0" ry="0" width="275" height="225" />
      <rect x="300" y="10" rx="0" ry="0" width="275" height="225" />
      <rect x="590" y="10" rx="0" ry="0" width="275" height="225" />
      <rect x="10" y="250" rx="0" ry="0" width="275" height="225" />
      <rect x="300" y="250" rx="0" ry="0" width="275" height="225" />
      <rect x="590" y="250" rx="0" ry="0" width="275" height="225" />
    </ContentLoader>
  )


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

  const handleDownloadPDF = async () => {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}&data=${encodeURIComponent(qrData)}&bgcolor=${bgColor}&color=${color}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch QR Code image');
      }
  
      const blob = await response.blob();
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdfWidth;
    
  
      const img = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject('Error reading image data');
        reader.readAsDataURL(blob);
      });
  
      const title = `${atob(sessionStorage.getItem("establishmentName"))} - Cardápio`;
      const subTitle = "Leia o QR code abaixo e tenha mais informações dos produtos";
      const foodway = "Foodway 2024";
  
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineWidth(2);
      pdf.setFillColor(34, 34, 34);
      pdf.roundedRect(20, 50, pdfWidth - 40, 170, 5, 5, 'FD');
  
      pdf.setTextColor(255, 255, 255);
  
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text(title, pdfWidth / 2, 65, { align: 'center' });
  
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(14);
      pdf.text(subTitle, pdfWidth / 2, 75, { align: 'center' });
  
      pdf.addImage(img, 'PNG', pdfWidth / 2 - pdfHeight / 4, 85, pdfHeight / 2, pdfHeight / 2);
  
      pdf.setFontSize(14);
      pdf.text(foodway, pdfWidth / 2, 205, { align: 'center' });
  
      pdf.save('qrcode.pdf');
    } catch (error) {
      console.error('Error downloading QR Code:', error);
    }
  };
  
  useEffect(() => {
    getMenu({ filter: "name" });
  }, []);

  return (
    <>
      <div className="menu-dashboard-container">
        <div className="menu-dashboard-box">
          <span className="title">Cardápio</span>
          <div className="add-item">
            <div className="add-item-box" onClick={handleOpenCreateProductModal}>
              <img src={Plus} alt="Ícone de adicionar" />
              <span>Criar produto</span>
            </div>
            <GenericModal open={openCreateProductModal} handleClose={handleCloseCreateProductModal}>
              <form onSubmit={handleSubmit}>
                <div className="modal-container-product-external">
                  <div className="modal-container-product">
                    <span>Criação de produto</span>
                    <div className="modal-box-product">
                      <div className="modal-input-box">
                        <InputField
                          type="text"
                          label="Nome"
                          placeholder="Nome do produto"
                          id="productName"
                          onChange={handleChangeName}
                        />
                      </div>
                      <div className="modal-input-box">
                        <InputField
                          type="number"
                          label="Preço"
                          placeholder="Preço do produto"
                          id="productPrice"
                          onChange={handleChangePrice}
                        />
                      </div>
                      <input
                        className="input-file"
                        type="file"
                        name="cover"
                        id="cover"
                        onChange={(event) => handleFileChange( event)}
            />
                    </div>
                    <div className="button-modal-box">
                      <ButtonPrimary text="Enviar" width={"45%"} height={"6rem"} onclick={handlePostProduct} />
                      <ButtonSecondary text="Cancelar" width={"45%"} height={"6rem"} onclick={handleCloseCreateProductModal} />
                    </div>
                  </div>
                </div>
              </form>
            </GenericModal>
          </div>
          <div className="dash-container">
            <section>
              <div className="menu-dash-container">
                <div className="menu-dash-header">
                  <SearchBar placeholder="Buscar produto" />
                  <div className="menu-filter-box">
                    <img src={ImageFilter} className="filter" alt="Ícone de filtro" />
                    <div className="item-filter-box">
                      <span className="item-filter" id="1" onClick={() => { selectFilter("1") }}>Preço -</span>
                      <span className="item-filter" id="2" onClick={() => { selectFilter("2") }}>Preço +</span>
                      <span className="item-filter" id="3" onClick={() => { selectFilter("3") }}>A-Z</span>
                      <span className="item-filter" id="4" onClick={() => { selectFilter("4") }}>Z-A</span>
                    </div>
                  </div>
                </div>
                <div className="menu-dash-box">
                  {menu === undefined || menu.length === 0 ? (
                    <MenuLoader />
                  ) : (
                    menu === undefined || menu.length === 0 ? (
                      <span className="no-content">Nenhum produto</span>
                    ) : (
                      menu.map((item, index) => (
                        <>
                          <Product
                            key={index}
                            editIsAble={true}
                            idProduct={item.idProduct}
                            name={item.name}
                            price={item.price}
                            photo={item.photo}
                          />
                        </>
                      ))
                    )
                  )}
                </div>
              </div>
            </section>
            <div className="side-infos">
              <div className="side-qr-code">
                <span className="title">QrCode</span>
                <div className="qr-code-box">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}&data=${encodeURIComponent(qrData)}&bgcolor=${bgColor}&color=${color}`} alt="foto" />
                  <button className="btn-qr-code" onClick={handleDownloadPDF}>Download do QR code</button>
                </div>
              </div>
              <div className="side-report">
                <span className="title">Relatório</span>
                <div className="report-side-container">
                  <div className="report-side-box">
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