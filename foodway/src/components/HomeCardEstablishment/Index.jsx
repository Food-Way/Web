import React from "react";
import "./style.css";
import { Rating } from "react-simple-star-rating";

const HomeCardEstablishment = ({ establishment, image, category, rattingNumber }) => {
  
  const ratingOptions = {
    size: "20px",
    initialValue: rattingNumber, // Certifique-se de que rattingNumber esteja definido antes desta linha
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
    backgroundRepeat: "no-repeat",
     
    
    
  };
  
  return (
    <div style={styleCard} className="card-establishment">
      <div className="card-establishment-content">
        <p>{establishment}</p>
        <p>Restaurante {category}</p>
        <div className="restaurant-rating">
          <div className="star-container">
            <Rating {...ratingOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCardEstablishment;
