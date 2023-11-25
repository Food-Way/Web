import React from "react";
import ReactStars from "react-rating-stars-component";
import Upvotes from "../../components/Upvotes/Upvotes";
import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
import "./EstablishmentPage.css";

const EstablishmentPage = (props) => {
    return (
        <>
            <div className="establishment-content-container">
                <section>
                    <div className="establishment-banner-box">
                        <h1>Japopo's</h1>
                        <span>Comida japonesa</span>
                    </div>
                    <div className="establishment-avaliation-principal">
                        <div className="establishment-avaliation-value">
                            <span>Avaliação</span>
                            <span>3.65</span>
                        </div>
                        <div className="avaliation-general-points">
                            <AvaliationDashCard rate="5" />
                            <AvaliationDashCard rate="3" />
                            <AvaliationDashCard rate="1" />
                        </div>
                    </div>
                </section>
                <div className="establishment-addcomment-box">
                    <input type="text" />
                    <div className="establishment-avaliation-box">

                    </div>
                </div>
                <div className="establishment-comments-box">
                    <img src={props.userImage} alt="User image" />
                    <div className="user-content-comment">
                        <ReactStars />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam maiores praesentium rerum facere hic aperiam. Ipsa molestias minima harum iusto vel consequatur officiis delectus, perferendis sed, illum aperiam fugiat.</p>
                        <Upvotes />
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="establishment-side-box">
                    <div className="establishment-tags-box">
                        <div className="establishment-tag-content">
                            <span></span>
                        </div>
                    </div>
                    <div className="establishment-general-box">
                        <div className="establishment-value-box">
                            <span></span>
                        </div>
                        <div className="establishment-value-box">
                            <span></span>
                        </div>
                        <div className="establishment-value-box">
                            <span></span>
                        </div>
                    </div>
                    <div className="establishment-btns-box">
                        <div className="establishment-menu-btn">
                            <img src="" alt="" />
                            <span>Cardápio</span>
                        </div>
                        <div className="establishment-contact-btn">
                            <img src="" alt="" />
                            <span>Contato</span>
                        </div>
                    </div>
                    <div className="establishment-location-box">
                        <span>Localização</span>
                        <div className="establishment-map-box">
                        </div>
                    </div>
                    <div className="establishment-report-box">
                        <img src="" alt="" />
                        <span>Reportar  </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EstablishmentPage;