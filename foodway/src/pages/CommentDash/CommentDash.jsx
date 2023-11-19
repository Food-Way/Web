import React, {useEffect, useState } from "react";
import Comment from "../../components/Comment/Comment";

import "./CommentDash.css";


const CommentDash = () => {
    return (
        <>
            <div className="comment-dashboard-container">
                <div className="comment-dashboard-box">
                    <span className="title">Comentários</span>
                    <section>
                        <div className="comment-dash-container">
                            <div className="comment-dash-box">
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                            </div>
                        </div>
                    </section>
                </div>
            </div>


        </>
    ); 
}

export default CommentDash;
