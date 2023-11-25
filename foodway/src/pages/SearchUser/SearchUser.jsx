import { useState, React, useEffect, require } from "react";
import SearchCard from "../../components/SearchCard/SearchCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filter from "../../components/Filter/Filter";
import ImageFilter from "../../../public/filter.svg";
import SearchDetails from "../../components/SearchDetails/SearchDetails";
import { api, api_maps } from "../../services/api";

import './SearchUser.css';

function SearchUser() {
    const [search, setSearch] = useState([]);
    const [url, setUrl] = useState(null);
    var typeUser = "ESTABLISHMENT";
    const apiKey = "AIzaSyBdmmGVqp3SOAYkQ8ef1SN9PDBkm8JjD_s";

    async function getSearch() {
        try {
            const response = await api.get(`/establishments/search`, {
                headers: {
                    Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
                },
            });
            if (response.status === 200) {
                setSearch(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar estabelecimentos:', error);
        }
    }

    async function getMaps(lat, lng) {
        if (search.length > 0) {

            try {
                const response = await api_maps.get(`staticmap?center=${lat},${lng}&zoom=19&size=400x400&key=${apiKey}`, {
                    responseType: 'arraybuffer', // Indica que a resposta é binária
                });
                console.log("Response da API de Mapas:", response);

                if (response.status === 200 && response.data) {
                    // Cria uma URL de dados a partir do conteúdo binário
                    const blob = new Blob([response.data], { type: 'image/png' });
                    const dataUrl = URL.createObjectURL(blob);

                    console.log("URL do Mapa:", dataUrl);
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

    useEffect(() => {
        getSearch();
    }, []);

    useEffect(() => {
        getMaps();
    }, [search]);

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
                                    {search.map((item) => (
                                        <div onClick={() => { getMaps(item.lat, item.lng) }}>
                                            <SearchCard
                                                key={item.id}
                                                name={item.name}
                                                bio={item.bio}
                                                generalRate={item.generalRate}
                                                lastComment={item.lastComment}
                                                photo={item.photo}
                                                upvote={item.upvote}
                                                culinary={item.culinary}
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
                                <SearchDetails />
                            </div>
                            {typeUser === "ESTABLISHMENT" && url && (
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