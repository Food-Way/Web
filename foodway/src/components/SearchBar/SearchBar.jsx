import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import api from "../../services/api";

function SearchBar(props) {
    const [searched, setSearched] = useState([]);
    const [filter, setFilter] = useState('');
    const [filtred, setFiltred] = useState([]);
    const [oldCategory, setOldCategory] = useState(0);
    const [passed, setPassed] = useState(false);

    function listSearched() {
        var uriPath;
        
        switch (document.location.pathname) {
            case '/':
                if (oldCategory != atob(sessionStorage.getItem('category'))) {
                    var category = atob(sessionStorage.getItem('category'));
                    setOldCategory(category);
                    uriPath = `/culinaries/${category}`;
                    setPassed(true);
                    setSearched([]);
                    callGet(uriPath);
                }
                
                break;
            case document.location.pathname.startsWith('/establishment/performance/menu'):
                uriPath = `/products/establishments/${id}/null`;
                setPassed(true);
                setSearched([]);
                callGet(uriPath);
                break;

            default:
                uriPath = `/establishment`;
                break;
        }

    }

    function callGet(uriPath) {
        api.get(uriPath, {
            data: {
                idEstablishment: atob(sessionStorage.getItem('idUser'))
            },

        })

            .then(response => {
                if (response.status === 200) {
                    setSearched(response.data);
                } else {
                    console.error('Erro ao buscar:', response.status);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar:', error);
            })
            .finally(() => {
                console.log('Busca finalizada');
            });
    }

   
    function setSize() {
        var searchBar = document.querySelector('.search-bar');
        searchBar.style.width = props.width;
        searchBar.style.height = props.height;
    }

    useEffect(() => {
        listSearched();
        setSize();
    }, []);

    function filterName(event) {
        // var searchBar = document.querySelector('.search-bar');

        const value = event.target.value.toUpperCase();
        setFilter(value);

        setFiltred(searched.filter(item =>
            item.name.toUpperCase().includes(value)
        ));
        var dropdown = document.getElementById('dropdownList');

        if (value === '') {
            dropdown.classList.remove('show');
            dropdown.classList.add('hide');
        } else {
            dropdown.classList.remove('hide');
            dropdown.classList.add('show');
        }
    }

    return (
        <div className="dropdown">
            <input
                type="text"
                placeholder={props.placeholder}
                className='search-bar'
                onKeyUp={filterName}
                onFocus={() =>{
                    listSearched();
                }}
            />
            <div
                id="dropdownList"
                className={`dropdown-content`}
            >

                {filtred.map(item => (
                    <div key={item.id} className='itens'>
                        <a href={`/home`}>{item.name}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;