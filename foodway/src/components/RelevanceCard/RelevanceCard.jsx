import React from "react";
import RateNumberStar from "../RateNumberStar/RateNumberStar";
import BronzeMedal from "../../../public/bronze-medal.svg";
import DefaultImage from "../../../public/default-user-image.png";

import "./RelevanceCard.css";


const RelevanceCard = (props) => {

    return (
        <>
            <div className="relevance-card-container">
                <div className="relevance-card-box">
                    <div className="relevance-card-back">
                        <div className="relevance-card-body">
                            <img src={BronzeMedal} alt="medal" className="medal" />
                            {/* <img src={props.profilePhoto === "" || props.profilePhoto == undefined ? DefaultImage : props.profilePhoto} className="establishment-user-icon" alt="logo" /> */}
                            <span className="best-card-name">{props.establishmentName}</span>
                            <RateNumberStar color="black" generalRate={props.generalRate} />
                            <span>Avaliações: {props.qtdRates}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RelevanceCard;