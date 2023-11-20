import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { HandleFormModal } from "../../components/Modal/Modal";
import Product from "../../components/Product/Product";
import Adicionar from "../../../public/adicionar.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filter from "../../components/Filter/Filter";
import ImageFilter from "../../../public/filter.svg";
import Report from "../../components/Report/Report";
import api from "../../services/api";


import "./MenuDash.css";

const MenuDash = () => {
    const [menu, setMenu] = useState([]);

    function getMenu() {
        const response = api.get('menu', {
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

        for (let index = 1; index <= 4; index++) {
            var indexFilter = document.getElementById(`${index}`);
            if (indexFilter.classList.contains("item-filter-active") && `${index}` != id) {
                indexFilter.classList.toggle("item-filter-active");
            }
        }
        selectedFilter.classList.toggle("item-filter-active");
    }

    useEffect(() => {
        getMenu();
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
                                iptProductPrice="productPrice"
                                iptProductName="productName"
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