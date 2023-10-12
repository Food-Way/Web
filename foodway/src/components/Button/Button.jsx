import "./Button.css";
const ButtonPrimary = ({ text, onClick }) => {
  return (
    <button className="button-primary" type="button">
      {text}
    </button>
  );
};

const ButtonSecondary = ({ text, onClick }) => {
  return (
    <button className="button-secondary" type="button">
      {text}
    </button>
  );
};

export { ButtonPrimary, ButtonSecondary };
