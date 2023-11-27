import { React, useEffect, useState } from "react";
// import { nanoid } from 'nanoid'
import DoneIcon from '@material-ui/icons/Done';
import "./AvaliationDashCard.css";

function AvaliationDashCard(props) {

    function createPointsValue() {
        var points = [];
        for (let index = 1; index <= 5; index++) {
            // var nanoidInput = nanoid();
            // points.push(<input type="checkbox" name="point" id={`point-${index}`} checked={index <= props.rate ? true : false} disabled />);
            points.push(
                <div class="pretty p-icon p-round p-smooth">
                    <input type="checkbox" checked={true} />
                    <div class="state adjust-point-dash">
                        <div className={`icon ${index <= props.rate ? props.color == "red" ? "check-static-primary" : "check-static" : props.color == "red" ? "check-static-disabled-primary" : "check-static-disabled"}`} />
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
                    <span>0.0</span>
                    <div className="points-value-box">
                        {createPointsValue()}
                    </div>
                    <span>Comida</span>
                </div>
            </div>
        </>
    );
}

export default AvaliationDashCard;