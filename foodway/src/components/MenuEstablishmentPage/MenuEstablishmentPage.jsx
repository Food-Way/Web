import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import SearchBar from "../../components/SearchBar/SearchBar";
const ImageFilter = "https://foodway-public-s3.s3.amazonaws.com/website-images/filter.svg";
import api_call from "../../services/apiImpl";
import ContentLoader from 'react-content-loader';
import "./MenuEstablishmentPage.css";

const MenuEstablishmentPage = ({ menu, setMenu, id }) => {
  const [searchFilter, setSearchFilter] = useState("");

  
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

  async function getEstablishmentMenu({ filter }) {
    const response = await api_call("get", `products/establishments/${id}/${filter}`, null, null, null)
    console.log("Menu: ", menu);
    setMenu(response.data);
    console.log(menu.length)
  }

  function showFilter() {
    var filter = document.querySelector(".filter-box");
    filter.classList.toggle("filter-box-show");
  }

  function selectFilter(id) {
    var selectedFilter = document.getElementById(id);

    if (id == 1) {
      getEstablishmentMenu({ filter: "minPrice" });
    } else if (id == 2) {
      getEstablishmentMenu({ filter: "maxPrice" });
    } else if (id == 3) {
      getEstablishmentMenu({ filter: "name" });
    } else if (id == 4) {
      getEstablishmentMenu({ filter: "nameDesc" });
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
    getEstablishmentMenu({ filter: "name" });
  }, []);

  return (
    <div className="menu-user-container">
      <section>
        <div className="menu-dash-container">
          <div className="menu-dash-header">
            <SearchBar placeholder="Buscar produto" />
            <div className="menu-filter-box">
              <img src={ImageFilter} className="filter" alt="Ícone de filtro" />
              <div className="item-filter-box">
                <span
                  className="item-filter"
                  id="1"
                  onClick={() => {
                    selectFilter("1");
                  }}
                >
                  Preço -
                </span>
                <span
                  className="item-filter"
                  id="2"
                  onClick={() => {
                    selectFilter("2");
                  }}
                >
                  Preço +
                </span>
                <span
                  className="item-filter"
                  id="3"
                  onClick={() => {
                    selectFilter("3");
                  }}
                >
                  A-Z
                </span>
                <span
                  className="item-filter"
                  id="4"
                  onClick={() => {
                    selectFilter("4");
                  }}
                >
                  Z-A
                </span>
              </div>
            </div>
          </div>
          <div className="menu-dash-box">
            {menu.length === 0 ? (
              <MenuLoader />
            ) : (
              menu.length === 0 ? (
                <span className="no-content">Nenhum produto</span>
              ) : (
                menu.map((item, index) => (
                  <>
                  <Product
                    editIsAble={false}
                    key={index}
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
    </div>
  );
};

export default MenuEstablishmentPage;
