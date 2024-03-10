import React from "react";
import "./HomeCardEstablishment.css";
import { Rating } from "react-simple-star-rating";
import { SwiperSlide } from "swiper/react";

const HomeCardEstablishment = ({
  establishment,
  image,
  category,
  rattingNumber,
  onclick,
}) => {
  const ratingOptions = {
    size: "20px",
    initialValue: rattingNumber,
    readonly: true,
    allowFraction: true,
    fillColor: "white",
    emptyColor: "transparent",
    SVGstrokeColor: "white",
    SVGstorkeWidth: "1",
    padding: "20px",
  };

  const styleCard = {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${image}), lightgray 50%`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <span style={styleCard} className="card-establishment" onClick={onclick}>
      <div className="card-establishment-content">
        <p>{establishment}</p>
        <p>Restaurante {category}</p>
        <div className="restaurant-rating">
          <div className="star-container">
            <Rating {...ratingOptions} />
          </div>
        </div>
      </div>
    </span>
  );
};

export default HomeCardEstablishment;
