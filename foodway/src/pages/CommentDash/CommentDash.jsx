import React, { useEffect, useState } from "react";
import { Comment } from "../../components/Comment/Comment";
import api_call from "../../services/apiImpl";
import ContentLoader from 'react-content-loader';
import { useParams } from "react-router-dom";
import "./CommentDash.css";

const CommentDash = () => {
    const [comments, setComments] = useState([]);
    const params = useParams();
    const idUser = params.id;

    const CommentLoader = () => (
        <ContentLoader
            speed={2}
            width={1000}
            height={851}
            viewBox="0 0 1000 851"
            backgroundColor="#ffffff"
            foregroundColor="#c4c4c4"
        >
            <rect x="4" y="8" rx="0" ry="0" width="500" height="250" />
            <rect x="518" y="8" rx="0" ry="0" width="500" height="250" />
            <rect x="4" y="277" rx="0" ry="0" width="500" height="250" />
            <rect x="518" y="277" rx="0" ry="0" width="500" height="250" />
            <rect x="4" y="545" rx="0" ry="0" width="500" height="250" />
            <rect x="518" y="545" rx="0" ry="0" width="500" height="250" />
        </ContentLoader>
    )

    async function getComments() {
        const response = await api_call("get", `/establishments/${idUser}/comments`, null, atob(sessionStorage.getItem("token")));
        console.log(response.data);
        setComments(response.data);
    }

    useEffect(() => {
        getComments();
    }, []);

    return (
        <>
            <div className="comment-dashboard-container">
                <div className="comment-dashboard-box">
                    <span className="title">Comentários ({comments.length})</span>
                    <section>
                        <div className="comment-dash-container">
                            <div className={`comment-dash-box ${comments.length === 0 ? "comment-loader" : ""}`}>
                                {comments === undefined || comments.length === 0 ? (
                                    <div>
                                        <CommentLoader />
                                    </div>
                                ) : (
                                    comments === undefined || comments.length === 0 ? (
                                        <span>Nenhum comentário</span>
                                    ) : (
                                        comments.map((comment, index) => (
                                            <Comment
                                                key={index}
                                                title={comment.title}
                                                comment={comment.comment}
                                                commentRate={comment.commentRate}
                                                establishmentName={comment.establishmentName}
                                                upvotes={comment.upvotes}
                                            />
                                        ))))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default CommentDash;
