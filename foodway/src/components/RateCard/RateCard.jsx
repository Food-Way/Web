import React from "react";
import ReactStars from "react-rating-stars-component";

import "./RateCard.css";

const RateCard = (props) => {
    return (
        <>
            <div className="rate-container">
                <div className="rate-box-user">
                    <div className="rate-left">
                        <div className="experience-info">
                            <span className="profile-level">NÍVEL: {props.level == null ? 0 : props.level}</span>
                            {
                                atob(sessionStorage.getItem("my-profile")) == "true" ? (
                                    <>
                                        <div className="experience">
                                            <span className="profile-level">EXP</span>
                                            <progress value={props.xp} max="100"></progress>
                                        </div>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        <div className="profile-rate">
                            <span>{props.profileRate == null ? "0.0" : props.profileRate.toFixed(2)}</span>
                            <ReactStars
                                count={5}
                                edit={false}
                                size={24}
                                value={(props.profileRate)}
                                isHalf={true}
                                activeColor="#ff0000"
                            />

                        </div>
                    </div>
                    <div className="rate-right">
                        <div className="rate-box-numbers">
                            <span className="amount-number">{props.qtdComments}</span>
                            <span className="comments-number">{props.qtdComments > 1 ? ("Comentários") : ("Comentário")}</span>
                        </div>
                        <div className="rate-box-numbers">
                            <span className="amount-number">{props.upvotes}</span>
                            <span className="upvotes-number">{props.upvotes > 1 ? ("Upvotes") : ("Upvote")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RateCard;
