import { React, useEffect, useState } from "react";
import GenericModal from "../GenericModel/GenericModel";
import api_call from "../../services/apiImpl";
import { ButtonPrimary } from "../../components/Button/Button.jsx";
import { ButtonSecondary, } from "../../components/Button/Button.jsx";
import parseJWT from "../../util/parseJWT.jsx";
import "./TagDashCard.css";
import { toast } from "react-toastify";

function TagDashCard(props) {
    const [openModal, setOpenModal] = useState(false);
    const [allTags, setAllTags] = useState();
    const [selectedTags, setSelectedTags] = useState([]);
    const handleOpenModal = () => setOpenModal(true);
    const bodyToken = parseJWT();

    const handleCloseModal = () => {
        setSelectedTags([]);
        setAllTags([...allTags, ...selectedTags]);
        setOpenModal(false)
    };

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

    async function handleGetTags() {
        const response = await api_call("get", "tags", null, atob(sessionStorage.getItem("token")), null);

        setAllTags(response.data)
    }

    async function handleSendTags() {
        console.log(selectedTags);
        const data = {
            idEstablishment: bodyToken.idUser,
            tags: selectedTags.name,
            enable: true
        }
        console.log(data);
        const response = await api_call("post", "/tags", data, atob(sessionStorage.getItem("token")), null);
        console.log(response.data);
        toast.success("Tags cadastradas com sucesso!");
        handleCloseModal();
    }


    useEffect(() => {

        handleGetTags();
        console.log("Testes")
        console.log(allTags);
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
                            <div className="button-modal-container-tags">
                                <ButtonPrimary text="Enviar" onclick={() => {
                                    handleSendTags()
                                    setOpenModal(false)
                                }} width={"22vw"} height={"6rem"} />
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