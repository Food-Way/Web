import "./MainBanner.css";
import image from "../../../public/header.png";
const MainBanner = () => {
  const styleCard = {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${image}) lightgray 50% / cover  no-repeat`,
  };

  return (
    <>
      <div style={styleCard} className="main-banner-container">
        <h1>
          <span>
            FoodWay: o caminho para{" "}
            <span id="red">Experiências Gastronômicas</span>
          </span>
          <span>autênticas, apoiado por avaliações reais</span>
        </h1>
      </div>
    </>
  );
};
export default MainBanner;
