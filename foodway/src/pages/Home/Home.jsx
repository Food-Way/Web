import React, { useRef, useEffect, useState } from "react";
import Header from "../../components/Header/HeaderGeneral";
import "./Home.css";
import ContainerCardFood from "../../components/ContainerCardFood/ContainerCardFood";
import MainBanner from "../../components/MainBanner/MainBanner";
import CarrosselEstablishment from "../../components/CarrosselEstablishment/CarrosselEstablishment";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button";

import Footer from "../../components/Footer/Footer";
const Home = () => {
  const establishmentIMG =
    "https://foodway.blob.core.windows.net/public/establishment.png";
  const customerIMG =
    "https://foodway.blob.core.windows.net/public/customer.png";
  const card = "https://foodway.blob.core.windows.net/public/Card.png";
  const androidI = "https://foodway.blob.core.windows.net/public/android.svg";
  const androidBg = "https://foodway.blob.core.windows.net/public/emBreve.png";
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
    <main>
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
              <div className="textLegend">
                <span>A rota assertiva para o</span>
                <span>
                  <span className="red">sucesso </span>do seu estabelecimento!
                </span>
              </div>

              <img src={establishmentIMG} alt="saiba-mais" />
              <ButtonPrimary text="Saiba Mais!" />
            </div>
            <div className="cta-saiba-mais">
              <div className="textLegend">
                <span>
                  Desfrute o <span className="red">sabor do sucesso </span>
                  ao escolher o lugar perfeito!
                </span>
              </div>

              <img src={customerIMG} alt="saiba-mais" />
              <ButtonPrimary text="Saiba Mais!" />
            </div>
          </div>
        </div>
        <div style={androidStyle} className="android-section-container">
          <div className="android-section">
            <div className="android-section-text">
              <div className="android-container">
                <span>EM BREVE</span> <span>Disponível para</span>{" "}
                <span>Android</span>
              </div>
              <img src={androidI} alt="android" />
              <ButtonSecondary text="Veja" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
