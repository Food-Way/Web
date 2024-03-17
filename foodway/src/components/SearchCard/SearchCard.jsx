import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Comments from "../Comments/Comments";
import Upvotes from "../Upvotes/Upvotes";
import Heart from "react-animated-heart";
import api_call from "../../services/apiImpl";

import "./SearchCard.css";

const SearchCard = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);

    async function favoriteEstablishment(idUser, idEstablishment) {
        console.log("teste: " + idUser, idEstablishment);
        const response = api_call("patch", `/customers/${idUser}/establishments/${idEstablishment}/favorite`, null, atob(sessionStorage.getItem("token")));
    }

    useEffect(() => {
        setIsFavorite(props.isFavorites);   
    }, []);

    return (
        <>
            <div className="card-container">
                <div className="card-box">
                    <div className="card-header">
                        <img src={props.photo} alt="" className="Foto de Perfil" />
                    </div>
                    <div className="card-body">
                        <span className="user-title">{props.name}</span>
                        <span className="user-subtitle">{props.culinary}</span>
                        <ReactStars
                            count={5}
                            edit={false}
                            size={20}
                            value={props.generalRate}
                            isHalf={true}
                            activeColor={"#ffd700"}
                        />
                        <p className="user-description">{props.bio}</p>
                    </div>
                    <div className="card-footer">
                        <div className="rate-box">
                            <Comments
                                comments={props.qtdComments}
                            />
                            <Upvotes
                                upvotes={props.upvote}
                            />
                        </div>
                        <div className="card-footer-box">
                            <div className="favorite">
                                {props.typeUser === "ESTABLISHMENT" ? (
                                    <Heart isClick={isFavorite} onClick={() => {
                                        favoriteEstablishment(atob(sessionStorage.getItem("idUser")), props.idEstablishment)
                                        setIsFavorite(!isFavorite)
                                    }} />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchCard;