import Header from "../../components/Header/HeaderGeneral";
import Footer from "../../components/Footer/Footer";
import { ButtonPrimary } from "../../components/Button/Button";
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
            <Link to={"/sign-up-costumer"}>
              <ButtonPrimary text="Sou um Cliente!" />
            </Link>
          </div>
          <div className="cardCostumerEstablishment">
            <img src={establishment} alt="" />
            <Link to={"/sign-up-establishment"}>
              <ButtonPrimary text="Tenho um Estabelecimento!" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
