import React from "react";
import RateNumberStar from "../../components/RateNumberStar/RateNumberStar";

import "./RankLine.css";

const RankLine = (props) => {
    return (
        <>
            <li className="rank-line">
                <span className="estab-rank-text">{props.id}° {props.name}</span>
                <span>Avaliações: {props.rate}</span>
                <RateNumberStar color="branco" />
            </li>
        </>

    );
}

export default RankLine;