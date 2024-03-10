import { React, useEffect, useState } from "react";
import { Neutral, Positive, Negative } from "../../components/SentimentTag/SentimentTag";
import ReactStars from "react-rating-stars-component";
import Upvotes from "../../components/Upvotes/Upvotes";
import "./Comment.css";

const ImageComment = "https://foodway-public-s3.s3.amazonaws.com/website-images/comment-icon.png";

const Comment = (props) => {
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
        var minhaDiv = document.querySelectorAll(".comment-container");
        var textContent = document.querySelectorAll(".comment-content-text");

        minhaDiv.forEach(element => {
            element.style.width = width;
            element.style.height = height;
        });

        textContent.forEach(element => {
            element.style.width = text;
        });
    }

    let sentimentAnalysis = 8.0;

    var id = 1;

    useEffect(() => {
        setSize(props.width, props.height, props.text)
    }, []);

    return (
        <>
            <div className="comment-container">
                <div className="comment-box">
                    <div className="comment-header">
                        <div className="header-initial">
                            {/* <span> {analysisText(props.establishmentName, "title", false)} </span> */}
                            <span> {props.establishmentName} </span>
                            {/* {
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
                            } */}
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
                        {/* <p className="comment-content-text"> {analysisText(props.comment, "text", updateText)} </p> */}
                        <p className="comment-content-text"> {props.comment} </p>
                        {/* {props.comment.length > 100 ?
                            <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                            </div> : <div className="more-text"></div>} */}
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
            <div className="establishment-comments-box">
                <div className="user-content-comment">
                    <img className="establishment-user-icon" src={props.userPhoto} alt="User image" />
                    <div className="user-content-values">
                        <ReactStars
                            size={24}
                            activeColor={"var(--primary)"}
                            edit={false}
                            value={2} />
                        <p className="comment-content-text">{analysisText(props.comment, "text", updateText)}</p>
                        <div className="establishment-upcomment-box">
                            <div className="establishment-upcomment-values">
                                <Upvotes 
                                    upvotes={props.upvotes}
                                    idComment={props.idComment}
                                    idCustomer={atob(sessionStorage.getItem("idUser"))}
                                    idEstablishment={props.idEstablishment}
                                />
                                <img src={ImageComment} alt="Image comment" />
                            </div>
                            {props.comment.length > 100 ?
                                <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                    <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                                </div> : <div className="more-text"></div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const CommentReply = (props) => {

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
            <div className="user-content-comment">
                <div className="establishment-bar" />
                <img className="establishment-user-icon" src={props.userPhoto} alt="User image" />
                <div className="user-content-values">
                    <ReactStars
                        size={24}
                        activeColor={"var(--primary)"}
                        edit={false}
                        value={2} />
                    <p className="comment-content-text">{analysisText(props.comment, "text", updateText)}</p>
                    <div className="establishment-upcomment-box">
                        <div className="establishment-upcomment-values">
                            <Upvotes 
                                upvotes={props.upvotes}
                                idComment={props.idComment}
                                idCustomer={atob(sessionStorage.getItem("idUser"))}
                                idEstablishment={props.idEstablishment}
                            />
                            <img src={ImageComment} alt="Image comment" />
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