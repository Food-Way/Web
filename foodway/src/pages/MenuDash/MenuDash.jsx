import React from "react";
import QRCode from "react-qr-code";

import { ModalSuccess } from "../../components/Modal/Modal";
import MenuItem from "../../components/MenuItem/MenuItem";
import Adicionar from "../../../public/adicionar.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filter from "../../../public/filter.svg";
import Report from "../../components/Report/Report";


import "./MenuDash.css";

const MenuDash = () => {

    return (
        <>
            <div className="menu-dashboard-container">
                <div className="menu-dashboard-box">
                    <span className="title">Cardápio</span>
                    <div className="add-item">
                        <img src={Adicionar} alt="" />
                        <span>Criar Item</span>
                    </div>
                    <div className="dash-container">
                        <section>
                            <div className="menu-dash-container">
                                <SearchBar />
                                <div className="filter-box">
                                    <img src={Filter} className="filter" alt="" />
                                </div>
                                <div className="menu-dash-box">
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
                                    <MenuItem />
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