import React from "react";
import Product from "../../../public/product.png";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./MenuItem.css";

const MenuItem = () => {
    return (
        <>
            <div className="menu-item-container">
                <div className="menu-item-box">
                    <div className="menu-header">
                        <span className="product-title">Bolo de morango</span>
                    </div>
                    <div className="menu-content">
                        <img src={Product} alt="" />
                    </div>
                    <div className="menu-footer">
                        <span>R$ 10.20</span>
                        <div className="operations">
                            <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                            <FontAwesomeIcon icon={faTrashCan} size="2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuItem;