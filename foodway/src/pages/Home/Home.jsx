import React, { useRef, useEffect, useState } from "react";
import ContainerCardFood from "../../components/ContainerCardFood/ContainerCardFood";
import MainBanner from "../../components/MainBanner/MainBanner";
import CarrosselEstablishment from "../../components/CarrosselEstablishment/CarrosselEstablishment";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button";
import { Auth } from "../../components/Auth/Auth";
import api_call from "../../services/apiImpl";
import "./Home.css";
import establishmentIMG from "../../../public/establishment.png";
import customerIMG from "../../../public/customer.png";
import card from "../../../public/Card.png";
import androidI from "../../../public/android.svg";
import androidBg from "../../../public/emBreve.png";
import ContentLoader from "react-content-loader";

const Home = () => {
  const establishmentIMG =
    "https://foodway-public-s3.s3.amazonaws.com/website-images/establishment.png";
  const customerIMG =
    "https://foodway-public-s3.s3.amazonaws.com/website-images/customer.png";
  const card = "https://foodway-public-s3.s3.amazonaws.com/website-images/card.png";
  const androidI = "https://foodway-public-s3.s3.amazonaws.com/website-images/android.svg";
  const androidBg = "https://foodway-public-s3.s3.amazonaws.com/website-images/coming-soon.png";
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    // Definindo a função assíncrona dentro do useEffect
    async function fetchData() {
      sessionStorage.setItem('category', btoa(999));
      await Promise.all([
        listCategory(),
        greaterRate(),
        greaterComments(),
      ]);
      setIsLoading(false); // Isso será executado depois que todas as chamadas acima estiverem completas
    }

    // Invocando a função fetchData
    fetchData();
  }, []); // O array vazio indica que este efeito não depende de nenhuma prop ou estado, então ele roda apenas uma vez após o componente montar.


  const [greaterRateEstab, setGreaterRateEstab] = useState([]);
  const [greaterCommentsEstab, setGreaterEstab] = useState([]);
  const [category, setCategory] = useState([]);

  const CategoryLoader = () => (
    <ContentLoader
      speed={2}
      width={1897}
      height={131}
      viewBox="0 0 1897 131"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="2" y="13" rx="0" ry="0" width="250" height="250" />
      <rect x="266" y="15" rx="0" ry="0" width="250" height="250" />
      <rect x="530" y="14" rx="0" ry="0" width="250" height="250" />
      <rect x="794" y="13" rx="0" ry="0" width="250" height="250" />
      <rect x="1058" y="15" rx="0" ry="0" width="250" height="250" />
      <rect x="1322" y="14" rx="0" ry="0" width="250" height="250" />
      <rect x="1586" y="13" rx="0" ry="0" width="250" height="250" />
      <rect x="1850" y="15" rx="0" ry="0" width="250" height="250" />
    </ContentLoader>
  );

  const GreaterRateLoader = () => {
    const numRectangles = 5;
    const totalWidth = 1600;
    const rectangleWidth = 250;
    const spacing = (totalWidth - (numRectangles * rectangleWidth)) / (numRectangles - 1);

    return (
      <ContentLoader
        style={{
          width: "105%",
          height: "30vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        speed={2}
        width={totalWidth}
        height={250}
        viewBox={`0 0 ${totalWidth} 250`}
        backgroundColor="#ffffff"
        foregroundColor="#c4c4c4"
      >
        {[...Array(numRectangles).keys()].map((index) => (
          <rect
            key={index}
            x={index * (rectangleWidth + spacing)}
            y="13"
            rx="10"
            ry="10"
            width={rectangleWidth}
            height="250"
          />
        ))}
      </ContentLoader>
    );
  }

  const GreaterCommentsLoader = () => {
    const numRectangles = 5;
    const totalWidth = 1600;
    const rectangleWidth = 250;
    const spacing = (totalWidth - (numRectangles * rectangleWidth)) / (numRectangles - 1);

    return (
      <ContentLoader
        style={{
          width: "105%",
          height: "30vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        speed={2}
        width={totalWidth}
        height={250}
        viewBox={`0 0 ${totalWidth} 250`}
        backgroundColor="#ffffff"
        foregroundColor="#c4c4c4"
      >
        {[...Array(numRectangles).keys()].map((index) => (
          <rect
            key={index}
            x={index * (rectangleWidth + spacing)}
            y="13"
            rx="10"
            ry="10"
            width={rectangleWidth}
            height="250"
          />
        ))}
      </ContentLoader>
    );
  };

  async function listCategory() {
    const response = await api_call("get", "/culinaries", null, null);
    console.log(response.data);
    setCategory(response.data);
  }

  async function greaterRate() {
    const response = await api_call(
      "get",
      "/establishments/order-by-greater-rate",
      null,
      null
    );
    console.log(response.data);
    setGreaterRateEstab(response.data.vetor);
  }

  async function greaterComments() {
    const culinary = null;
    const response = await api_call(
      "get",
      `/establishments/most-commented?culinary=${culinary}`,
      null,
      null
    );
    console.log(response.data);
    setGreaterEstab(response.data);
  }



  return (
    <main>
      <Auth />
      <MainBanner />
      <div style={styleDiv}>
        {isLoading ? (
          <>
            <div className="loader-container-home-category">
              <CategoryLoader />
            </div>

            <div className="loader-container-home-establishments">
              <GreaterCommentsLoader />
              <GreaterRateLoader />
            </div>
          </>
        ) : (
          <>
            <ContainerCardFood categories={category} />
            <>
              <CarrosselEstablishment headerText="Melhores avaliados em suas categorias:" establishment={greaterRateEstab} />
              <CarrosselEstablishment headerText="Mais Comentados:" establishment={greaterCommentsEstab} />
            </>
          </>
        )} <img
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
              <ButtonPrimary text="Saiba Mais!" width={"50%"} />
            </div>
            <div className="cta-saiba-mais">
              <div className="textLegend">
                <span>
                  Desfrute o <span className="red">sabor do sucesso </span>
                  ao escolher o lugar perfeito!
                </span>
              </div>

              <img src={customerIMG} alt="saiba-mais" />
              <ButtonPrimary text="Saiba Mais!" width={"50%"} />
            </div>
          </div>
        </div>
        <div style={androidStyle} className="android-section-container">
          <div className="android-section">
            <div className="android-section-text">
              <div className="android-container">
                <span>Disponível para</span>{" "}
                <span>Android</span>
              </div>
              <img src={androidI} alt="android" />
              <ButtonSecondary text="Veja" width={"50%"} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;