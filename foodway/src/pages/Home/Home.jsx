import React, { useRef, useEffect, useState } from "react";
import ContainerCardFood from "../../components/ContainerCardFood/ContainerCardFood";
import MainBanner from "../../components/MainBanner/MainBanner";
import CarrosselEstablishment from "../../components/CarrosselEstablishment/CarrosselEstablishment";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button";
import { Auth } from "../../components/Auth/Auth";
import api from "../../services/api";
import "./Home.css";

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

  const [greaterRateEstab, setGreaterRateEstab] = useState([]);
  const [greaterCommentsEstab, setGreaterEstab] = useState([]);

  const greaterRate = () => {
    api.get("/establishments/order-by-greater-rate")
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.vetor);
          setGreaterRateEstab(response.data.vetor);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar estabelecimentos:', error);
      });
  }

  const greaterComments = () =>  {
    const culinary = null;

    api.get(`/establishments/most-commented?culinary=${culinary}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          setGreaterEstab(response.data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar estabelecimentos:', error);
      });
  }

  useEffect(() => {
    greaterRate();
    greaterComments();
  }, []);

  return (
    <main>
      <Auth />
      <MainBanner />
      <ContainerCardFood />
      <div style={styleDiv}>
        <CarrosselEstablishment headerText="Melhores avaliados em suas categorias:" establishment={greaterRateEstab} />
        <CarrosselEstablishment headerText="Mais Comentados:" establishment={greaterCommentsEstab} />
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
