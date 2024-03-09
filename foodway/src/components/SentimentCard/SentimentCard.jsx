import React from "react";
import PositiveImage from "../../../public/positive.svg";
import NegativeImage from "../../../public/negative.svg";
import NeutralImage from "../../../public/neutral.svg";
import EqualsImage from "../../../public/Equals_black.svg";
import PercentPositiveImage from "../../../public/arrow-positive.svg";
import PercentNeutralImage from "../../../public/arrow-neutral.svg";
import PercentNegativeImage from "../../../public/arrow-negative.svg";
import PercentEqualsImage from "../../../public/Equals_white.svg";
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