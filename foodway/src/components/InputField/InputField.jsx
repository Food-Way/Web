import "./InputField.css";
import InputMask from "react-input-mask";

const TextAreaFieldComment = ({
  id,
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  onClick,
  rows = 1,
  className = "input-field-comment",
  classNameGeral = "form-group",
  onMouseLeave = () => { },
  autoComplete = "off",
  mask,
  maxLength = 3000,
}) => {

  const adjustHeight = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className={classNameGeral}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        style={{ resize: "none", overflowY: 'hidden' }}
        rows={rows}
        className={className}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onClick={onClick}
        onChange={onChange}
        onInput={adjustHeight}
        onMouseLeave={onMouseLeave}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
    </div>
  );
};


const InputField = ({
  id,
  type,
  placeholder,
  label,
  value,
  onChange,
  className = "input-field-default",
  classNameGeral = "form-group",
  onMouseLeave = () => { },
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
  onMouseLeave = () => { },
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
export { InputField, TextAreaField, TextAreaFieldComment };
