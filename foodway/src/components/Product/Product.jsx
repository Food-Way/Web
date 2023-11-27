import React, { useState } from "react";
import ProductImage from "../../../public/product.png";
import { HandleModalDelete, HandleFormModal } from "../Modal/Modal";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Product.css";

const Product = (props, { editIsAble = true }) => {
  return (
    <>
      <div className="menu-item-container">
        <div className="menu-item-box">
          <div className="menu-header">
            <span className="product-title">{props.name}</span>
          </div>
          <div className="menu-content">
            <img src={ProductImage} alt="" />
          </div>
          <div className="menu-footer">
            <span>R$ {props.price}</span>
            {editIsAble === true ? null : (
              <div className="operations">
                <HandleModalDelete
                  title={"Excluir " + props.name}
                  idProduct={props.idProduct}
                  text="Essa ação não poderá ser revertida!"
                  confirmText="Deletar"
                  successTitle="Produto deleteado!"
                  content={<FontAwesomeIcon icon={faTrashCan} />}
                />

                <HandleFormModal
                  name={props.name}
                  price={props.price}
                  idProduct={props.idProduct}
                  confirmText="Editar"
                  cancelText="Cancelar"
                  lblCampo1="Nome"
                  lblCampo2="Preço"
                  iptProductPrice="productPrice"
                  iptProductName="productName"
                  status={200}
                  successTitle="Produto editado!"
                  content={<FontAwesomeIcon icon={faPenToSquare} />}
                  method="put"
                  uri={"products/" + props.idProduct}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
