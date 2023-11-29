import { useState, React, useEffect, require } from "react";
import SearchCard from "../../components/SearchCard/SearchCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import ImageFilter from "../../../public/filter.svg";
import SearchDetails from "../../components/SearchDetails/SearchDetails";
import { api, api_maps } from "../../services/api";
import ContentLoader from 'react-content-loader'

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

    var typeUser = "ESTABLISHMENT";
    const apiKey = "AIzaSyBdmmGVqp3SOAYkQ8ef1SN9PDBkm8JjD_s";

    async function getSearchEstab() {
        try {
            const establishmentResponse = await api.get(`/establishments/search`, {
                headers: {
                    Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
                    ID_SESSION: atob(sessionStorage.getItem("idUser")),
                },
            });
            if (establishmentResponse.status === 200) {
                console.log("Response da API de Busca (Estab):", establishmentResponse.data);
                setSearchEstab(establishmentResponse.data);
            }
        } catch (error) {
            console.error('Erro ao buscar estabelecimentos:', error);
        }
    }

    async function getSearchCustomer(filter) {
        try {
            const customerResponse = await api.get(filter ? `/customers/search?searchFilter=${filter}` : `/customers/search`, {
                headers: {
                    Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
                },
            });
            if (customerResponse.status === 200) {
                console.log("Response da API de Busca (Customer):", customerResponse.data);
                setSearchCustomer(customerResponse.data);
            }
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    }

    async function getMaps(lat, lng) {
        if (search.length > 0) {
            try {
                const response = await api_maps.get(`staticmap?center=${lat},${lng}&zoom=19&size=330x186&key=${apiKey}`, {
                    responseType: 'arraybuffer',
                });
                // console.log("Response da API de Mapas:", response);

                if (response.status === 200 && response.data) {
                    const blob = new Blob([response.data], { type: 'image/png' });
                    const dataUrl = URL.createObjectURL(blob);
                    setShowMap(true);
                    // console.log("URL do Mapa:", dataUrl);
                    setUrl(dataUrl);
                } else {
                    console.error('Resposta inválida da API de Mapas:', response);
                }
            } catch (error) {
                console.error('Erro ao buscar o mapa:', error);
            }
        }
    }

    function selectFilter(id) {
        var selectedFilter = document.getElementById(id);

        for (let index = 1; index <= 4; index++) {
            var indexFilter = document.getElementById(`${index}`);
            if (indexFilter.classList.contains("item-filter-active") && `${index}` != id) {
                indexFilter.classList.toggle("item-filter-active");
            }
        }
        selectedFilter.classList.toggle("item-filter-active");
    }

    const handleCardClick = (index, type) => {
        console.log("Card selecionado:", index);
        setViewDetails(!viewDetails);
        setSelectedCard(index);
        setSelectedCardType(type);
    };

    useEffect(() => {
        setSearch([...searchCustomer, ...searchEstab]);
    }, [searchCustomer, searchEstab]);

    useEffect(() => {
        getSearchEstab();
        getSearchCustomer();
    }, []);

    useEffect(() => {
        getMaps();
    }, [searchCustomer, searchEstab]);

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
                                        <img src={ImageFilter} className="filter" alt="" />
                                        <div className="item-filter-box">
                                            <span className="item-filter-user" id="1" >Filtros</span>
                                            <span className="item-filter-user" id="2" onClick={() => { selectFilter("2") }}>Comentário</span>
                                            <span className="item-filter-user" id="3" onClick={() => { selectFilter("3") }}>Relevância</span>
                                            <span className="item-filter-user" id="4" onClick={() => { selectFilter("4") }}>Upvote</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="search-body">
                                    <MyLoader />
                                    {search && search.map((item, index) => (
                                        <div onClick={(e) => {
                                            e.preventDefault();
                                            handleCardClick(index, item.typeUser)
                                            if (item.typeUser == "ESTABLISHMENT") {
                                                getMaps(item.lat, item.lng)
                                            }
                                        }}>
                                            {console.log("item:", item)}
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
                                    />
                                )}
                            </div>
                            {selectedCardType === "ESTABLISHMENT" && showMap && url && viewDetails && (
                                <div className="maps-box">
                                    <span className="title">Localização</span>
                                    <img src={url} alt="Mapa" />
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