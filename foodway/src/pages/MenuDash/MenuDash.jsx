import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Product from "../../components/Product/Product";
const Plus = "https://foodway-public-s3.s3.amazonaws.com/website-images/plus.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
const ImageFilter = "https://foodway-public-s3.s3.amazonaws.com/website-images/filter.svg";
import Report from "../../components/Report/Report";
import api_call from "../../services/apiImpl";
import ContentLoader from 'react-content-loader';
import parseJWT from "../../util/parseJWT";
import GenericModal from "../../components/GenericModel/GenericModel.jsx";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button.jsx";
import { toast } from 'react-toastify';
import "./MenuDash.css";


const MenuDash = () => {
  const bodyToken = parseJWT();
  const [menu, setMenu] = useState([]);
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

  async function getMenu({ filter }) {
    const response = await api_call("get", `products/establishments/${bodyToken.idUser}/${filter}`, null, atob(sessionStorage.getItem("token")));
    // console.log(response.data);
    setMenu(response.data);
  }

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
        const response = await api_call("post", "products", {
          name: name,
          price: price,
          idEstablishment: bodyToken.idUser
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
                <div className="modal-container-product">
                  <span>Criação de produto</span>
                  <div className="modal-box-product">
                    <div className="modal-input-box">
                      <label htmlFor="productName">Nome do produto</label>
                      <input type="text" id="productName" onChange={handleChangeName} />
                    </div>
                    <div className="modal-input-box">
                      <label htmlFor="productPrice">Preço do produto</label>
                      <input type="text" id="productPrice" onChange={handleChangePrice} />
                    </div>
                  </div>
                  <div className="button-modal-box">
                    <ButtonPrimary text="Enviar" width={"50%"} onclick={handlePostProduct} />
                    <ButtonSecondary text="Cancelar" onclick={handleCloseCreateProductModal} width={"50%"} />
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
                      <span>Nenhum produto</span>
                    ) : (
                      menu.map((item, index) => (
                        <>
                          <Product
                            key={index}
                            editIsAble={true}
                            idProduct={item.idProduct}
                            name={item.name}
                            price={item.price}
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