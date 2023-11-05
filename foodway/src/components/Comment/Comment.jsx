import React from "react";
import ReactStars from "react-rating-stars-component";
import Upvotes from "../Upvotes/Upvotes";
import { Neutral, Positive, Negative } from "../../components/SentimentTag/SentimentTag";

import "./Comment.css";

const Comment = () => {

    let sentimentAnalysis = 5.0;

    return (
        <>
            <div className="comment-container">
                <div className="comment-box">
                    <div className="comment-header">
                        <div className="header-initial">
                            <span>Restaurante e Cia</span>
                            {
                                document.location.pathname != "/user-profile" ? (
                                    sentimentAnalysis < 5.0 ? (
                                        <Negative />
                                    ) : (
                                        sentimentAnalysis > 7.0 ? (
                                            <Positive />
                                        ) : (
                                            <Neutral />
                                        )
                                    )
                                ) : (
                                    ""
                                )
                            }
                        </div>
                        <ReactStars
                            count={5}
                            edit={false}
                            size={24}
                            value={4.5}
                            isHalf={true}
                            activeColor="#ff0000"
                        />
                    </div>
                    <div className="comment-content">
                        <span>Amei!!!!</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptatem, cum quas error illum, quia odit molestiae nihil unde animi debitis. Saepe libero quasi reiciendis alias autem est nesciunt tenetur!</p>
                    </div>
                    <div className="comment-footer">
                        <Upvotes />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment;