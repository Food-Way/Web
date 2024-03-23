import { useState, React, useEffect, require } from "react";
import SearchCard from "../../components/SearchCard/SearchCard";
import SearchBar from "../../components/SearchBar/SearchBar";
const ImageFilter = "https://foodway-public-s3.s3.amazonaws.com/website-images/filter.svg";
import SearchDetails from "../../components/SearchDetails/SearchDetails";
import { api_call } from "../../services/apiImpl";
import ContentLoader from 'react-content-loader';
import parseJWT from "../../util/parseJwt";

import './SearchUser.css';

const MyLoader = () => (
    <ContentLoader style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
        speed={2}
        width={1500}
        height={875}
        viewBox="0 0 1500 875"
        backgroundColor="#ffffff"
        foregroundColor="#c4c4c4"
    >
        <rect x="0" y="23" rx="0" ry="0" width="1500" height="230" />
        <rect x="0" y="289" rx="0" ry="0" width="1500" height="230" />
        <rect x="0" y="558" rx="0" ry="0" width="1500" height="230" />
    </ContentLoader>
)

function SearchUser() {
    const [searchEstab, setSearchEstab] = useState([]);
    const [searchCustomer, setSearchCustomer] = useState([]);
    const [search, setSearch] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardType, setSelectedCardType] = useState(null);
    const [viewDetails, setViewDetails] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [url, setUrl] = useState(null);
    const bodyToken = parseJWT();

    async function getSearchEstab({ filter }) {
        const response = await api_call("get", filter ? `/establishments/search?searchFilter=${filter}` : `/establishments/search`, null, atob(sessionStorage.getItem("token")), bodyToken.idUser);
        console.log(response.data)
        setSearchEstab(response.data);
    }

    async function getSearchCustomer() {
        const response = await api_call("get", `/customers/search`, null, atob(sessionStorage.getItem("token")));
        console.log(response.data);
        setSearchCustomer(response.data);
    }

    async function getMaps(lat, lng) {
        setShowMap(true);
        setUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyAKELgmqf4j5kRAdn9EKTC28cMao0sQvJE&q=${lat},${lng}&zoom=18&maptype=roadmap`);
    }

    function selectFilter(id) {
        var selectedFilter = document.getElementById(id);

        if (id == 2) {
            getSearchEstab({ filter: "COMMENTS" });
            // getSearchCustomer({ filter: "COMMENTS" });
        } else if (id == 3) {
            getSearchEstab({ filter: "RELEVANCE" });
            // getSearchCustomer({ filter: "RELEVANCE" });
        } else if (id == 4) {
            getSearchEstab({ filter: "UPVOTES" });
            // getSearchCustomer({ filter: "UPVOTES" });
        }

        for (let index = 1; index <= 4; index++) {
            var indexFilter = document.getElementById(`${index}`);
            if (
                indexFilter.classList.contains("item-filter-active") &&
                `${index}` != id
            ) {
                indexFilter.classList.toggle("item-filter-active");
            }
        }

        selectedFilter.classList.toggle("item-filter-active");
    }

    const handleCardClick = (index, type) => {
        setViewDetails(!viewDetails);
        setSelectedCard(index);
        setSelectedCardType(type);
    };

    useEffect(() => {
        getMaps();
        setSearch([...searchEstab, ...searchCustomer]);
    }, [searchCustomer, searchEstab]);

    useEffect(() => {
        var html = document.querySelector('html');
        html.style.overflowY = 'hidden';
        getSearchEstab({ filter: "RELEVANCE" });
        getSearchCustomer({ filter: "RELEVANCE" });
    }, []);

    return (
        <>
            <div className="search-user-container">
                <div className="search-user">
                    <section>
                        <div className="search-container">
                            <div className="search-box">
                                <div className="search-header">
                                    <span className="search-results">{search.length} resultados</span>
                                    <SearchBar placeholder="Pesquisar" />
                                    <div className="menu-filter-box">
                                        <img src={ImageFilter} className="filter" alt="Ícone de filtro" />
                                        <div className="item-filter-box">
                                            <span className="item-filter-user" id="1" >Filtros</span>
                                            <span className="item-filter-user" id="2" onClick={() => { selectFilter("2") }}>Comentário</span>
                                            <span className="item-filter-user" id="3" onClick={() => { selectFilter("3") }}>Relevância</span>
                                            <span className="item-filter-user" id="4" onClick={() => { selectFilter("4") }}>Upvote</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="search-body">
                                    {search === undefined || search.length === 0 && (
                                        <MyLoader />
                                    )}
                                    {search && search.map((item, index) => (
                                        <div onClick={(e) => {
                                            e.preventDefault();
                                            handleCardClick(index, item.typeUser)
                                            if (item.typeUser == "ESTABLISHMENT") {
                                                getMaps(item.lat, item.lng)
                                            }
                                        }}>
                                            <SearchCard
                                                key={index}
                                                name={item.name}
                                                bio={item.typeUser == "CLIENT" ? item.bio : item.lastComment}
                                                generalRate={item.generalRate}
                                                lastComment={item.lastComment}
                                                photo={item.photo}
                                                upvote={item.upvote}
                                                culinary={item.culinary[0].name}
                                                typeUser={item.typeUser}
                                                idEstablishment={item.idEstablishment}
                                                isFavorites={item.isFavorite}
                                                qtdComments={item.qtdComments}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="user-details-container">
                            <div className="user-details-box">
                                {selectedCard !== null && viewDetails && (
                                    <SearchDetails
                                        idUser={selectedCardType == "CLIENT" ? search[selectedCard].idCustomer : search[selectedCard].idEstablishment}
                                        name={search[selectedCard].name}
                                        photo={search[selectedCard].photo}
                                        tag={search[selectedCard].tag}
                                        rate={search[selectedCard].rate}
                                        comments={search[selectedCard].comments}
                                        bio={selectedCardType == "CLIENT" ? search[selectedCard].bio : search[selectedCard].lastComment}
                                        typeUser={selectedCardType}
                                        upvote={search[selectedCard].upvote}
                                        qtdComments={search[selectedCard].qtdComments}
                                        culinary={search[selectedCard].culinary}
                                    />
                                )}
                            </div>
                            {selectedCardType === "ESTABLISHMENT" && showMap && url && viewDetails && (
                                <div className="maps-box">
                                    <span className="title">Localização</span>
                                    <iframe
                                        style={{
                                            border: 0,
                                            width: "100%",
                                        }}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src={url}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default SearchUser;