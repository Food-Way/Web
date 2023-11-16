import React from "react";
import RelevanceCard from "../../components/RelevanceCard/RelevanceCard";
import RankLine from "../../components/RankLine/RankLine";
import "./Relevance.css";

const Relevance = () => {
    return (
        <>
            <div className="relevance-container">
                <div className="relevance">
                    <section>
                        <div className="best-relevance-box">
                            <span className="relevance-title">Relevância - Indiana</span>
                            <div className="best-relevance">
                                <RelevanceCard />
                                <RelevanceCard />
                                <RelevanceCard />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="relevance-rank-container">
                            <div className="relevance-rank-box">
                                <ul className="establishment-rank">
                                    <RankLine />
                                    <RankLine />
                                    <RankLine />
                                    <RankLine />
                                    <RankLine />
                                    <RankLine />
                                    <RankLine />
                                    <RankLine />
                                    <RankLine />
                                    <RankLine />
                                    <RankLine />
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