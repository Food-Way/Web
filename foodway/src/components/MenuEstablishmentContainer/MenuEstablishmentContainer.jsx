import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import SearchBar from "../../components/SearchBar/SearchBar";
const ImageFilter = "https://foodway.blob.core.windows.net/public/filter.svg";
import api from "../../services/api";
import "./MenuEstablishmentContainer.css";

const MenuEstablishmentContainer = ({ menu, setMenu, id, token }) => {
  const [searchFilter, setSearchFilter] = useState("");

  const getEstablishmentMenu = ({ filter }) => {
    api
      .get(`products/establishments/${id}/${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
              <img src={ImageFilter} className="filter" alt="" />
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
            {console.log("Menu: ", menu)}
            {menu.length == 0 ? (
              <>
                {menu.map((item, index) => (
                  <Product
                    editIsAble={false}
                    key={index}
                    idProduct={item.idProduct}
                    name={item.name}
                    price={item.price}
                  />
                ))}
              </>

            ) : "Nenhum produto cadastrado"}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuEstablishmentContainer;
