import React from "react";
const PositiveFace = "https://foodway.s3.amazonaws.com/public-images/positive.svg";
const NegativeFace = "https://foodway.s3.amazonaws.com/public-images/negative.svg";
const NeutralFace = "https://foodway.s3.amazonaws.com/public-images/neutral.svg";
import "./SentimentTag.css";

const Positive = () => {
    return (
        <>
            <div className="sentiment-tag positive">
                <img src={PositiveFace} alt="Ícone de cara feliz" />
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
                <img src={NeutralFace} alt="Ícone de cara neutra" />
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
                <img src={NegativeFace} alt="Ícone de cara negativa" />
                <span className="sentiment-label">
                    Muito ruim
                </span>
            </div>
        </>
    )
}

export { Neutral, Negative, Positive };