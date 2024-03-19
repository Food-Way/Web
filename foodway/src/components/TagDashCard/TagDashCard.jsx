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
        // console.log(response.data);
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
                                {props.tags === undefined || props.tags.length === 0 ? (
                                    <span className="no-content">Nenhuma tag selecionada</span>
                                ) : (
                                    props.tags.map((item, index) => (
                                        <div className="tag-dash-item" key={index}>
                                            <span>{item.nome}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="tag-modal-available">
                                <span>Tags Disponíveis</span>
                                {allTags === undefined || allTags.length === 0 ? (
                                    <span className="no-content">Nenhuma tag disponível</span>
                                ) : (
                                    allTags.map((item, index) => (
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
                    {props.tags === undefined || props.tags.length == 0 ? (
                        <span className="no-content">Nenhuma Tag Cadastrada</span>
                    ) : (
                        props.tags.map((item, index) => (
                            <div className="tag-dash-item" key={index}>
                                <span>{item.nome}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default TagDashCard;