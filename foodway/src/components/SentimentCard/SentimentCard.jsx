import React from "react";
const PositiveImage = "https://foodway.s3.amazonaws.com/public-images/positive.svg";
const NegativeImage = "https://foodway.s3.amazonaws.com/public-images/negative.svg";
const NeutralImage = "https://foodway.s3.amazonaws.com/public-images/neutral.svg";
const EqualsImage = "https://foodway.s3.amazonaws.com/public-images/equals-black.svg";
const PercentPositiveImage = "https://foodway.s3.amazonaws.com/public-images/arrow-positive.svg";
const PercentNeutralImage = "https://foodway.s3.amazonaws.com/public-images/arrow-neutral.svg";
const PercentNegativeImage = "https://foodway.s3.amazonaws.com/public-images/arrow-negative.svg";
const PercentEqualsImage = "https://foodway.s3.amazonaws.com/public-images/equals-white.svg";
import "./SentimentCard.css";

function SentimentCard(props) {
    return (
        <>
            <div className="sentiment-data-establishment">
                <div className="sentiment-item">
                    <div className="sentiment-img-box">
                        <img src={props.sentiment == "POSITIVE" ? PositiveImage : props.sentiment == "NEUTRAL" ? NeutralImage : props.sentiment == "TOTAL" ? EqualsImage : NegativeImage} alt="Ícone de sentimento" />
                    </div>
                    <div className="title-value-box">
                        <span>Avaliações {props.sentiment == "POSITIVE" ? "Positivas" : props.sentiment == "NEUTRAL" ? "Neutras" : props.sentiment == "TOTAL" ? "Totais" : "Negativas"}</span>
                        <span>{props.count}</span>
                    </div>
                    {/* <div className="percent-value-box">
                        <span className="percent-value">+10%</span>
                        <img src={PercentPositiveImage} alt="Ícone de porcentagem" />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default SentimentCard;