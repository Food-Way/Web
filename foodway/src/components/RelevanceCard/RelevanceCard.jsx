import React from "react";
import ReactStars from "react-rating-stars-component";
import RateNumberStar from "../RateNumberStar/RateNumberStar";
import "./RelevanceCard.css";


const RelevanceCard = () => {
    const LogoFoodway = "https://foodway.blob.core.windows.net/public/FoodWayLogo.png"

    return (
        <>
            <div className="relevance-card-container">
                <div className="relevance-card-box">
                    {/* <img src={BronzeMedal} alt="" /> */}
                    <div className="relevance-card-body">
                        <img src={LogoFoodway} alt="" />
                        <span className="best-card-name">Leonardo</span>
                        <RateNumberStar />
                        <span>Avaliações: 200</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RelevanceCard;