import "./Button.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import firstStepImage from "../../../public/arrow_front.png";
import secondStepImage from "../../../public/arrow_back.png";
const ButtonPrimary = ({
  text,
  onclick,
  className = "button-primary",
  width,
  height,
}) => {
  return (
    <button
      style={{ width: width, height: height }}
      className={className}
      onClick={onclick}
      type="button"
    >
      {text}
    </button>
  );
};

const ButtonStep = ({ step, onclick }) => {
  const [buttonImage, setButtonImage] = useState(
    parseInt(step) === 1 ? firstStepImage : secondStepImage
  );

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

const ButtonSecondary = ({  width, height, text, onclick, className = "button-secondary" }) => {
  return (
    <button className={className} onClick={onclick} type="button" style={{ width: width, height: height }}>
      {text}
    </button>
  );
};

const ButtonSecondaryLink = ({ width, height, text, url }) => {
  return (
    <Link className="button-secondary" style={{ width: width, height: height }} to={url}>
      {text}
    </Link>
  );
};

export { ButtonPrimary, ButtonSecondary, ButtonPrimaryLink, ButtonStep, ButtonSecondaryLink };