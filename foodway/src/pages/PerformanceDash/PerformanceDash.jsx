import { React, useEffect, useState } from "react";
import GraphCard from "../../components/GraphCard/GraphCard.jsx";
import Comment from "../../components/Comment/Comment";
import SentimentCard from "../../components/SentimentCard/SentimentCard";
import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
import TagDashCard from "../../components/TagDashCard/TagDashCard";

import "./PerformanceDash.css";

function PerformanceDash(props) {

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
                                {/* <div className="tag-dash-box">
                                    <TagDashCard />
                                </div> */}
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
                                <Comment width="20vw" text="15vw" size="15"/>
                                <Comment width="20vw" text="15vw" size="15" /> 
                                <Comment width="20vw" text="15vw" size="15" /> 
                                <Comment width="20vw" text="15vw" size="15" /> 
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default PerformanceDash;