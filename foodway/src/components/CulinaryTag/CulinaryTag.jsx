import React from "react";

import "./CulinaryTag.css";

const CulinaryTag = (props) => {
    return(
        <>
            <div className="culinary-tag-container">
                <span>{props.culinary}</span>
            </div>
        </>
    );
}

export default CulinaryTag;