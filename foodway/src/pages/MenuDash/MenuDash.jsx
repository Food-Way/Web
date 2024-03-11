import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { HandleFormModal } from "../../components/Modal/Modal";
import Product from "../../components/Product/Product";
const Adicionar = "https://foodway-public-s3.s3.amazonaws.com/website-images/adicionar.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
const ImageFilter = "https://foodway-public-s3.s3.amazonaws.com/website-images/filter.svg";
import Report from "../../components/Report/Report";
import api_call from "../../services/apiImpl";
import ContentLoader from 'react-content-loader';
import parseJWT from "../../util/parseJWT";
import "./MenuDash.css";

const MenuDash = () => {
  const bodyToken = parseJWT();
  const [menu, setMenu] = useState([]);

  async function getMenu({ filter }) {
    const response = await api_call("get", `products/establishments/${bodyToken.sub}/${filter}`, null, atob(sessionStorage.getItem("token")));
    console.log(response.data);
    setMenu(response.data);
  }

  function showFilter() {
    var filter = document.querySelector(".filter-box");
    filter.classList.toggle("filter-box-show");
  }

  const MenuLoader = () => (
    <ContentLoader
      speed={2}
      width={880}
      height={450}
      viewBox="0 0 880 450"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="10" y="10" rx="0" ry="0" width="250" height="200" />
      <rect x="270" y="10" rx="0" ry="0" width="250" height="200" />
      <rect x="530" y="10" rx="0" ry="0" width="250" height="200" />
      <rect x="10" y="220" rx="0" ry="0" width="250" height="200" />
      <rect x="270" y="220" rx="0" ry="0" width="250" height="200" />
      <rect x="530" y="220" rx="0" ry="0" width="250" height="200" />
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
                  {menu.length === 0 ? (
                    <MenuLoader />
                  ) : (
                    menu.length === 0 ? (
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