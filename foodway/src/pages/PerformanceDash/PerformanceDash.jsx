import { React, useEffect, useState } from "react";
import GraphCard from "../../components/GraphCard/GraphCard.jsx";
import { Comment } from "../../components/Comment/Comment";
import SentimentCard from "../../components/SentimentCard/SentimentCard";
import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
import TagDashCard from "../../components/TagDashCard/TagDashCard";
import api_call from "../../services/apiImpl";
import ContentLoader from 'react-content-loader';
import parseJWT from "../../util/parseJWT";
import { useParams } from "react-router-dom";


import "./PerformanceDash.css";

function PerformanceDash() {
    const params = useParams();
    const idUser = params.id;

    const bodyToken = parseJWT();
    const [dashData, setDashData] = useState([]);

    const CardLoader = () => {
        const numRectangles = 4;
        const totalWidth = 1170;
        const rectangleWidth = 230;
        const rectangleHeight = 200;
        const spacing = (totalWidth - (numRectangles * rectangleWidth)) / (numRectangles - 1);

        return (
            <ContentLoader
                style={{
                    width: "105%",
                    height: "30vh",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                speed={2}
                width={totalWidth}
                height={250}
                viewBox={`0 0 ${totalWidth} 250`}
                backgroundColor="#ffffff"
                foregroundColor="#c4c4c4"
            >
                {[...Array(numRectangles).keys()].map((index) => (
                    <rect
                        key={index}
                        x={index * (rectangleWidth + spacing)}
                        y="13"
                        rx="10"
                        ry="10"
                        width={rectangleWidth}
                        height={rectangleHeight}
                    />
                ))}
            </ContentLoader>
        );
    }

    const RateLoader = () => (
        <ContentLoader
            speed={2}
            width={350}
            height={150}
            viewBox="0 0 350 150"
            backgroundColor="#ffffff"
            foregroundColor="#c4c4c4"
        >
            <rect x="-50" y="0" rx="0" ry="0" width="350" height="150" />
        </ContentLoader>
    )

    const GraphLoader = () => (
        <ContentLoader
            speed={2}
            width={680}
            height={350}
            viewBox="0 0 730 350"
            backgroundColor="#ffffff"
            foregroundColor="#c4c4c4"
        >
            <rect x="0" y="0" rx="0" ry="0" width="730" height="350" />
        </ContentLoader>
    )

    const CommentLoader = () => (
        <ContentLoader
            speed={2}
            width={426}
            height={520}
            viewBox="0 0 426 520"
            backgroundColor="#ffffff"
            foregroundColor="#c4c4c4"
        >
            <rect x="0" y="0" rx="0" ry="0" width="426" height="520" />
        </ContentLoader>
    )

    async function getDashData() {
        const response = await api_call("get", `/dashboard/${idUser}`, null, atob(sessionStorage.getItem("token")));
        console.log("Response");
        console.log(response.data);
        setDashData(response.data);
    }

    const reviews = [
        {
            count: 85,
            sentiment: "positive"
        },
        {
            count: 25,
            sentiment: "neutral"
        },
        {
            count: 10,
            sentiment: "negative"
        },
        {
            count: 120,
            sentiment: "total"
        }
    ];


    useEffect(() => {
        getDashData();
    }, []);

    return (
        <>
            <div className="performance-dash-container">
                <section>
                    <div className="sentiment-banner">
                        <div className="sentiment-dash-box">
                            {reviews === undefined || reviews.length === 0 ? (
                                <CardLoader />
                            ) : (
                                reviews.map((item, index) => (
                                    <SentimentCard sentiment={item.sentiment} count={item.count} key={index} />
                                ))
                            )}
                        </div>
                    </div>
                </section>
                <div className="content-dash-avaliation">
                    <section>
                        <div className="avaliation-dash-container">
                            <div className="avaliation-dash-box">
                                {dashData === undefined || dashData.length === 0 ? (
                                    <RateLoader />
                                ) : (
                                    <div className="avaliation-dash-values">
                                        <div className="rate-dash-value">
                                            <span>Avaliação</span>
                                            <span>{dashData.generalRate.toFixed(2)}</span>
                                        </div>
                                        <div className="avaliation-dash-card">
                                            {dashData.establishmentRate == undefined || dashData.establishmentRate.length === 0 ? (
                                                <span className="no-content">Nenhuma avaliação recebida</span>
                                            ) : (
                                                dashData.establishmentRate.map((item, index) => (
                                                    <AvaliationDashCard rate={item.score} color={"red"} category={item.category} key={index} />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="tag-dash-box">
                                    {dashData === undefined || dashData.length === 0 ? (
                                        <RateLoader />
                                    ) : (
                                        <TagDashCard tags={dashData.tags} />
                                    )}
                                </div>
                            </div>
                            {dashData === undefined || dashData.length === 0 ? (
                                <GraphLoader />
                            ) : (
                                dashData.qtdEvaluationDaysForWeek === undefined || dashData.qtdEvaluationDaysForWeek.length === 0 ? (
                                    <span className="no-content">Nenhuma avaliação na última semana</span>
                                ) : (
                                    <div className="graph-dash-box">
                                        <span>Avaliação Recebidas</span>
                                        <GraphCard dashData={dashData.qtdEvaluationDaysForWeek} />
                                    </div>
                                )
                            )}
                        </div>
                    </section>
                    <section>
                        <div className="comment-relevant-container">
                            <span className="title-comment-relevant">Comentários mais relevantes</span>
                            <div className="comment-relevant-box">
                                {dashData === undefined || dashData.length === 0 ? (
                                    <CommentLoader />
                                ) : (
                                    dashData.comments === undefined || dashData.comments.length === 0 ? (
                                        <span>Nenhum Comentário</span>
                                    ) : (
                                        dashData.comments.map((item, index) => (
                                            <Comment
                                                key={index}
                                                establishmentName={item.establishmentName}
                                                rate={item.commentRate}
                                                comment={item.comment}
                                                upvotes={item.upvotes}
                                                width="20vw"
                                                size="15"
                                                text="15vw"
                                            />
                                        ))
                                    ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default PerformanceDash;