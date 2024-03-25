import { React, useEffect, useState } from "react";
import DoneIcon from '@material-ui/icons/Done';
import "./AvaliationDashCard.css";

function AvaliationDashCard(props) {

    function createPointsValue() {
        var points = [];
        for (let index = 1; index <= 5; index++) {
            points.push(
                <div className="pretty p-icon p-round p-smooth" key={index}>
                    <input type="checkbox" />
                    <div className="state adjust-point-dash">
                        <div className={`icon ${index <= props.rate ? props.color === "red" ? "check-static-primary" : "check-static" : props.color === "red" ? "check-static-disabled-primary" : "check-static-disabled"}`} />
                    </div>
                </div>
            );
        }
        return points;
    }

    return (
        <>
            <div className="avaliation-general-container">
                <div className="avaliation-general-box">
                    <span>{props.rate.toFixed(2)}</span>
                    <div className="points-value-box">
                        {createPointsValue()}
                    </div>
                    <span>{props.category}</span>
                </div>
            </div>
        </>
    );
}

export default AvaliationDashCard;