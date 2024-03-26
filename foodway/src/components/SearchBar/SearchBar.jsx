import React, { useEffect, useState } from 'react';
import sadCat from "../../../public/sadCat.png";
import './SearchBar.css';
import api_call from '../../services/apiImpl';
import parseJWT from "../../util/parseJWT";

function SearchBar(props) {
    const [searched, setSearched] = useState([]);
    const [filter, setFilter] = useState('');
    const [filtred, setFiltred] = useState([]);
    const [oldCategory, setOldCategory] = useState(0);
    const [passed, setPassed] = useState(false);

    const bodyToken = parseJWT();

    function listSearched() {
        var uriPath;

        switch (document.location.pathname) {
            case '/':
                var category = atob(sessionStorage.getItem('category'));
                uriPath = `establishments/culinary?idCulinary=${category}`;
                callGet(uriPath);
                break;
            case `/establishment/performance/menu/${bodyToken.idUser}`:
                uriPath = `/products/establishments/${bodyToken.idUser}/name`;
                setPassed(true);
                setSearched([]);
                callGet(uriPath);
                break;
            case `/establishment-menu/${sessionStorage.getItem('idEstablishment')}`:
                uriPath = `/products/establishments/${bodyToken.idUser}/name`;
                setPassed(true);
                setSearched([]);
                callGet(uriPath);
                break;
            case document.location.pathname.startsWith('/search-user'):
                var uriPathEstb = `/establishments`;
                var uriPathCust = `/customers`;
                setPassed(true);
                setSearched([]);
                callGetTwo(uriPathEstb, uriPathCust);
                break;
            default:
                console.log(document.location.pathname.startsWith(`/establishment/performance/menu/${bodyToken.idUser}`));
                var category = atob(sessionStorage.getItem('category'));
                uriPath = `establishments/culinary?idCulinary=${category}`;
                callGet(uriPath);
                break;
        }
    }

    async function callGet(uriPath) {
        const response = await api_call("get", uriPath, null, null);
        console.log('Busca realizada com sucesso');
        setSearched(response.data);
    }

    async function callGetTwo(uriPathOne, uriPathTwo) {
        const responseOne = await api_call("get", uriPathOne, null, null);
        const responseTwo = await api_call("get", uriPathTwo, null, null);
        console.log('Busca realizada com sucesso');
        setSearched([...responseOne.data, ...responseTwo.data]);
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
            item.typeUser === 'ESTABLISHMENT' ? item.establishmentName.toUpperCase().includes(value) :
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
                onFocus={() => {
                    listSearched();
                }}
            />
            <div
                id="dropdownList"
                className={`dropdown-content`}
            >
                {filtred.length === 0 && filter !== '' ?
                    <div className='empty-results'>
                        <div className='box-empty-results'>Nenhum resultado
                        </div>
                        <img className='img-sadCat' src={sadCat} alt="Imagem de gato triste" />
                    </div> : ''}

                {filtred.map(item => (
                    <div key={item.idUser} className='itens'>
                        <a href={`/establishment/info/${item.idUser}`}>{item.typeUser === 'ESTABLISHMENT' ? item.establishmentName : item.name}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;