import { useState, React, useEffect } from "react";
import SearchCard from "../../components/SearchCard/SearchCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filter from "../../components/Filter/Filter";
import ImageFilter from "../../../public/filter.svg";
import SearchDetails from "../../components/SearchDetails/SearchDetails";

import './SearchUser.css';

function SearchUser() {
    var typeUser = "ESTABLISHMENT";

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

    return (
        <>
            <div className="search-user-container">
                <div className="search-user">
                    <section>
                        <div className="search-container">
                            <div className="search-box">
                                <div className="search-header">
                                    <span className="search-results">10 resultados</span>
                                    <SearchBar placeholder="Pesquisar" />
                                    <div className="menu-filter-box">
                                        <img src={ImageFilter} className="filter" alt="" />
                                        <div className="item-filter-box">
                                            <span className="item-filter-user" id="1" onClick={() => { selectFilter("1") }}>Nível</span>
                                            <span className="item-filter-user" id="2" onClick={() => { selectFilter("2") }}>Commet</span>
                                            <span className="item-filter-user" id="3" onClick={() => { selectFilter("3") }}>Relevante</span>
                                            <span className="item-filter-user" id="4" onClick={() => { selectFilter("4") }}>Upvote</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="search-body">
                                    <SearchCard />
                                    <SearchCard />
                                    <SearchCard />
                                    <SearchCard />
                                    <SearchCard />
                                    <SearchCard />
                                    <SearchCard />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="user-details-container">
                            <div className="user-details-box">
                                <SearchDetails />
                            </div>
                            { typeUser == "ESTABLISHMENT" ? 
                            <div className="maps-box">
                                <span className="title">Localização</span>
                                <img src="" alt="" />
                            </div> : ""}   
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default SearchUser;