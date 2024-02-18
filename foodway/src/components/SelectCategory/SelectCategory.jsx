import "./SelectCategory.css";
import Select from 'react-select';
import { useState, React, useEffect } from "react";
import api_call from "../../services/apiImpl";

function SelectCategory() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [category, setCategory] = useState([]);

    async function listCategory() {
        const response = await api_call("get", "/culinaries", null, null);
        const options = [];
        response.data.map((item) => {
            options.push({ value: item['name'], label: item['name'], id: item['id'] });
        });
        setCategory(options);
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
            />
        </>
    )
}

export default SelectCategory;