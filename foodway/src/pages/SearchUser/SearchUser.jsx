import { useState, React, useEffect } from "react";
import SearchCard from "../../components/SearchCard/SearchCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filter from "../../components/Filter/Filter";
import SearchDetails from "../../components/SearchDetails/SearchDetails";

import './SearchUser.css';

function SearchUser() {
    return (
        <>
            <div className="search-user-container">
                <div className="search-user">
                    <section>
                        <div className="search-container">
                            <div className="search-box">
                                <div className="search-header">
                                    <span className="search-results">10 resultados</span>
                                    <SearchBar className="search-bar" placeholder="Pesquisar" />
                                    <Filter />
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
                            <div className="maps-box">
                                <span className="title">Localização</span>
                                <img src="" alt="" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default SearchUser;