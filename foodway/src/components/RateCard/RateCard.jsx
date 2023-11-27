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
                            <span className="profile-level">NÍVEL: {props.level}</span>
                            {
                                sessionStorage.getItem("my-profile") == atob(true) ? (
                                    <>
                                        <div className="experience">
                                            <span>EXP</span>
                                            <progress value={props.xp} max="100"></progress>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )
                            }
                        </div>
                        <div className="profile-rate">
                            <span>{props.profileRate}</span>

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
                            <span className="amount-number">+999</span>
                            <span className="upvotes-number">UpVotes</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RateCard;
