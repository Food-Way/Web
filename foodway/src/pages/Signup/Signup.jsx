import "./Signup.css";

import { ButtonPrimaryLink } from "../../components/Button/Button";

const Signup = () => {
  const costumer = "https://foodway.blob.core.windows.net/public/c.png";
  const establishment = "https://foodway.blob.core.windows.net/public/e.png";
  return (
    <>
      <div className="mainSignin">
        <div className="mainSiginContainer">
          <div className="cardCostumerEstablishment">
            <img src={costumer} alt="" />

            <ButtonPrimaryLink
              url="/sign-up-costumer"
              className="buttonCostumerEstablishment"
              text="Sou um Cliente!"
            />
          </div>
          <div className="cardCostumerEstablishment">
            <img src={establishment} alt="" />
            <ButtonPrimaryLink
              url="/sign-up-establishment"
              className="buttonCostumerEstablishment"
              text="Tenho um Estabelecimento!"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
