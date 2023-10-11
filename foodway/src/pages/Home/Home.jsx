import React, { useRef, useEffect, useState } from "react";
import Header from "../../components/Header/HeaderGeneral";
import "./Home.css";
import ContainerCardFood from "../../components/ContainerCardFood/ContainerCardFood";
import MainBanner from "../../components/MainBanner/MainBanner";
import CarrosselEstablishment from "../../components/CarrosselEstablishment/CarrosselEstablishment";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button";
import jp from "../../assets/img/cardHome/jp.png";
import card from "../../assets/img/Card.png";
import customerIMG from "../../assets/img/images/customer.png";
import establishmentIMG from "../../assets/img/images/establishment.png";
import androidBg from "../../assets/img/images/emBreve.png";
import androidI from "../../assets/img/icons/android.svg";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  const androidStyle = {
    backgroundImage: `url(${androidBg})`,
  };
  const styleDiv = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
  };
  return (
    <div className="home">
      <Header />
      <MainBanner />
      <ContainerCardFood />
      <div style={styleDiv}>
        <CarrosselEstablishment headerText="Melhores avaliados em suas categorias:" />
        <CarrosselEstablishment headerText="Mais Comentados:" />
        <img
          src={card}
          alt="avalie-os-restaurantes"
          className="card-avalie-restaurantes"
        />
        <div className="cto-container">
          <div className="cto">
            <div className="cta-saiba-mais">
              <p>
                <span>A rota assertiva para o</span>
                <span>
                  <span className="red">sucesso </span>do seu estabelecimento!
                </span>
              </p>
              <img src={establishmentIMG} alt="saiba-mais" />
              <ButtonPrimary text="Saiba Mais!" />
            </div>
            <div className="cta-saiba-mais">
              <p>
                <span>
                  {" "}
                  Desfrute o <span className="red">sabor do sucesso </span>
                  ao
                </span>{" "}
                <span>escolher o lugar perfeito!</span>
              </p>
              <img src={customerIMG} alt="Saiba-Mais!" />
              <ButtonPrimary text="Saiba Mais!" />
            </div>
          </div>
        </div>
        <div style={androidStyle} className="android-section-container">
          <div className="android-section">
            <div className="android-section-text">
              EM BREVE <span>Disponível para</span> <span>Android</span>
              <img src={androidI} alt="android" />
              <ButtonSecondary text="Veja" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
