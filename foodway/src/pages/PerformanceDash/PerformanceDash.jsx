import { React, useEffect, useState } from "react";
import GraphCard from "../../components/GraphCard/GraphCard.jsx";
import { Comment } from "../../components/Comment/Comment";
import SentimentCard from "../../components/SentimentCard/SentimentCard";
import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
import TagDashCard from "../../components/TagDashCard/TagDashCard";
import { useParams } from "react-router-dom";
import api_call from "../../services/apiImpl";
import ContentLoader from 'react-content-loader'

import "./PerformanceDash.css";

function PerformanceDash(props) {
    const params = useParams();
    const id = params.id;
    const [dashData, setDashData] = useState([]);
    const test = 0;

    const CommentLoader = () => (
        <ContentLoader
            speed={2}
            width={388}
            height={222}
            viewBox="0 0 388 222"
            backgroundColor="#ffffff"
            foregroundColor="#c4c4c4"
        >
            <rect x="1196" y="348" rx="0" ry="0" width="293" height="217" />
            {/* <rect x="4" y="239" rx="0" ry="0" width="500" height="250" />
            <rect x="537" y="238" rx="0" ry="0" width="500" height="250" />
            <rect x="532" y="-42" rx="0" ry="0" width="500" height="250" /> */}
        </ContentLoader>
    )

    // async function getDashData() {
    //     const response = await api_call("get", "url", null, atob(sessionStorage.getItem("token")));
    //     console.log(response);
    //     setDashData(response);
    // }

    // useEffect(() => {
    //     getDashData();
    // }, []);

    return (
        <>
            <div className="performance-dash-container">
                <section>
                    <div className="sentiment-banner">
                        <div className="sentiment-dash-box">
                            <SentimentCard />
                            <SentimentCard />
                            <SentimentCard />
                            <SentimentCard />
                        </div>
                    </div>
                </section>
                <div className="content-dash-avaliation">
                    <section>
                        <div className="avaliation-dash-container">
                            <div className="avaliation-dash-box">
                                <div className="avaliation-dash-values">
                                    <div className="rate-dash-value">
                                        <span>Avaliação</span>
                                        <span>3.65</span>
                                    </div>
                                    <div className="avaliation-dash-card">
                                        <AvaliationDashCard rate={3} />
                                        <AvaliationDashCard rate={4} />
                                        <AvaliationDashCard rate={1} />
                                    </div>
                                </div>
                                <div className="tag-dash-box">
                                    <TagDashCard />
                                </div>
                            </div>
                            <div className="graph-dash-box">
                                <span>Avaliação Recebidas</span>
                                <GraphCard />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="comment-relevant-container">
                            <span className="title-comment-relevant">Comentários mais relevantes</span>
                            <div className="comment-relevant-box">
                                <CommentLoader />
                                {/* {dashData.comments.length === 0 ? (
                                    <CommentLoader />
                                ) : (
                                    dashData.comments.length === 0 ? (
                                        <span>Nenhum Comentário</span>
                                    ) : (
                                        dashData.comments.map((item, index) => (
                                            <Comment
                                                key={index}
                                                establishmentName={item.establishmentName}
                                                rate={item.commentRate}
                                                width="20vw"
                                                size="15"
                                                text="15vw"
                                            />
                                        ))
                                    ))} */}
                                {/* <Comment width="20vw" text="15vw" size="15" />
                                <Comment width="20vw" text="15vw" size="15" />
                                <Comment width="20vw" text="15vw" size="15" />
                                <Comment width="20vw" text="15vw" size="15" /> */}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default PerformanceDash;