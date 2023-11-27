import React from "react";
import CommentIcon from "../../../public/comment-icon.png"
import "./Comments.css";

const Comments = (props) => {
    return(
        <>
            <div className="comments-qtd-container">
                <img src={CommentIcon} alt="" />
                <span>+99</span>
            </div>
        </>
    );
}

export default Comments;