import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { HandleFormModal } from "../../components/Modal/Modal";
import Product from "../../components/Product/Product";
import Adicionar from "../../../public/adicionar.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filter from "../../../public/filter.svg";
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

    useEffect(() => {
        getMenu();
    }, []);


    return (
        <>
            <div className="menu-dashboard-container">
                <div className="menu-dashboard-box">
                    <span className="title">Cardápio</span>
                    <div className="add-item">
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
                    <div className="dash-container">
                        <section>
                            <div className="menu-dash-container">
                                <SearchBar placeholder="Buscar produto" />
                                <div className="filter-box">
                                    <img src={Filter} className="filter" alt="" />
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
                                <div className="report-side-box">
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

        </>
    );
}

export default MenuDash;