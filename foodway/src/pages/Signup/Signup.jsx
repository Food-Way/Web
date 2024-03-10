import "./Signup.css";

import { ButtonPrimaryLink } from "../../components/Button/Button";

const Signup = () => {
  const costumer = "https://foodway-public-s3.s3.amazonaws.com/website-images/c.png";
  const establishment = "https://foodway-public-s3.s3.amazonaws.com/website-images/e.png";
  return (
    <>
      <div className="mainSignin">
        <div className="mainSiginContainer">
          <div className="cardCostumerEstablishment">
            <img src={costumer} alt="" />

            <ButtonPrimaryLink
              url="/sign-up-customer"
              className="buttonCostumerEstablishment"
              text="Sou um Cliente!"
              width={"70%"}
            />
          </div>
          <div className="cardCostumerEstablishment">
            <img src={establishment} alt="" />
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
