import "./Signup.css";

import { ButtonPrimaryLink } from "../../components/Button/Button";

const Signup = () => {
  const costumer = "https://foodway.s3.amazonaws.com/public-images/c.webp";
  const establishment = "https://foodway.s3.amazonaws.com/public-images/e.webp";
  return (
    <>
      <div className="mainSignin">
        <div className="mainSiginContainer">
          <div className="cardCostumerEstablishment">
            <img src={costumer} alt="Imagem de cliente" />

            <ButtonPrimaryLink
              url="/sign-up-customer"
              className="buttonCostumerEstablishment"
              text="Sou um Cliente!"
              width={"70%"}
            />
          </div>
          <div className="cardCostumerEstablishment">
            <img src={establishment} alt="Imagem de estabelecimento" />
            <ButtonPrimaryLink
              url="/sign-up-establishment"
              className="buttonCostumerEstablishment"
              text="Tenho um Estabelecimento!"
              width={"70%"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
