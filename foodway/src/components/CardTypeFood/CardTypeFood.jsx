import "./CardTypeFood.css";

const CardTypeFood = ({ typeFood, image }) => {
  const styleCard = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      style={styleCard}
      className="card-type-food"
      id="card-type-food-scroll"
    >
      <h2>{typeFood}</h2>
    </div>
  );
};

export default CardTypeFood;
