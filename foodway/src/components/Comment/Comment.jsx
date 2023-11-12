import React from "react";
import ReactStars from "react-rating-stars-component";
import Upvotes from "../Upvotes/Upvotes";
import { Neutral, Positive, Negative } from "../../components/SentimentTag/SentimentTag";

import "./Comment.css";

const Comment = (props) => {
    console.log(props);

    let sentimentAnalysis = 8.0;

    return (
        <>
            <div className="comment-container">
                <div className="comment-box">
                    <div className="comment-header">
                        <div className="header-initial">
                            <span>{props.establishmentName}</span>
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
                            value={props.rate}
                            isHalf={true}
                            activeColor="#ff0000"
                        />
                    </div>
                    <div className="comment-content">
                        <span>{props.title}</span>
                        <p>{props.comment}</p>
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