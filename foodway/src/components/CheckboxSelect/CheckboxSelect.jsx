import "./CheckboxSelect.css";
import api_call from "../../services/apiImpl";
import { useState, useEffect } from "react";

const CheckboxSelect = ({
  setSelectedValues,
  selectedValues,
  setSelectedCulinaries,
  selectedCulinaries,
}) => {
  const [categories, setCategories] = useState([]);

  async function getCulinaries () {
    const response = await api_call("get", "culinaries", null, null); 
    setCategories(response.data);
    setSelectedCulinaries(response.data);
  }
  
  useEffect(() => {
    getCulinaries();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, id } = event.target;
    0;
    let updatedSelectedValues;

    if (selectedValues.includes(value)) {
      // If the value is already in the selectedValues, remove it
      updatedSelectedValues = selectedValues.filter((val) => val !== value);
    } else {
      // If the value is not in the selectedValues, add it
      updatedSelectedValues = [...selectedValues, value];
    }

    setSelectedValues(updatedSelectedValues);
  };

  return (
    <div className="sabores-select">
      <ul className="unordenated-list">
        {categories.map((category) => (
          <li key={category.id}>
            <input
              type="checkbox"
              id={category.id}
              value={category.name}
              checked={selectedValues.includes(category.name)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={category.id}>
              <div
                className="image-container"
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${category.photo}), lightgray 50% / cover no-repeat`,
                  backgroundPosition: "center",
                }}
              >
                <h2>{category.name}</h2>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxSelect;
