import "./Button.css";
import { Link } from "react-router-dom";
const ButtonPrimary = ({ text, onclick, className = "button-primary" }) => {
  return (
    <button className={className} onClick={onclick} type="button">
      {text}
    </button>
  );
};
import React, { useState, useEffect } from "react";

const ButtonStep = ({ step, onclick }) => {
  const firstStepImage =
    "https://foodway.blob.core.windows.net/public/arrow_front.png";
  const secondStepImage =
    "https://foodway.blob.core.windows.net/public/arrow_back.png";

  // Define the initial state based on the 'step' prop
  const [buttonImage, setButtonImage] = useState(
    parseInt(step) === 1 ? firstStepImage : secondStepImage
  );

  // Use useEffect to update the state when 'step' changes
  useEffect(() => {
    if (parseInt(step) === 1) {
      setButtonImage(firstStepImage);
    } else if (parseInt(step) === 2) {
      setButtonImage(secondStepImage);
    }
  }, [step]);

  return (
    <button className="button-step" onClick={onclick} type="button">
      <img src={buttonImage} alt="Ícone da Etapa" />
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

const ButtonSecondary = ({ text, onclick, className = "button-secondary" }) => {
  return (
    <button className={className} onClick={onclick} type="button">
      {text}
    </button>
  );
};

export { ButtonPrimary, ButtonSecondary, ButtonPrimaryLink, ButtonStep };
