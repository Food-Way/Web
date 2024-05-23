  import "./CardTypeFood.css";

  const CardTypeFood = (props) => {
    const styleCard = {
      backgroundImage: `url(${props.image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };

    return (
      <div
        style={styleCard}
        className="card-type-food"
        id="card-type-food-scroll"
      >
        <h2>{props.typeFood}</h2>
      </div>
    );
  };

  export default CardTypeFood;
