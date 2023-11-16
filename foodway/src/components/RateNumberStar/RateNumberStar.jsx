import React from "react";

import ReactStars from "react-rating-stars-component";


import "./RateNumberStar.css";

const RateNumberStar = () => {
    return (
        <>
            <div className="card-rate">
                <span>5.0</span>
                <ReactStars
                    count={1}
                    edit={true}
                    size={24}
                    value={1}
                    isHalf={false}
                    activeColor="#ff0000"
                />
            </div>
        </>

    );
}

export default RateNumberStar;