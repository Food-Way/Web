import "./CheckboxSelect.css";
import { api_mock } from "../../services/api";
import { useState, useEffect } from "react";
const CheckboxSelect = ({ category, setSelectedValues, selectedValues }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api_mock.get("establishment").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);

  const handleCheckboxChange = (event) => {
    const categoryId = event.target.id;
    const isSelected = event.target.checked;

    if (isSelected) {
      setSelectedValues((prevSelectedValues) => [
        ...prevSelectedValues,
        categoryId,
      ]);
    } else {
      setSelectedValues((prevSelectedValues) => {
        const newSelectedValues = prevSelectedValues.filter(
          (value) => value !== categoryId
        );

        return newSelectedValues;
      });
    }
    console.log(selectedValues);
  };

  return (
    <div className="sabores-select">
      <ul className="unordenated-list">
        {categories.map((category) => (
          <li key={category.id}>
            <input
              type="checkbox"
              id={category.id}
              value={category.id}
              checked={selectedValues.includes(category.id)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={category.id}>
              <img src={category.culinary_image} />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxSelect;
