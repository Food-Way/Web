import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Comments from "../Comments/Comments";
import Upvotes from "../Upvotes/Upvotes";
import DefaultImage from "../../../public/default-user-image.png";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            console.log("response: ", response.data);
        }
    }

    return (
        <>
            <div className="card-container">
                <div className="card-box">
                    <div className="card-header">
                        <img src={props.photo === "" || props.photo == undefined ? DefaultImage : props.photo} alt="" className="card-image" />
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
                        <p className="user-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque ratione tempore laborum id rem ipsum in, a expedita, delectus libero enim rerum debitis blanditiis reiciendis est repudiandae aspernatur nihil eum?</p>
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
                                    <Heart isClick={props.isFavorite} onClick={() => {
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