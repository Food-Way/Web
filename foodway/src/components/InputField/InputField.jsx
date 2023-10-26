import "./InputField.css";
import React from "react"; // Certifique-se de importar o React

const InputField = ({
  id,
  type,
  placeholder,
  label,
  value,
  onChange,
  autocomplete,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autocomplete}
      />
    </div>
  );
};

export default InputField;
