import "./CheckboxSelect.css";
import { api_mock } from "../../services/api";
import { useState, useEffect } from "react";

const CheckboxSelect = ({ setSelectedValues, selectedValues }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api_mock.get("establishment").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleCheckboxChange = (event) => {
    const categoryId = event.target.id;
    const categoryName = event.target.value;
    const isSelected = event.target.checked;

    setSelectedValues((prevSelectedValues) => {
      const existingObject = prevSelectedValues.find(
        (value) => value.id === categoryId
      );

      if (isSelected) {
        if (existingObject) {
          // Se o ID já estiver presente, atualiza apenas o nome
          return prevSelectedValues.map((value) =>
            value.id === categoryId ? { ...value, name: categoryName } : value
          );
        }
        // Se o ID não estiver presente, adiciona um novo objeto
        return [...prevSelectedValues, { id: categoryId, name: categoryName }];
      } else {
        // Remove o objeto correspondente ao ID desmarcado
        return prevSelectedValues.filter((value) => value.id !== categoryId);
      }
    });
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
              checked={selectedValues.some((value) => value.id === category.id)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={category.id}>
              <div
                className="image-container"
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${category.culinary_image}), lightgray 50% / cover no-repeat`,
                  backgroundPosition: "center",
                  backgroundImage: `url(${category.culinary_image})`,
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
