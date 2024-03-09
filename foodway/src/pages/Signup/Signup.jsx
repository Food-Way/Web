import "./Signup.css";

import { ButtonPrimaryLink } from "../../components/Button/Button";
import costumer from "../../../public/c.png";
import establishment from "../../../public/e.png";

const Signup = () => {
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
