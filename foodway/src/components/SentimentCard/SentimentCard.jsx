import React from "react";
const PositiveImage = "https://foodway.blob.core.windows.net/public/positive.svg";
const NegativeImage = "https://foodway.blob.core.windows.net/public/negative.svg";
const NeutralImage = "https://foodway.blob.core.windows.net/public/neutral.svg";
const PercentPositiveImage = "https://foodway.blob.core.windows.net/public/arrow-positive.svg";
const PercentNeutralImage = "https://foodway.blob.core.windows.net/public/arrow-neutral.svg";
const PercentNegativeImage = "https://foodway.blob.core.windows.net/public/arrow-negative.svg";
const PercentEqualImage = "https://foodway.blob.core.windows.net/public/equals.svg";
import "./SentimentCard.css";

function SentimentCard(props) {
    return (
        <>
            <div className="sentiment-data-establishment">
                <div className="sentiment-item">
                    <div className="sentiment-img-box">
                        <img src={PositiveImage} alt="sentiment" />
                    </div>
                    <div className="title-value-box">
                        <span>Avaliações Positivas</span>
                        <span>250</span>
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