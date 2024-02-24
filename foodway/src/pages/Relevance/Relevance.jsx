import React, { useEffect, useState } from "react";
import RelevanceCard from "../../components/RelevanceCard/RelevanceCard";
import RankLine from "../../components/RankLine/RankLine";
import api from "../../services/api";
import "./Relevance.css";


const Relevance = () => {
    const [relevance, setRelevance] = useState([]);
    const [top3, setTop3] = useState([]);

    function getRelevance() {
        const culinary = atob(sessionStorage.getItem("culinary"));

        const response = api.get(`/establishments/relevance?culinary=${culinary}`, {
            headers: {
                Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    setRelevance(response.data.slice(3, 11));
                    setTop3(response.data.slice(0, 3));
                }
            })
            .catch((erro) => console.log(erro));
    };

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
                                {top3.map((item) => (
                                    <RelevanceCard 
                                        profilePhoto={item.profilePhoto}
                                        establishmentName={item.establishmentName}
                                        qtdRate={item.qtdRate}
                                        generalRate={item.generalRate}
                                    />
                                ))}
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