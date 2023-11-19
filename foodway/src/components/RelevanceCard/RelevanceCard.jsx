import React from "react";
import ReactStars from "react-rating-stars-component";
import RateNumberStar from "../RateNumberStar/RateNumberStar";
import BronzeMedal from "../../../public/bronze-medal.svg";
import SilverMedal from "../../../public/silver-medal.svg";
import GoldMedal from "../../../public/gold-medal.svg";

import "./RelevanceCard.css";


const RelevanceCard = () => {
    const LogoFoodway = "https://foodway.blob.core.windows.net/public/FoodWayLogo.png"

    return (
        <>
            <div className="relevance-card-container">
                <div className="relevance-card-box">
                    <div className="relevance-card-back">
                        <div className="relevance-card-body">
                            <img src={BronzeMedal} alt="medal" className="medal" />
                            <img src={LogoFoodway} alt="logo" />
                            <span className="best-card-name">Leonardo</span>
                            <RateNumberStar color="black" />
                            <span>Avaliações: 200</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RelevanceCard;