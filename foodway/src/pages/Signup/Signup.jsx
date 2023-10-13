import Header from "../../components/Header/HeaderGeneral";
import Footer from "../../components/Footer/Footer";
import {
  ButtonPrimary,
  ButtonPrimaryLink,
} from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "./Signup.css";
import costumer from "../../assets/img/images/c.png";
import establishment from "../../assets/img/images/e.png";
const Signin = () => {
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

export default Signin;
