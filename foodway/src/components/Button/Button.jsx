import "./Button.css";
import { Link } from "react-router-dom";
const ButtonPrimary = ({ text, onclick }) => {
  return (
    <button className="button-primary" onClick={onclick} type="button">
      {text}
    </button>
  );
};
const ButtonPrimaryLink = ({ text, url }) => {
  return (
    <Link className="button-primary" to={url}>
      {text}
    </Link>
  );
};

const ButtonSecondary = ({ text, onClick }) => {
  return (
    <button className="button-secondary" type="button">
      {text}
    </button>
  );
};

export { ButtonPrimary, ButtonSecondary, ButtonPrimaryLink };
