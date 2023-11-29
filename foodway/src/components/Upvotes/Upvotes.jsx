import React from "react";
import UpvoteIcon from "../../../public/vector.svg";
import "./Upvotes.css";

const Upvotes = (props) => {
    return (
        <>
            <div className="upvotes">
                <img src={UpvoteIcon} alt="" />
                <span>{props.upvotes ? props.upvotes : 0}</span>
            </div>
        </>
    )
}

export default Upvotes;