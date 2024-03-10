import { React, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Comments from "../Comments/Comments";
import Upvotes from "../Upvotes/Upvotes";
import CulinaryTag from "../CulinaryTag/CulinaryTag";
import { ButtonPrimaryLink } from "../Button/Button";
const starBlack = "https://foodway-public-s3.s3.amazonaws.com/website-images/star-black.svg";

import "./SearchDetails.css";

const SearchDetails = (props) => {
    const [updateText, setUpdateText] = useState(false);
    // const [one, setoOne] = useState(0);

    function analysisText(text, category, upText) {
        var newText = "";
        const tamanho = text.length;
        if (tamanho > 10 && category == "title") {
            newText = text.substring(0, 10) + "..."
            return newText;
        }

        if (tamanho > 150 && category == "text" && upText == false) {
            newText = text.substring(0, 150) + "..."
            return newText;
        }

        return text;
    }

    function scrollTextShow() {
        var obj = document.querySelector(".search-detail-body");
        obj.classList.toggle("content-show-scroll");
        setUpdateText(!updateText);
    }

    // useEffect(() => {
    //     if (one == 0) {
    //         setoOne(one + 1);
    //     }
    // }, []);

    return (
        <>
            <div className="search-details-container">
                <div className="search-details-box">
                    <div className="search-detail-header">
                        <div className="left-header-side">
                            <img src={props.photo} alt="" />
                            <CulinaryTag 
                                culinary={props.culinary}
                            />
                        </div>
                        <div className="middle-header-side">
                            <span className="user-detail-name"> {analysisText(props.name, "title")} </span>
                            <div className="rate-detail-user">
                                <span className="user-rate-number">5.0</span>
                                <ReactStars
                                    count={1}
                                    edit={true}
                                    size={24}
                                    value={1}
                                    isHalf={false}
                                    // emptyIcon={ <img src={starBlack} />}
                                    // filledIcon={ <img src={starBlack} />}
                                    activeColor="222"
                                />
                            </div>
                        </div>
                        <div className="right-header-side">
                            <Upvotes 
                                upvotes={props.upvote}
                            />
                            <Comments 
                                comments={props.qtdComments}
                            />
                        </div>
                    </div>
                    <div className="search-detail-body">
                        <span> {analysisText(props.bio, "text", updateText)} </span>
                    </div>
                    {props.bio.length > 150 ?
                        <div className={`read-more-one more-text`} onClick={() => scrollTextShow(`read-more-one`)}>
                            <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                        </div> : <div className="more-text"></div>}
                    <div className="search-detail-footer">
                        <ButtonPrimaryLink text="Acessar" url={props.typeUser == "ESTABLISHMENT" ? "/establishment/info/" + props.idUser : "/user-profile/" + props.idUser} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchDetails;