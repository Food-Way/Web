import React from "react";
const Filter = "https://foodway.blob.core.windows.net/public/filter.svg";
import "./Filter.css";

const filter = () => {
    return (
        <>
            <div className="filter-box">
                <img src={Filter} className="filter" alt="" />
                <span>a</span>
                <span>a</span>
                <span>a</span>
                <span>a</span>
            </div>
        </>
    );
}

export default filter;
