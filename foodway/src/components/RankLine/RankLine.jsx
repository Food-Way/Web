import React from "react";
import RateNumberStar from "../../components/RateNumberStar/RateNumberStar";

import "./RankLine.css";

const RankLine = () => {
    return (
        <>
            <li className="rank-line">
                <span className="estab-rank-text">4° Fernandes</span>
                <span>Avaliações: 200</span>
                <RateNumberStar color="branco" />
            </li>
        </>

    );
}

export default RankLine;