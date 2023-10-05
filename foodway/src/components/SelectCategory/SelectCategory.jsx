import "./SelectCategory.css";
import Select from 'react-select';
import { useState, React } from "react";
import { Search, Option, Detail } from "searchpal";

const options = [
    { value: 'Brasileiro', label: 'Brasileiro' },
    { value: 'Japonês', label: 'Japonês' },
    { value: 'Italiano', label: 'Italiano' },
    { value: 'Árabe', label: 'Árabe' },
    { value: 'Mexicano', label: 'Mexicano' },
    { value: 'Chinês', label: 'Chinês' },
];

function SelectCategory() {
    const [setSelectedOption] = useState(null);
    return (
        <>
            <Select
                onChange={setSelectedOption}
                options={options}
                className="select-category"
                placeholder="Categoria"
                noOptionsMessage={() =>"Nenhum Resultado"}
            />  
        </>
    )
}

export default SelectCategory;