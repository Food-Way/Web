import React, { useEffect, useState } from "react";
import RelevanceCard from "../../components/RelevanceCard/RelevanceCard";
import RankLine from "../../components/RankLine/RankLine";
import api_call from "../../services/apiImpl";
import "./Relevance.css";
import ContentLoader from 'react-content-loader'



const Relevance = () => {
    const [relevance, setRelevance] = useState([]);
    const [top3, setTop3] = useState([]);

    async function getRelevance() {
        const culinary = atob(sessionStorage.getItem("culinary"));
        const response = await api_call("get", `/establishments/relevance?culinary=${culinary}`, null, atob(sessionStorage.getItem("token")));
        setRelevance(response.slice(3, 11));
        setTop3(response.slice(0, 3));
    }

    const CardLoader = () => {
        const numRectangles = 3;
        const totalWidth = 900;
        const rectangleWidth = 250;
        const rectangleHeight = 180;
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

    useEffect(() => {
        getRelevance();
    }, []);

    return (
        <>
            <div className="relevance-container">
                <div className="relevance">
                    <section>
                        <div className="best-relevance-box">
                            <span className="relevance-title">Relevância - {atob(sessionStorage.getItem("culinary"))}</span>
                            <div className="best-relevance">
                                {top3.length === 0 ? (
                                    <CardLoader />
                                ) : (
                                    top3.map((item) => (
                                        <RelevanceCard
                                            profilePhoto={item.profilePhoto}
                                            establishmentName={item.establishmentName}
                                            qtdRate={item.qtdRate}
                                            generalRate={item.generalRate}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="relevance-rank-container">
                            <div className="relevance-rank-box">
                                <ul className="establishment-rank">
                                    {relevance.map((item, index) => (
                                        <RankLine
                                            id={index}
                                            name={item.establishmentName}
                                            rate={item.qtdRate}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Relevance;