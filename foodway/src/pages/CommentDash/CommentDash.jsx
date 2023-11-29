import React, { useEffect, useState } from "react";
import { Comment } from "../../components/Comment/Comment";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import "./CommentDash.css";


const CommentDash = () => {
    const routeParams = useParams();
    const id = routeParams.id;
    const [comments, setComments] = useState([]);

    function getComments() {
        const response = api.get(`/establishments/${id}/comments`, {
            headers: {
                Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    setComments(response.data);
                }
            })
            .catch((erro) => console.log(erro));
    }


    useEffect(() => {
        getComments();
    }, []);

    return (
        <>
            <div className="comment-dashboard-container">
                <div className="comment-dashboard-box">
                    <span className="title">Comentários</span>
                    <section>
                        <div className="comment-dash-container">
                            <div className="comment-dash-box">
                                {comments.map((comment, index) => (
                                    <Comment
                                        key={index}
                                        title={comment.title}
                                        comment={comment.comment}
                                        commentRate={comment.commentRate}
                                        establishmentName={comment.establishmentName}
                                        upvotes={comment.upvotes}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>


        </>
    );
}

export default CommentDash;
