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
                            {props.rank == 1 ? <img className="medal" src={GoldMedal} alt="Medalha de Ouro" /> : (props.rank == 2 ? <img src={SilverMedal} className="medal" alt="Medalha de Prata" /> : <img src={BronzeMedal} className="medal" alt="Medalha de Bronze" />)}
                            <img className="img-establishment-relevance-card" src={props.profilePhoto} alt="Foto de perfil do estabelecimento" />
                            <span className="best-card-name">{props.establishmentName}</span>
                            <RateNumberStar color="black" generalRate={props.generalRate == undefined || null ? 0 : props.generalRate.toFixed(1)} />
                            <span>Avaliações: {props.qtdRates == undefined || null ? 0 : props.qtdRates}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RelevanceCard;