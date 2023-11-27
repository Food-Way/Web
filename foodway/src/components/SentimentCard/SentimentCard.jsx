import React from "react";
import PositiveImage from "../../../public/positive.svg";
import NegativeImage from "../../../public/negative.svg";
import NeutralImage from "../../../public/neutral.svg";
import PercentPositiveImage from "../../../public/arrow-positive.svg";
import PercentNeutralImage from "../../../public/arrow-neutral.svg";
import PercentNegativeImage from "../../../public/arrow-negative.svg";
import PercentEqualImage from "../../../public/equals.svg"; 
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