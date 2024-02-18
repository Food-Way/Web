import React, { useEffect, useState } from 'react';
import sadCat from "../../../public/sadCat.png";
import './SearchBar.css';
import api_call from '../../services/apiImpl';

function SearchBar(props) {
    const [searched, setSearched] = useState([]);
    const [filter, setFilter] = useState('');
    const [filtred, setFiltred] = useState([]);
    const [oldCategory, setOldCategory] = useState(0);
    const [passed, setPassed] = useState(false);

    function listSearched() {
        var uriPath;

        switch (document.location.pathname) {
            case '/adsad':
                if (oldCategory != atob(sessionStorage.getItem('category'))) {
                    var category = atob(sessionStorage.getItem('category'));
                    console.log(category);
                    console.log(oldCategory);
                    setOldCategory(category);
                    console.log(oldCategory);
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
                var category = atob(sessionStorage.getItem('category'));
                uriPath = `establishments/culinary?idCulinary=${category}`;
                callGet(uriPath);
                break;
        }

    }

    async function callGet(uriPath) {
        const response = await api_call("get", uriPath, null, null);
        console.log('Busca realizada com sucesso');
        setSearched(response);
    }

    function search() {
        listSearched();
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
        const value = event.target.value.toUpperCase();
        setFilter(value);

        setFiltred(searched.filter(item =>
            item.establishmentName.toUpperCase().includes(value)
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
                onFocus={search}
            />
            <div
                id="dropdownList"
                className={`dropdown-content`}
            >
                {filtred.length === 0 && filter !== '' ?
                    <div className='empty-results'>
                        <div className='box-empty-results'>Nenhum resultado
                        </div>
                        <img className='img-sadCat' src={sadCat} alt="" />
                    </div> : ''}

                {filtred.map(item => (
                    <div key={item.idUser} className='itens'>
                        <a href={`/establishment/info/${item.idUser}`}>{item.establishmentName}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;