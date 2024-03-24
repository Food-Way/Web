import { React, useEffect, useState } from "react";
import CheckboxSelect from "../../components/CheckboxSelect/CheckboxSelect";
import GenericModal from "../GenericModel/GenericModel";
import api_call from "../../services/apiImpl";
import { ButtonPrimary } from "../../components/Button/Button.jsx";
import { ButtonSecondary, ButtonSecondaryLink } from "../../components/Button/Button.jsx";

import "./TagDashCard.css";

function TagDashCard(props) {
    const [openModal, setOpenModal] = useState(false);
    const [allTags, setAllTags] = useState([]);
    const [propsTags, setPropsAllTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => {
        setSelectedTags([]);
        setAllTags([...allTags, ...selectedTags]);
        setOpenModal(false)
    };

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
    }

    function selectTag(id) {
        const selectedTag = allTags.find(tag => tag.id === id);
        if (selectedTag) {
            setAllTags(allTags.filter(tag => tag.id !== id));
            setSelectedTags([...selectedTags, selectedTag]);
        }
    }

    function unSelectTag(id) {
        const unSelectTag = selectedTags.find(tag => tag.id === id);
        if (unSelectTag) {
            setSelectedTags(selectedTags.filter(tag => tag.id !== id));
            setAllTags([...allTags, unSelectTag]);
        }
    }

    useEffect(() => {
        setAllTags([
            {
                "id": 1,
                "name": "Tem bicicletário"
            },
            {
                "id": 2,
                "name": "Tag2"
            },
            {
                "id": 3,
                "name": "Tag3"
            },
            {
                "id": 4,
                "name": "Tag4"
            },
            {
                "id": 5,
                "name": "Tag5"
            },
            {
                "id": 6,
                "name": "Tag6"
            }
        ])
        setPropsAllTags([
            {
                "id": 7,
                "name": "Tag7"
            },
            {
                "id": 8,
                "name": "Tag8"
            },
            {
                "id": 9,
                "name": "Tag9"
            },
            {
                "id": 10,
                "name": "Tag10"
            },
            {
                "id": 11,
                "name": "Tag11"
            },
            {
                "id": 12,
                "name": "Tag12"
            }
        ])
        console.log(propsTags);
        // getTags();
    }, [])

    return (
        <>
            <div className="tag-dash-container">
                <div className="selection-tag-box">
                    <span className="title-selection-tag">Tags escolhidas</span>
                    <GenericModal open={openModal} handleClose={handleCloseModal}>
                        <div className="tag-btn-container">
                            <span className="title-modal-selection-tag">Seleção de tags do estabelecimento</span>
                            <div className="tag-modal-container">
                                <div className="tag-modal-selected">
                                    <span className="title-modal-tag">Tags Selecionadas</span>
                                    {selectedTags === undefined || selectedTags.length === 0 ? (
                                        <span className="no-content">Nenhuma Tag Selecionada</span>
                                    ) : (
                                        <div className="tag-dash-itens-container-selected">
                                            {selectedTags.map((item, index) => (
                                                <div className="tag-dash-item tag-dash-item-selected" key={index} id={item.id} onClick={() => unSelectTag(item.id)}>
                                                    <span>{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="tag-modal-available">
                                    <span className="title-modal-tag">Tags Disponíveis</span>
                                    {allTags === undefined || allTags.length === 0 ? (
                                        <span className="no-content">Nenhuma Tag Disponível</span>
                                    ) : (
                                        <div className="tag-dash-itens-container-available">
                                            {allTags.map((item, index) => (
                                                <div className="tag-dash-item" key={index} id={item.id} onClick={() => selectTag(item.id)}>
                                                    <span>{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="button-modal-container">
                                <ButtonPrimary text="Enviar" onclick={() => setOpenModal(false)} width={"22vw"} height={"6rem"} />
                                <ButtonSecondary text="Cancelar" onclick={handleCloseModal} width={"22vw"} height={"6rem"} />
                            </div>
                        </div>
                    </GenericModal>
                    <div className="btn-dash-tag" onClick={handleOpenModal}>
                        <span>Selecionar tag</span>
                    </div>
                </div>
                <div className="tag-dash-itens-container-preview">
                    {selectedTags === undefined || selectedTags.length == 0 ? (
                        <span className="no-content">Nenhuma Tag Cadastrada</span>
                    ) : (
                        <div className="tag-preview-box">
                            {selectedTags.map((item, index) => (
                                <div className="tag-dash-item-preview" key={index}>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default TagDashCard;