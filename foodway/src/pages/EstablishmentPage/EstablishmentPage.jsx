import { React, useState } from "react";
import api, { api_maps } from "../../services/api.js";
import { HandleFormModal } from "../../components/Modal/Modal";
import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
import Phone from "../../../public/phone.png"
import BookMenu from "../../../public/book-menu.png"
import Report from "../../../public/report.png"
import Add from "../../../public/adicionar.svg"
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CommentIndividual, CommentReply } from "../../components/Comment/Comment.jsx";

import "./EstablishmentPage.css";

const EstablishmentPage = () => {
    const params = useParams();
    const idEstablishment = params.id;
    const [updateText, setUpdateText] = useState(false);
    const [url, setUrl] = useState("");
    const [profile, setProfile] = useState([]);
    const [comments, setComments] = useState([]);
    const apiKey = "AIzaSyBdmmGVqp3SOAYkQ8ef1SN9PDBkm8JjD_s";

    function getEstablishmentProfileData() {

        const response = api.get(`/establishments/profile/${idEstablishment}`, {
            headers: {
                Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response: ", response.data);
                    setProfile(response.data);
                    setComments(response.data.comments);
                }
            })
            .catch((erro) => console.log(erro));
    }


    async function getMaps(lat, lng) {
        // if (search.length > 0) {

        try {
            const response = await api_maps.get(`staticmap?center=${lat},${lng}&zoom=15&size=225x100&key=${apiKey}`, {
                responseType: 'arraybuffer', // Indica que a resposta é binária
            });
            // console.log("Response da API de Mapas:", response);

            if (response.status === 200 && response.data) {
                const blob = new Blob([response.data], { type: 'image/png' });
                const dataUrl = URL.createObjectURL(blob);

                // console.log("URL do Mapa:", dataUrl);
                setUrl(dataUrl);
            } else {
                console.error('Resposta inválida da API de Mapas:', response);
            }
        } catch (error) {
            console.error('Erro ao buscar o mapa:', error);
        }
        // }
    }

    function showFormAdd() {
        return (
            <HandleFormModal
                confirmText="Comentar"
                cancelText="Cancelar"
                lblCampo1="Título"
                lblCampo2="Assunto"
                iptCampo2="productPrice"
                iptCampo1="productName"
                successTitle="Comentário criado!"
                content="Adicionar comentário"
                status={201}
                method="post"
                uri="comments"
                idCustomer={atob(sessionStorage.getItem("idUser"))}
                idEstablishment={idEstablishment}
            />
        )
    }

    useEffect(() => {
        getEstablishmentProfileData();
        getMaps(profile.lat, profile.lng);
    }, []);

    var id = 1;
    return (
        <>
            <div className="establishment-content-container">
                <section>
                    <div className="establishment-banner-box">
                        <div className="establishment-content-banner-box">
                            <div className="establishment-title-box">
                                <h1 className="title-establishment">{profile.name}</h1>
                                <span>{profile.culinary}</span>
                            </div>
                            <div className="establishment-avaliation-principal">
                                <div className="establishment-avaliation-value">
                                    <span>Avaliação</span>
                                    <span>{profile.generalRate}</span>
                                </div>
                                <div className="avaliation-general-points">
                                    <AvaliationDashCard rate={profile.foodRate} color="red" category="Comida" />
                                    <AvaliationDashCard rate={profile.ambientRate} color="red" category="Ambiente" />
                                    <AvaliationDashCard rate={profile.serviceRate} color="red" category="Atendimento" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="establishment-global-container">
                        <div className="establishment-addcomment-box">
                            <div className="establishment-avaliation-box">
                                <img src={Add} alt="Add comment" />
                                {showFormAdd()}
                            </div>
                        </div>
                        <div className="establishment-comments-info-container">
                            <div className={comments.length > 1 ? "establishment-comments-all-scroll" : "establishment-comments-all"}>
                                {comments.length == 1 ?
                                    <>
                                        {comments.map((item) => (
                                            <CommentIndividual
                                                establishmentName={item.establishmentName}
                                                rate={item.commentRate}
                                                title={item.title}
                                                comment={item.comment}
                                                upvotes={item.upvotes}
                                                idComment={item.idComment}
                                            />
                                        ))}
                                    </> :
                                    <>
                                        <div className="establishment-comments-box-more">
                                            {comments.map((commentParent) => (
                                                <>
                                                    <CommentIndividual
                                                        establishmentName={commentParent.establishmentName}
                                                        rate={commentParent.commentRate}
                                                        title={commentParent.title}
                                                        comment={commentParent.comment}
                                                        upvotes={commentParent.upvotes}
                                                        idComment={commentParent.idComment}
                                                        idCustomer={atob(sessionStorage.getItem("idUser"))}
                                                        idEstablishment={idEstablishment}
                                                    />
                                                    <div className={commentParent.childComments.length > 0 ? "scroll-comments" : "establishment-more-box"}>
                                                        {commentParent.childComments.map((commentReply) => (
                                                            <CommentReply
                                                                establishmentName={commentReply.establishmentName}
                                                                rate={commentReply.commentRate}
                                                                title={commentReply.title}
                                                                upvotes={commentReply.upvotes}
                                                                comment={commentReply.comment}
                                                                idComment={commentReply.idComment}
                                                                idCustomer={atob(sessionStorage.getItem("idUser"))}
                                                                idEstablishment={idEstablishment}
                                                            />
                                                        ))}
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </>}
                            </div>
                            <div className="establishment-side-box">
                                {/* <div className="establishment-tags-box">
                                    <span className="establishment-tags-title">Tags</span>
                                    <div className="establishment-tag-content">
                                        <div className="establishment-tag-box">
                                            <span>Pode fumar</span>
                                        </div>
                                        <div className="establishment-tag-box">
                                            <span>Pode fumar</span>
                                        </div>
                                        <div className="establishment-tag-box">
                                            <span>Pode fumar</span>
                                        </div>
                                        <div className="establishment-tag-box">
                                            <span>Pode fumar</span>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="establishment-general-box">
                                    <div className="establishment-value-box">
                                        <span className="establishment-info-value">{profile.qtdComments}</span>
                                        <span>Comentários</span>
                                    </div>
                                    <div className="establishment-value-box">
                                        <span className="establishment-info-value">{profile.qtdUpvotes}</span>
                                        <span>UpVotes</span>
                                    </div>
                                    <div className="establishment-value-box">
                                        <span className="establishment-info-value">{profile.qtdRates}</span>
                                        <span>Avaliações</span>
                                    </div>
                                </div>
                                <div className="establishment-btns-box">
                                    <Link to={`/establishment-menu/${idEstablishment}`} className="linkItem">
                                        <div className="establishment-menu-btn">
                                            <img src={BookMenu} alt="Book" />
                                            <span>Cardápio</span>
                                        </div>
                                    </Link>
                                    <div className="establishment-contact-btn">
                                        <img src={Phone} alt="Phone" />
                                        <span>Contato</span>
                                    </div>
                                </div>
                                <div className="establishment-location-box">
                                    <span className="establishment-location-title">Localização</span>
                                    <div className="establishment-map-box">
                                        <img src={url} alt="" />
                                    </div>
                                </div>
                                <div className="establishment-report-box">
                                    <img src={Report} alt="" />
                                    <span>Reportar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default EstablishmentPage;