import React, { useEffect, useState } from 'react';
import LogoFoodWay from '../../assets/img/FoodWayLogo.png';
import SelectCategory from '../SelectCategory/SelectCategory';
import SearchBar from '../SearchBar/SearchBar';
import SelectLocation from '../SelectLocation/SelectLocation';
import './HeaderGeneral.css';

function Header() {

    return (
        <>
            <header>
                <div className='container'>
                    <div className='left'>
                        <img src={LogoFoodWay} alt="Logo FoodWay" />
                        <h1>FoodWay</h1>
                    </div>
                    <SelectCategory />
                    <SearchBar />
                    <SelectLocation />
                    <nav>
                        <ul>
                            <li>Inicio</li>
                            <li>Cadastro</li>
                            <li>Login</li>
                        </ul>
                    </nav>
                </div>
            </header>
            <img src="src\assets\img\imgTeste.jpeg" alt="" />
        </>
    );
}

export default Header;