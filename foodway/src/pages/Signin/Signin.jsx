import Header from "../../components/Header/HeaderGeneral";
import Footer from "../../components/Footer/Footer";
import { ButtonPrimary } from "../../components/Button/Button";
import "./Signin.css";
import costumer from "../../assets/img/images/c.png";
import establishment from "../../assets/img/images/e.png";
const Signin = () => {
  return (
    <>
      <div className="mainSignin">
        <div className="mainSiginContainer">
          <div className="cardCostumerEstablishment">
            <img src={costumer} alt="" />
            <ButtonPrimary text="Sou um Cliente!" />
          </div>
          <div className="cardCostumerEstablishment">
            <img src={establishment} alt="" />
            <ButtonPrimary text="Tenho um Estabelecimento!" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
