import React from "react";

import PositiveFace from "../../public/positive.svg";
import NegativeFace from "../../public/negative.svg";
import NeutralFace from "../../public/neutral.svg";

import "./SentimentTag.css";

const Positive = () => {
    return (
        <>
            <div className="sentiment-tag positive">
                <img src={PositiveFace} alt="" />
                <span className="sentiment-label">
                    Muito bom!!
                </span>
            </div>
        </>
    )
}

const Neutral = () => {
    return (
        <>
            <div className="sentiment-tag neutral">
                <img src={NeutralFace} alt="" />
                <span className="sentiment-label">
                    Interessante
                </span>
            </div>
        </>
    )
}

const Negative = () => {
    return (
        <>
            <div className="sentiment-tag negative">
                <img src={NegativeFace} alt="" />
                <span className="sentiment-label">
                    Muito ruim
                </span>
            </div>
        </>
    )
}

export { Neutral, Negative, Positive };