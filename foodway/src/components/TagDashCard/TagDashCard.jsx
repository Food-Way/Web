import { React, useEffect, useState } from "react";
import CheckboxSelect from "../../components/CheckboxSelect/CheckboxSelect";
import GenericModal from "../GenericModel/GenericModel";
import api_call from "../../services/apiImpl";

import "./TagDashCard.css";

function TagDashCard(props) {
    const [openModal, setOpenModal] = useState(false);
    const [allTags, setAllTags] = useState([]);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const establishmentTags = [
        {
            "nome": "Pode Fumar",
            "valor": true,
            "descricao": "Área designada para fumantes disponível"
        },
        {
            "nome": "Wi-Fi Grátis",
            "valor": true,
            "descricao": "Acesso gratuito à internet via Wi-Fi para clientes"
        },
        // {
        //     "nome": "Acessível para Cadeirantes",
        //     "valor": true,
        //     "descricao": "Instalações adaptadas para acesso de cadeirantes"
        // },
        // {
        //     "nome": "Aceita Cartões de Crédito",
        //     "valor": true,
        //     "descricao": "Aceita os principais cartões de crédito"
        // },
        // {
        //     "nome": "Estacionamento Próprio",
        //     "valor": false,
        //     "descricao": "Não possui estacionamento próprio, mas há opções nas proximidades"
        // },
        // {
        //     "nome": "Área Externa",
        //     "valor": true,
        //     "descricao": "Possui área externa para atendimento ao ar livre"
        // },
        // {
        //     "nome": "Pet Friendly",
        //     "valor": true,
        //     "descricao": "Permite a entrada de animais de estimação"
        // },
        {
            "nome": "Música ao Vivo",
            "valor": false,
            "descricao": "Não oferece música ao vivo"
        }
    ]

    function openTag() {
        return (
            <>
                <CheckboxSelect
                    selectedValues={""}
                    setSelectedValues={""}
                    selectedCulinaries={""}
                    setSelectedCulinaries={""}
                />
            </>
        )
    }

    async function getTags() {
        const response = await api_call("get", "/tags", null, atob(sessionStorage.getItem("token")));
        setAllTags(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        getTags();
    }, [])

    return (
        <>
            <div className="tag-dash-container">
                <div className="selection-tag-box">
                    <span className="title-selection-tag">Tags escolhidas</span>
                    <GenericModal open={openModal} handleClose={handleCloseModal}>
                        <div className="tag-modal-container">
                            <div className="tag-modal-selected">
                                <span>Tags Selecionadas</span>
                                {establishmentTags.length === 0 ? (
                                    <span className="no-content">Nenhuma tag selecionada</span>
                                ) : (
                                    establishmentTags.map((item, index) => (
                                        <div className="tag-dash-item" key={index}>
                                            <span>{item.nome}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="tag-modal-available">
                                <span>Tags Disponíveis</span>
                                {establishmentTags.length === 0 ? (
                                    <span className="no-content">Nenhuma tag disponível</span>
                                ) : (
                                    establishmentTags.map((item, index) => (
                                        <div className="tag-dash-item" key={index}>
                                            <span>{item.nome}</span>
                                        </div>

                                    ))
                                )}
                            </div>
                        </div>
                    </GenericModal>
                    <div className="btn-dash-tag" onClick={handleOpenModal}>
                        <span>Selecionar tag</span>
                    </div>
                </div>
                <div className="tag-dash-itens">
                    {establishmentTags.map((item, index) => (
                        <div className="tag-dash-item" key={index}>
                            <span>{item.nome}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TagDashCard;