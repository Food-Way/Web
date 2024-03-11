import React from "react";
const PositiveImage = "https://foodway-public-s3.s3.amazonaws.com/website-images/positive.svg";
const NegativeImage = "https://foodway-public-s3.s3.amazonaws.com/website-images/negative.svg";
const NeutralImage = "https://foodway-public-s3.s3.amazonaws.com/website-images/neutral.svg";
const EqualsImage = "https://foodway-public-s3.s3.amazonaws.com/website-images/Equals_black.svg";
const PercentPositiveImage = "https://foodway-public-s3.s3.amazonaws.com/website-images/arrow-positive.svg";
const PercentNeutralImage = "https://foodway-public-s3.s3.amazonaws.com/website-images/arrow-neutral.svg";
const PercentNegativeImage = "https://foodway-public-s3.s3.amazonaws.com/website-images/arrow-negative.svg";
const PercentEqualsImage = "https://foodway-public-s3.s3.amazonaws.com/website-images/Equals_white.svg";
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