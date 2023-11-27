import { React, useState } from "react";
import { api_maps } from "../../services/api.js";
import ReactStars from "react-rating-stars-component";
import { HandleFormModal } from "../../components/Modal/Modal";
import Upvotes from "../../components/Upvotes/Upvotes";
import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
import ImageComment from "../../../public/comment-icon.png"
import DefaultUserImage from "../../../public/default-user-image.png"
import Phone from "../../../public/phone.png"
import BookMenu from "../../../public/book-menu.png"
import Report from "../../../public/report.png"
import Add from "../../../public/adicionar.svg"

import "./EstablishmentPage.css";
import { useEffect } from "react";

const EstablishmentPage = () => {
    const [updateText, setUpdateText] = useState(false);
    const [url, setUrl] = useState("");
    const apiKey = "AIzaSyBdmmGVqp3SOAYkQ8ef1SN9PDBkm8JjD_s";

    async function getMaps(lat, lng) {
        // if (search.length > 0) {

        try {
            const response = await api_maps.get(`staticmap?center=${lat},${lng}&zoom=15&size=225x100&key=${apiKey}`, {
                responseType: 'arraybuffer', // Indica que a resposta é binária
            });
            console.log("Response da API de Mapas:", response);

            if (response.status === 200 && response.data) {
                // Cria uma URL de dados a partir do conteúdo binário
                const blob = new Blob([response.data], { type: 'image/png' });
                const dataUrl = URL.createObjectURL(blob);

                console.log("URL do Mapa:", dataUrl);
                setUrl(dataUrl);
            } else {
                console.error('Resposta inválida da API de Mapas:', response);
            }
        } catch (error) {
            console.error('Erro ao buscar o mapa:', error);
        }
        // }
    }

    function analysisText(text, category, upText) {
        var newText = "";
        const tamanho = text.length;
        // if (tamanho > props.size && category == "title") {
        //     newText = text.substring(0, props.size) + "..."
        //     return newText;
        // }

        if (tamanho > 100 && category == "text" && upText == false) {
            newText = text.substring(0, 100) + "..."
            return newText;
        }

        return text;
    }

    function scrollTextShow() {
        var obj = document.querySelector(".comment-content-text");
        obj.classList.toggle("comment-content-show-scroll");
        setUpdateText(!updateText);
    }

    function showFormAdd() {
        return (
            <HandleFormModal
            confirmText="Comentar"
            cancelText="Cancelar"
            lblCampo1="Título"
            lblCampo2="Assunto         "
            iptProductPrice="productPrice"
            iptProductName="productName"
            successTitle="Comentário criado!"
            content="Adicionar comentário"
            status={201}
            method="post"
            uri="products"
        />
        )
    }

    useEffect(() => {
        getMaps(40.714728, -73.998672);
    }, []);

    var id = 1;

    var qtd = ["sus", "lala"];

    var textao = "Lorem ipsum, dolor sit amet consectime vel, nulla ipsa corporis eveniet magnam at fuga quam quasi enim, quia ut. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati magni, odit repellendus ipsa ducimus laboriosam atque! Maxime vel, nulla ipsa corporis eveniet magnam at fuga quam quasi enim, quia ut.";

    return (
        <>
            <div className="establishment-content-container">
                <section>
                    <div className="establishment-banner-box">
                        <div className="establishment-content-banner-box">
                            <div className="establishment-title-box">
                                <h1 className="title-establishment">Japopo's</h1>
                                <span>Comida japonesa</span>
                            </div>
                            <div className="establishment-avaliation-principal">
                                <div className="establishment-avaliation-value">
                                    <span>Avaliação</span>
                                    <span>3.65</span>
                                </div>
                                <div className="avaliation-general-points">
                                    <AvaliationDashCard rate="5" color="red" />
                                    <AvaliationDashCard rate="3" color="red" />
                                    <AvaliationDashCard rate="1" color="red" />
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
                            <div className={qtd.length > 1 ? "establishment-comments-all-scroll" : "establishment-comments-all"}>
                                <div className="establishment-comments-box">
                                    <div className="user-content-comment">
                                        {/*<img className="establishment-user-icon" src={props.userImage == null || undefined || "" ? DefaultUserImage : props.userImage} alt="User image" /> */}
                                        <img className="establishment-user-icon" src={DefaultUserImage} alt="User image" />
                                        <div className="user-content-values">
                                            <ReactStars
                                                size={24}
                                                activeColor={"var(--primary)"}
                                                edit={false}
                                                value={2} />
                                            <p className="comment-content-text">{analysisText(textao, "text", updateText)}</p>
                                            <div className="establishment-upcomment-box">
                                                <div className="establishment-upcomment-values">
                                                    <Upvotes />
                                                    <img src={ImageComment} alt="Image comment" />
                                                </div>
                                                {textao.length > 100 ?
                                                    <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                                        <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                                                    </div> : <div className="more-text"></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {qtd.length == 1 ?
                                    <>
                                        <div className="establishment-comments-box">
                                            <div className="user-content-comment">
                                                {/*<img className="establishment-user-icon" src={props.userImage == null || undefined || "" ? DefaultUserImage : props.userImage} alt="User image" /> */}
                                                <img className="establishment-user-icon" src={DefaultUserImage} alt="User image" />
                                                <div className="user-content-values">
                                                    <ReactStars
                                                        size={24}
                                                        activeColor={"var(--primary)"}
                                                        edit={false}
                                                        value={2} />
                                                    <p className="comment-content-text">{analysisText(textao, "text", updateText)}</p>
                                                    <div className="establishment-upcomment-box">
                                                        <div className="establishment-upcomment-values">
                                                            <Upvotes />
                                                            <img src={ImageComment} alt="Image comment" />
                                                        </div>
                                                        {textao.length > 100 ?
                                                            <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                                                <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                                                            </div> : <div className="more-text"></div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </> :
                                    <>
                                        <div className="establishment-comments-box-more">
                                            <div className="user-content-comment">
                                                {/*<img className="establishment-user-icon" src={props.userImage == null || undefined || "" ? DefaultUserImage : props.userImage} alt="User image" /> */}
                                                <img className="establishment-user-icon" src={DefaultUserImage} alt="User image" />
                                                <div className="user-content-values">
                                                    <ReactStars
                                                        size={24}
                                                        activeColor={"var(--primary)"}
                                                        edit={false}
                                                        value={2} />
                                                    <p className="comment-content-text">{analysisText(textao, "text", updateText)}</p>
                                                    <div className="establishment-upcomment-box">
                                                        <div className="establishment-upcomment-values">
                                                            <Upvotes />
                                                            <img src={ImageComment} alt="Image comment" />
                                                        </div>
                                                        {textao.length > 100 ?
                                                            <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                                                <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                                                            </div> : <div className="more-text"></div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={qtd.length > 1 ? "scroll-comments" : "establishment-more-box"}>
                                                <div className="user-content-comment">
                                                    <div className="establishment-bar" />
                                                    {/*<img className="establishment-user-icon" src={props.userImage == null || undefined || "" ? DefaultUserImage : props.userImage} alt="User image" /> */}
                                                    <img className="establishment-user-icon" src={DefaultUserImage} alt="User image" />
                                                    <div className="user-content-values">
                                                        <ReactStars
                                                            size={24}
                                                            activeColor={"var(--primary)"}
                                                            edit={false}
                                                            value={2} />
                                                        <p className="comment-content-text">{analysisText(textao, "text", updateText)}</p>
                                                        <div className="establishment-upcomment-box">
                                                            <div className="establishment-upcomment-values">
                                                                <Upvotes />
                                                                <img src={ImageComment} alt="Image comment" />
                                                            </div>
                                                            {textao.length > 100 ?
                                                                <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                                                    <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                                                                </div> : <div className="more-text"></div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="user-content-comment">
                                                    <div className="establishment-bar" />
                                                    {/*<img className="establishment-user-icon" src={props.userImage == null || undefined || "" ? DefaultUserImage : props.userImage} alt="User image" /> */}
                                                    <img className="establishment-user-icon" src={DefaultUserImage} alt="User image" />
                                                    <div className="user-content-values">
                                                        <ReactStars
                                                            size={24}
                                                            activeColor={"var(--primary)"}
                                                            edit={false}
                                                            value={2} />
                                                        <p className="comment-content-text">{analysisText(textao, "text", updateText)}</p>
                                                        <div className="establishment-upcomment-box">
                                                            <div className="establishment-upcomment-values">
                                                                <Upvotes />
                                                                <img src={ImageComment} alt="Image comment" />
                                                            </div>
                                                            {textao.length > 100 ?
                                                                <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                                                    <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                                                                </div> : <div className="more-text"></div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="user-content-comment">
                                                    <div className="establishment-bar" />
                                                    {/*<img className="establishment-user-icon" src={props.userImage == null || undefined || "" ? DefaultUserImage : props.userImage} alt="User image" /> */}
                                                    <img className="establishment-user-icon" src={DefaultUserImage} alt="User image" />
                                                    <div className="user-content-values">
                                                        <ReactStars
                                                            size={24}
                                                            activeColor={"var(--primary)"}
                                                            edit={false}
                                                            value={2} />
                                                        <p className="comment-content-text">{analysisText(textao, "text", updateText)}</p>
                                                        <div className="establishment-upcomment-box">
                                                            <div className="establishment-upcomment-values">
                                                                <Upvotes />
                                                                <img src={ImageComment} alt="Image comment" />
                                                            </div>
                                                            {textao.length > 100 ?
                                                                <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                                                    <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                                                                </div> : <div className="more-text"></div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="user-content-comment">
                                                    <div className="establishment-bar" />
                                                    {/*<img className="establishment-user-icon" src={props.userImage == null || undefined || "" ? DefaultUserImage : props.userImage} alt="User image" /> */}
                                                    <img className="establishment-user-icon" src={DefaultUserImage} alt="User image" />
                                                    <div className="user-content-values">
                                                        <ReactStars
                                                            size={24}
                                                            activeColor={"var(--primary)"}
                                                            edit={false}
                                                            value={2} />
                                                        <p className="comment-content-text">{analysisText(textao, "text", updateText)}</p>
                                                        <div className="establishment-upcomment-box">
                                                            <div className="establishment-upcomment-values">
                                                                <Upvotes />
                                                                <img src={ImageComment} alt="Image comment" />
                                                            </div>
                                                            {textao.length > 100 ?
                                                                <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                                                    <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                                                                </div> : <div className="more-text"></div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>}
                            </div>
                            <div className="establishment-side-box">
                                <div className="establishment-tags-box">
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
                                </div>
                                <div className="establishment-general-box">
                                    <div className="establishment-value-box">
                                        <span className="establishment-info-value">+999</span>
                                        <span>Comentários</span>
                                    </div>
                                    <div className="establishment-value-box">
                                        <span className="establishment-info-value">+999</span>
                                        <span>UpVotes</span>
                                    </div>
                                    <div className="establishment-value-box">
                                        <span className="establishment-info-value">+999</span>
                                        <span>Avaliações</span>
                                    </div>
                                </div>
                                <div className="establishment-btns-box">
                                    <div className="establishment-menu-btn">
                                        <img src={BookMenu} alt="Book" />
                                        <span>Cardápio</span>
                                    </div>
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