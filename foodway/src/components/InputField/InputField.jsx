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
  classNameGeral = "form-group",
  onMouseLeave = () => {},
  autocomplete,
  mask,
  maxLength = 3000,
  disabled = false,
}) => {
  return (
    <div className={classNameGeral}>
      <label htmlFor={id}>{label}</label>
      {mask ? (
        <InputMask
          disabled={disabled}
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
          disabled={disabled}
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

const TextAreaField = ({
  id,
  type,
  placeholder,
  label,
  value,
  onChange,
  rows = 5,
  className = "input-field-default",
  classNameGeral = "form-group",
  onMouseLeave = () => {},
  autocomplete,
  mask,
  maxLength = 3000,
}) => {
  return (
    <div className={classNameGeral}>
      <label htmlFor={id}>{label}</label>
      <textarea
        style={{ resize: "none" }}
        rows={rows}
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
    </div>
  );
};

export default InputField;
export { InputField, TextAreaField };
