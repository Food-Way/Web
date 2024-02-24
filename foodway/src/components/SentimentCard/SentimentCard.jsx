import React from "react";
const PositiveImage = "https://foodway.blob.core.windows.net/public/positive.svg";
const NegativeImage = "https://foodway.blob.core.windows.net/public/negative.svg";
const NeutralImage = "https://foodway.blob.core.windows.net/public/neutral.svg";
const EqualsImage = "https://foodway.blob.core.windows.net/public/Equals_black.svg";
const PercentPositiveImage = "https://foodway.blob.core.windows.net/public/arrow-positive.svg";
const PercentNeutralImage = "https://foodway.blob.core.windows.net/public/arrow-neutral.svg";
const PercentNegativeImage = "https://foodway.blob.core.windows.net/public/arrow-negative.svg";
const PercentEqualsImage = "https://foodway.blob.core.windows.net/public/Equals_white.svg";
import "./SentimentCard.css";

function SentimentCard(props) {
    return (
        <>
            <div className="sentiment-data-establishment">
                <div className="sentiment-item">
                    <div className="sentiment-img-box">
                        <img src={props.sentiment == "positive" ? PositiveImage : props.sentiment == "neutral" ? NeutralImage : props.sentiment == "total" ? EqualsImage : NegativeImage} alt="sentiment" />
                    </div>
                    <div className="title-value-box">
                        <span>Avaliações {props.sentiment == "positive" ? "Positivas" : props.sentiment == "neutral" ? "Neutras" : props.sentiment == "total" ? "Totais" : "Negativas"}</span>
                        <span>{props.count}</span>
                    </div>
                    <div className="percent-value-box">
                        <span className="percent-value">+10%</span>
                        <img src={PercentPositiveImage} alt="percent" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SentimentCard;