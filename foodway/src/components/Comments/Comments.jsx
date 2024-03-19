import React from "react";
const CommentIcon = "https://foodway-public-s3.s3.amazonaws.com/website-images/comment-icon.png";
import "./Comments.css";

const Comments = (props) => {
    return(
        <>
            <div className="comments-qtd-container">
                <img src={CommentIcon} alt="Ícone de Comentário" />
                <span>{props.comments ? props.comments : 0}</span>
            </div>
        </>
    );
}

export default Comments;