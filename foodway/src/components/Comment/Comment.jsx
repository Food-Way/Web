import { React, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Upvotes from "../Upvotes/Upvotes";
import { Neutral, Positive, Negative } from "../../components/SentimentTag/SentimentTag";
import "./Comment.css";

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

    var textao = "Lorem ipsum, dolor sit amet consectime vel, nulla ipsa corporis eveniet magnam at fuga quam quasi enim, quia ut. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati magni, odit repellendus ipsa ducimus laboriosam atque! Maxime vel, nulla ipsa corporis eveniet magnam at fuga quam quasi enim, quia ut.";

    var title = "AAAAAAAAAAAAAAAAAAAAA";

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
                            <span> {analysisText(title, "title", false)} </span>
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
                        <span>Tesete</span>
                        <p className="comment-content-text"> {analysisText(textao, "text", updateText)} </p>
                        {textao.length > 100 ?
                            <div className={`read-more-${id} more-text`} onClick={() => scrollTextShow(`read-more-${id}`)}>
                                <span> {updateText ? "Ver menos" : "Ver mais"} </span>
                            </div> : <div className="more-text"></div>}
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