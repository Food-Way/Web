import React, { useEffect, useState } from 'react';
import './SelectionLocation.css';
import api_call from '../../services/apiImpl';

function SelectLocation() {
    const [location, setLocation] = useState([]);

    async function getLocations() {
        const response = await api_call("get", "/states", null, null);
        console.log(response);
        setLocation(response);
    }

    function showOptions() {
        var options = document.querySelector('.options-location');

        if (!options.classList.contains('show')) {
            options.classList.toggle('show');
            options.classList.toggle('animation-in');
        } else {
            options.classList.toggle('animation-out');
        }
    }

    useEffect(() => {
        getLocations();
    })

    return (
        <>
            <div className='select-location' onClick={showOptions}>
                <div>
                    <span id='location-text'>Localização</span>
                    <div className='options-location hide'>
                        {location.length === 0 ? (
                            <span>Nenhum resultado</span>
                        ) : (
                            location.map((item) => {
                                return (
                                    <div key={item.id} onClick={() => {
                                        showOptions();
                                        var newLocation = document.getElementById('location-text');
                                        newLocation.innerHTML = item.name;
                                    }}>
                                        <span>{item.name}</span>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectLocation;