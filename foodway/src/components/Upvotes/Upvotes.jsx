import React from "react";
import UpvoteIcon from "../../../public/vector.svg";
import "./Upvotes.css";

const Upvotes = () => {
    return (
        <>
            <div className="upvotes">
                <img src={UpvoteIcon} alt="" />
                <span>+99</span>
            </div>
        </>
    )
}

export default Upvotes;