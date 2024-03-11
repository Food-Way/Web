import React, { useEffect, useState } from 'react';
import SelectCategory from '../SelectCategory/SelectCategory';
import SearchBar from '../SearchBar/SearchBar';
import SelectLocation from '../SelectionLocation/SelectionLocation';
import { Link } from "react-router-dom";
import DefaultImage from "../../../public/default-user-image.png";
import './HeaderGeneral.css';
import LogoFoodway from "../../../public/FoodWayLogo.png";
import parseJWT from "../../util/parseJWT";

const Header = (props) => {
    const bodyToken = parseJWT();
    const handleLogoff = () => {
        sessionStorage.clear();
        toast.success("Logout realizado com sucesso!");
        location.reload();
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    function verifyTokenNavigate() {
        sessionStorage.clear();
        window.location.href = "/"
    }

    const LogoFoodway = "https://foodway-public-s3.s3.amazonaws.com/website-images/foodway-logo.png"
    return (
        <>
            <header>
                <div className='container-header'>
                    <div className='left' onClick={verifyTokenNavigate}>
                        <img src={LogoFoodway} className="logoHover" alt="Logo FoodWay" />
                        <h1>FoodWay</h1>
                        {
                            atob(sessionStorage.getItem("typeUser")) == "ESTABLISHMENT" ?
                                <>
                                    <span className='establishment-title-user-profile'>| Estabelecimento: {bodyToken.username}</span>
                                </>
                                : ""
                        }
                    </div>
                    {sessionStorage.getItem("token") ?
                        <>
                            <div className="header-geral-token">
                                <span>Olá, {bodyToken.username}</span>
                                <img src={atob(sessionStorage.getItem("profile-photo")) ? atob(sessionStorage.getItem("profile-photo")) : DefaultImage} alt="" />
                            </div>
                        </>
                        : <>
                            <SelectCategory />
                            <SearchBar placeholder="Buscar estabelecimento" />
                            <SelectLocation />
                            <nav>
                                <ul>
                                    <li>
                                        <Link className="linkItem" to={"/"}>
                                            Inicio
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="linkItem" to={"/sign-in"}>
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="linkItem" to={"sign-up"}>
                                            Cadastro
                                        </Link>
                                    </li>
                                    <li>
                                        {sessionStorage.getItem("token") === null ? (
                                            ""
                                        ) : (
                                            <Link
                                                className="linkItem"
                                                to={"sign-in"}
                                                onClick={handleLogoff}
                                            >
                                                Sair
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </nav>
                        </>}
                </div>
            </header>
        </>
    );
}

export default Header;