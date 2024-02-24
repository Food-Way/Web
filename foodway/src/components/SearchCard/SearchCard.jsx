import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Comments from "../Comments/Comments";
import Upvotes from "../Upvotes/Upvotes";
import Heart from "react-animated-heart";
import api from "../../services/api";

import "./SearchCard.css";

const SearchCard = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);

    function favoriteEstablishment(idUser, idEstablishment) {
        console.log("teste: " + idUser, idEstablishment);

        const response = api.patch(`/customers/${idUser}/establishments/${idEstablishment}/favorite`, {
            headers: {
                Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
            },
        });
        if (response.status === 200) {
           
        }
    }

    useEffect(() => {
        setIsFavorite(props.isFavorites);   
    }, []);

    return (
        <>
            <div className="card-container">
                <div className="card-box">
                    <div className="card-header">
                        <img src={props.photo} alt="" className="card-image" />
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
                                ) : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchCard;