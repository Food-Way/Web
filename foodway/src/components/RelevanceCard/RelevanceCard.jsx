import React from "react";
import RateNumberStar from "../RateNumberStar/RateNumberStar";
const GoldMedal = "https://foodway-public-s3.s3.amazonaws.com/website-images/gold-medal.svg";
const SilverMedal = "https://foodway-public-s3.s3.amazonaws.com/website-images/silver-medal.svg";
const BronzeMedal = "https://foodway-public-s3.s3.amazonaws.com/website-images/bronze-medal.svg";

import "./RelevanceCard.css";

const RelevanceCard = (props) => {

    return (
        <>
            <div className="relevance-card-container">
                <div className="relevance-card-box">
                    <div className="relevance-card-back">
                        <div className="relevance-card-body">
                            {props.rank == 1 ? <img src={GoldMedal} alt="medal" /> : (props.rank == 2 ? <img src={SilverMedal} alt="medal" /> : <img src={BronzeMedal} alt="medal" />)}
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