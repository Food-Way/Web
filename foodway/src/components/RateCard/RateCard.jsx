import React from "react";
import ReactStars from "react-rating-stars-component";

import "./RateCard.css";

const RateCard = () => {
    return(
        <>
            <div className="rate-container">
                <div className="rate-box">
                    <div className="rate-left">
                        <span className="profile-level">NÍVEL: <span id="profile-level">99</span></span>
                        <div className="profile-rate">
                            <span>3.65</span>
                            <ReactStars
                                count={5}
                                edit={false}
                                size={24}
                                value={4.5}
                                isHalf={true}
                                activeColor="#ff0000"
                            />
                        </div>
                    </div>
                    <div className="rate-right">
                        <span><span className="comments-number">+999</span> Comentários</span>
                        <span><span className="upvotes-number">+999</span> UpVotes</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RateCard;
