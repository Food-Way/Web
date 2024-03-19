import React, { useState } from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProductImage = "https://foodway-public-s3.s3.amazonaws.com/website-images/product.png"
import GenericModal from "../../components/GenericModel/GenericModel.jsx";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button.jsx";

import "./Product.css";
import api_call from "../../services/apiImpl.js";
import { toast } from "react-toastify";

const Product = (props) => {
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);
  const handleOpenDeleteProductModal = () => setOpenDeleteProductModal(true);
  const handleCloseDeleteProductModal = () => setOpenDeleteProductModal(false);
  const handleOpenEditProductModal = () => setOpenEditProductModal(true);
  const handleCloseEditProductModal = () => setOpenEditProductModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleEditProduct = async () => {
    if (name === "" || price === "") {
      toast.error('Preencha todos os campos');
      return;
    } else if (price < 0 || isNaN(price)) {
      toast.error('Preço inválido');
      return;
    } else if (Number(name)) {
      toast.error('Nome inválido');
    } else {
      try {
        const response = await api_call("put", `/products/${props.idProduct}`, {
          name: name,
          price: price,
        }, atob(sessionStorage.getItem("token")), null);
        if (response.status === 200) {
          toast.success('Produto editado com sucesso!');
          setTimeout(() => {
            handleCloseEditProductModal();
            location.reload();
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        toast.error('Erro ao editar produto');
      }
    }
  }

  const handleDeleteProduct = async () => {
    const response = await api_call("delete", `/products/${props.idProduct}`, null, atob(sessionStorage.getItem("token")), null);
    if (response.status === 200) {
      toast.success("Produto deletado com sucesso!");
      setTimeout(() => {
        handleCloseDeleteProductModal();
        location.reload();
      }, 2000);
    }
  }

  return (
    <>
      <div className="menu-item-container">
        <div className="menu-item-box">
          <div className="menu-header">
            <span className="product-title">{props.name}</span>
          </div>
          <div className="menu-content">
            <img src={ProductImage} alt="Foto do Produto" />
          </div>
          <div className="menu-footer">
            <span>R$ {props.price}</span>
            {props.editIsAble === true ? (
              <div className="operations">
                <FontAwesomeIcon icon={faTrashCan} onClick={handleOpenDeleteProductModal}/>
                <FontAwesomeIcon icon={faPenToSquare} onClick={handleOpenEditProductModal}/>
                <GenericModal open={openDeleteProductModal} handleClose={handleCloseDeleteProductModal}>
                  <div>
                    <span>Deseja excluir {props.name}?</span>
                    <div className="button-modal-box">
                      <ButtonPrimary text="Confirmar" width={"50%"} onclick={handleDeleteProduct} />
                      <ButtonSecondary text="Cancelar" onclick={handleCloseDeleteProductModal} width={"50%"} />
                    </div>
                  </div>
                </GenericModal>

                <GenericModal open={openEditProductModal} handleClose={handleCloseEditProductModal}>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-container-product">
                      <span>Edição de produto - {props.name}</span>
                      <div className="modal-box-product">
                        <div className="modal-input-box">
                          <label htmlFor="productName">Nome do produto</label>
                          <input type="text" id="productName" onChange={handleChangeName} value={name} />
                        </div>
                        <div className="modal-input-box">
                          <label htmlFor="productPrice">Preço do produto</label>
                          <input type="text" id="productPrice" onChange={handleChangePrice} value={price} />
                        </div>
                      </div>
                      <div className="button-modal-box">
                        <ButtonPrimary text="Enviar" width={"50%"} onclick={handleEditProduct} />
                        <ButtonSecondary text="Cancelar" onclick={handleCloseEditProductModal} width={"50%"} />
                      </div>
                    </div>
                  </form>
                </GenericModal>
              </div>
            ) :
              null}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;