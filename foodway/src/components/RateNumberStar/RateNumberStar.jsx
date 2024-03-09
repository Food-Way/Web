import React from "react";

import ReactStars from "react-rating-stars-component";
import starWhite from "../../../public/star-white.svg";
import starBlack from "../../../public/star-black.svg";
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
                    emptyIcon={ props.color == "white" ? <img src={starWhite} /> : <img src={starBlack} />}
                    filledIcon={ props.color == "white" ? <img src={starWhite} /> : <img src={starBlack} />}
                />
            </div>
        </>

    );
}

export default RateNumberStar;