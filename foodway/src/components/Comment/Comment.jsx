import React from "react";
import ReactStars from "react-rating-stars-component";
import Upvotes from "../Upvotes/Upvotes";
import "./Comment.css";

const Comment = () => {
    return (
        <>
            <div className="comment-container">
                <div className="comment-box">
                    <div className="comment-header">
                        <span>Restaurante e Cia</span>
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