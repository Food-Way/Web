import "./SelectCategory.css";
import Select from 'react-select';
import { useState, React, useEffect } from "react";
import api from '../../services/api';

function SelectCategory() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [category, setCategory] = useState([]);
    
    const general = ([{ value: "Geral", label: "Geral", id: 999 }]);

    function listCategory() {
        api.get("/culinaries")
            .then(response => {
                const options = [];
                response.data.map((item) => {
                    options.push({ value: item['name'], label: item['name'], id: item['id'] });
                });
                setCategory([...general, ...options]);
            })
            .catch(error => {
                console.error('Erro ao buscar estabelecimentos:', error);
            });
    }

    const selectOption = (selectedOption) => {
        setSelectedOption(selectedOption);
        sessionStorage.setItem('category', btoa(selectedOption.id));
        sessionStorage.setItem('trigger', btoa(true));
    }

    useEffect(() => {
        listCategory();
    }, []);

    return (
        <>
            <Select
                onChange={selectOption}
                options={category}
                className="select-category"
                placeholder="Categoria"
                noOptionsMessage={() => "Nenhum Resultado"}
                defaultValue={general}
            />
        </>
    )
}

export default SelectCategory;