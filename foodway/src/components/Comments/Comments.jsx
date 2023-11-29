import React from "react";
const CommentIcon = "https://foodway.blob.core.windows.net/public/comment-icon.png";
import "./Comments.css";

const Comments = (props) => {
    return(
        <>
            <div className="comments-qtd-container">
                <img src={CommentIcon} alt="" />
                <span>{props.comments ? props.comments : 0}</span>
            </div>
        </>
    );
}

export default Comments;