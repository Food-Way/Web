import React, { useState } from "react";
import Product from "../../../public/product.png";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalSuccess, AlertConfirm } from "../../components/Modal/Modal";

import "./MenuItem.css";

const MenuItem = (props) => {
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = () => {
        setShowAlert(true);
    }

    return (
        <>
            <div className="menu-item-container">
                <div className="menu-item-box">
                    <div className="menu-header">
                        <span className="product-title">{props.name}</span>
                    </div>
                    <div className="menu-content">
                        <img src={Product} alt="" />
                    </div>
                    <div className="menu-footer">
                        <span>R$ {props.price}</span>
                        <div className="operations">
                            <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                            <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} size="2xl" />
                        </div>
                    </div>
                </div>
            </div>
            {showAlert && <AlertConfirm />}
        </>
    );
}

export default MenuItem;