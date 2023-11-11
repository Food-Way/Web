import React, { useState } from 'react';
import locations from './location.json'
import './SelectionLocation.css';

function SelectLocation() {
    const [location, setLocation] = useState(locations);

    function showOptions() {
        var options = document.querySelector('.options-location');

        if (!options.classList.contains('show')) {
            options.classList.toggle('show');
            options.classList.toggle('animation-in');
        } else {
            options.classList.toggle('animation-out');
        }
    }

    return (
        <>
            <div className='select-location' onClick={showOptions}>
                <div>
                    <span id='location-text'>Localização</span>
                    <div className='options-location hide'>
                        {location.map((item) => {
                            return (
                                <div key={item.id} onClick={() => {
                                    showOptions();
                                    var newLocation = document.getElementById('location-text');
                                    newLocation.innerHTML = item.name;
                                }}>
                                    <span>{item.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectLocation;