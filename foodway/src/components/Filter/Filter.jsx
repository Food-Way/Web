        import React from "react";
import Filter from "../../../public/filter.svg";
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
