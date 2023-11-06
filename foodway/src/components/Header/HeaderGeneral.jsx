import React, { useEffect, useState } from 'react';
import SelectCategory from '../SelectCategory/SelectCategory';
import SearchBar from '../SearchBar/SearchBar';
import SelectLocation from '../SelectionLocation/SelectionLocation';
import { Link } from "react-router-dom";
import './HeaderGeneral.css';

function Header() {
    const LogoFoodway = "https://foodway.blob.core.windows.net/public/FoodWayLogo.png"
    return (
        <>
            <header>
                <div className='container'>
                    <div className='left'>
                        <img src={LogoFoodway} alt="Logo FoodWay" />
                        <h1>FoodWay</h1>
                    </div>
                    <SelectCategory />
                    <SearchBar />
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
                </div>
            </header>
        </>
    );
}

export default Header;