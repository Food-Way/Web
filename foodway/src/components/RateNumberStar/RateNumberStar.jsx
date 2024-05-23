import React from "react";

import ReactStars from "react-rating-stars-component";
const starWhite = "https://foodway.s3.amazonaws.com/public-images/star-white.svg";
const starBlack = "https://foodway.s3.amazonaws.com/public-images/star-black.svg";


import "./RateNumberStar.css";

const RateNumberStar = (props) => {
    return (
        <>
            <div className="card-rate">
                <span>{props.generalRate}</span>
                <ReactStars
                    count={1}
                    edit={false}
                    size={24}
                    value={1}
                    isHalf={false}
                    emptyIcon={props.color == "white" ? <img src={starWhite} alt="Ícone de estrela branca" /> : <img src={starBlack} alt="Ícone de estrela negra" />}
                    filledIcon={props.color == "white" ? <img src={starWhite} alt="Ícone de estrela branca" /> : <img src={starBlack} alt="Ícone de estrela negra" />}
                />
            </div>
        </>

    );
}

export default RateNumberStar;