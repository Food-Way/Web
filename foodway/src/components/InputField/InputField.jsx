import "./InputField.css";
import React from "react"; // Certifique-se de importar o React
import InputMask from "react-input-mask";
const InputField = ({
  id,
  type,
  placeholder,
  label,
  value,
  onChange,
  className = "input-field-default",
  onMouseLeave = () => {},
  autocomplete,
  mask,
  maxLength = 3000,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {mask ? (
        <InputMask
          className={className}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autocomplete}
          onMouseLeave={onMouseLeave}
          mask={mask}
        />
      ) : (
        <input
          className={className}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onMouseEnter={onMouseLeave}
          autoComplete={autocomplete}
          maxLength={maxLength}
        />
      )}
    </div>
  );
};

export default InputField;
