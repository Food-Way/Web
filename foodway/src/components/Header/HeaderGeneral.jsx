import React, { useEffect, useState } from 'react';
import SelectCategory from '../SelectCategory/SelectCategory';
import SearchBar from '../SearchBar/SearchBar';
import SelectLocation from '../SelectionLocation/SelectionLocation';
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
                            <li>Inicio</li>
                            <li>Login</li>
                            <li>Cadastro</li>
                        </ul>
                    </nav>
                </div>
            </header> 
        </>
    );
}

export default Header;