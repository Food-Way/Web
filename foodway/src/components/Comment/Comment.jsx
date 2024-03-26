import { React, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

import Upvotes from "../../components/Upvotes/Upvotes";
import parseJWT from "../../util/parseJWT";
import { CommentInsertReply, CommentInsert } from "../../components/CommentInsert/CommentInsert.jsx";
import "./Comment.css";
import { hasValidSession } from "../Auth/Auth.jsx"
import { useNavigate } from "react-router-dom";
const ImageComment = "https://foodway-public-s3.s3.amazonaws.com/website-images/comment-icon.png";

const Comment = (props) => {
    const navigate = useNavigate();
    const bodyToken = parseJWT();
    const [updateText, setUpdateText] = useState(false);

    function analysisText(text, category, upText) {
        var newText = "";
        const tamanho = text.length;
        if (tamanho > props.size && category == "title") {
            newText = text.substring(0, props.size) + "..."
            return newText;
        }

        if (tamanho > 100 && category == "text" && upText == false) {
            newText = text.substring(0, 100) + "..."
            return newText;
        }

        return text;
    }

    function scrollTextShow() {
        var obj = document.querySelector(".comment-content-text");
        obj.classList.toggle("comment-content-show-scroll");
        setUpdateText(!updateText);
    }

    function setSize(width, height, text) {
        var boxContent = document.querySelectorAll(".comment-container");
        var textContent = document.querySelectorAll(".comment-content-text");

        boxContent.forEach(element => {
            element.style.width = width;
            element.style.height = height;
        });

        textContent.forEach(element => {
            element.style.width = text;
        });
    }

    let sentimentAnalysis = 8.0;

    useEffect(() => {
        setSize(props.width, props.height, props.text)
    }, []);

    return (
        <>
            <div className="comment-container">
                <div className="comment-box">
                    <div className="comment-header">
                        <div className="header-initial">
                            <span> {props.establishmentName} </span>
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
                        <p className="comment-content-text"> {props.comment} </p>
                    </div>
                    <div className="comment-footer">
                        <Upvotes
                            upvotes={props.upvotes}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const CommentIndividual = (props) => {
    const navigate = useNavigate();
    const bodyToken = parseJWT();
    const [updateText, setUpdateText] = useState(false);
    const [showCommentInsert, setShowCommentInsert] = useState(true);


    function analysisText(text, category, upText) {
        var newText = "";
        const tamanho = text.length;
        if (tamanho > props.size && category == "title") {
            newText = text.substring(0, props.size) + "..."
            return newText;
        }

        if (tamanho > 100 && category == "text" && upText == false) {
            newText = text.substring(0, 100) + "..."
            return newText;
        }

        return text;
    }

    function scrollTextShow() {
        var obj = document.querySelector(".comment-content-text");
        obj.classList.toggle("comment-content-show-scroll");
        setUpdateText(!updateText);
    }

    let sentimentAnalysis = 8.0;

    var id = 1;

    return (
        <>
            <div className="establishment-comments-box">
                <div className="user-content-comment-parent">
                    <img className="establishment-user-icon" src={props.userPhoto} alt="User image" />
                    <div className="user-content-values">
                        <ReactStars
                            size={24}
                            activeColor={"var(--primary)"}
                            edit={false}
                            value={props.rate} />
                        <p className="comment-content-text">{analysisText(props.comment, "text", updateText)}</p>
                        <div className="establishment-upcomment-box">
                            <div className="establishment-upcomment-values">

                                <Upvotes
                                    upvotes={props.upvotes}
                                    idComment={props.idComment}
                                    idCustomer={atob(sessionStorage.getItem("typeUser")) == 'CLIENT' ? bodyToken.idUser : null}
                                    idEstablishment={props.idEstablishment}
                                    setComments={props.setComments}
                                />
                                <button className="btn_subcomment" onClick={() => {
                                    if (!sessionStorage.getItem("token")) {
                                        hasValidSession(navigate);
                                    } else {
                                        setShowCommentInsert(!showCommentInsert);
                                    }
                                }}><img src={ImageComment} alt="Image comment" /></button>
                            </div>
                            {props.comment.length > 100 ?
                                <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                    <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                                </div> : <div className="more-text"></div>}
                        </div>
                    </div>
                </div>
                {showCommentInsert == false ? (<div className="insert-comment-field" >
                    <CommentInsertReply establishmentId={props.idEstablishment} commentParent={props.idComment} setComments={props.setComments} />
                </div>) : <></>}
                <div className="reply-container" >
                    {props.replies.map((subComment, subIndex) =>
                    (
                        <CommentReply
                            id={subIndex}
                            key={subIndex}
                            establishmentName={subComment.establishmentName}
                            rate={subComment.commentRate}
                            comment={subComment.comment}
                            upvotes={subComment.upvotes}
                            idComment={subComment.idPost}
                            idEstablishment={props.idEstablishment}
                            userPhoto={subComment.userPhoto}
                            setComments={props.setComments} />
                    ))}
                </div>
            </div >

        </>
    )
}

const CommentReply = (props) => {
    const bodyToken = parseJWT();

    const [updateText, setUpdateText] = useState(false);

    function analysisText(text, category, upText) {
        var newText = "";
        const tamanho = text.length;
        if (tamanho > props.size && category == "title") {
            newText = text.substring(0, props.size) + "..."
            return newText;
        }

        if (tamanho > 100 && category == "text" && upText == false) {
            newText = text.substring(0, 100) + "..."
            return newText;
        }

        return text;
    }

    function scrollTextShow() {
        var obj = document.querySelector(".comment-content-text");
        obj.classList.toggle("comment-content-show-scroll");
        setUpdateText(!updateText);
    }

    let sentimentAnalysis = 8.0;

    var id = 1;

    return (
        <>
            <div className="user-content-comment-reply">
                {/*<div className="establishment-bar" />*/}
                <img className="establishment-user-icon" src={props.userPhoto} alt="User image" />
                <div className="user-content-values user-content-values-reply">

                    <p className="comment-content-text">{analysisText(props.comment, "text", updateText)}</p>
                    <div className="establishment-upcomment-box">
                        <div className="establishment-upcomment-values">
                            <Upvotes
                                upvotes={props.upvotes}
                                idComment={props.idComment}
                                idCustomer={atob(sessionStorage.getItem("typeUser")) == 'CLIENT' ? bodyToken.idUser : null}
                                idEstablishment={props.idEstablishment}
                                setComments={props.setComments}
                            />

                        </div>
                        {props.comment.length > 100 ?
                            <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                            </div> : <div className="more-text"></div>}
                    </div>
                </div>
            </div>
        </>
    )
}


export { Comment, CommentIndividual, CommentReply };