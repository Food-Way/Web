import React from "react";
import RateNumberStar from "../RateNumberStar/RateNumberStar";
const BronzeMedal = "https://foodway.blob.core.windows.net/public/bronze-medal.svg";

import "./RelevanceCard.css";


const RelevanceCard = (props) => {

    return (
        <>
            <div className="relevance-card-container">
                <div className="relevance-card-box">
                    <div className="relevance-card-back">
                        <div className="relevance-card-body">
                            <img src={BronzeMedal} alt="medal" className="medal" />
                            <span className="best-card-name">{props.establishmentName}</span>
                            <RateNumberStar color="black" generalRate={props.generalRate == undefined || null ? 0 : props.generalRate} />
                            <span>Avaliações: {props.qtdRates == undefined || null ? 0 : props.qtdRates}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RelevanceCard;