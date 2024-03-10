import React from "react";

import ReactStars from "react-rating-stars-component";
const starWhite = "https://foodway-public-s3.s3.amazonaws.com/website-images/star-white.svg";
const starBlack = "https://foodway-public-s3.s3.amazonaws.com/website-images/star-black.svg";


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
                    emptyIcon={ props.color == "branco" ? <img src={starWhite} /> : <img src={starBlack} />}
                    filledIcon={ props.color == "branco" ? <img src={starWhite} /> : <img src={starBlack} />}
                />
            </div>
        </>

    );
}

export default RateNumberStar;