import React from "react";
import RateNumberStar from "../../components/RateNumberStar/RateNumberStar";

import "./RankLine.css";

const RankLine = (props) => {
    return (
        <>
            <li className="rank-line">
                <span className="estab-rank-text">{props.rank}° {props.name}</span>
                <span className="estab-rate-text">Avaliações: {props.rate}</span>
                <div className="estab-rate-box">
                    <RateNumberStar color="white" />
                    <span className="estab-rank-rate">{props.generalRate == undefined || null ? "0.0" : props.generalRate.toFixed(1)}</span>
                </div>
            </li>
        </>
    );  
}

export default RankLine;