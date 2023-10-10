import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeCardEstablishment from "../../components/HomeCardEstablishment/Index";
import "./style.css";

const CarrosselEstablishment = ({ headerText }) => {
  const settings = {
    dots: false,

    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "true",
    style: {
      width: "100%",
      height: "100%",
    },
  };

  return (
    <div className="carrossel-establishment-container">
      <div className="carrossel-establishment">
        <h2>{headerText}</h2>

        <div className="cards-container">
          <HomeCardEstablishment
            establishment="Chi Fu"
            category="Japônes"
            image="https://s3-alpha-sig.figma.com/img/5d49/b6c9/4e6257b800024f536d54dd4473938b82?Expires=1697414400&Signature=fGjwfwYKy5qZDp5DbKwJixnaobw7x2a6~78pk0IHUPrCjzsH053w76kVr0nLsv1mNRANnJu9xO71Z12-CTPwuOfoGZun048B9Rs7UNEyco2z2DT0t5a4wWyyDBBp39y0oZFsnU~7j3RA5Q67UNlzYNNsvzTf~dpoiz4w7Xw0SQA807lNurqUq3O21FS95W8Z05U57Xpf6Xs-sxYF2Q0x-mbfkB0z1KHFRj-ZVv~ZdQqGR36YcKY7fNqb94kDhFjmkG7~QvehKnnNdWIRKjRAOeHbgrFo~6785w9bagX3nxcrqBlXzFYHXn-OmJbPSORNEJQN80MscItwsKmdclRSkA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            rattingNumber={4.6}
          />

          <HomeCardEstablishment
            establishment="Chi Fu"
            category="Japônes"
            image="https://s3-alpha-sig.figma.com/img/5d49/b6c9/4e6257b800024f536d54dd4473938b82?Expires=1697414400&Signature=fGjwfwYKy5qZDp5DbKwJixnaobw7x2a6~78pk0IHUPrCjzsH053w76kVr0nLsv1mNRANnJu9xO71Z12-CTPwuOfoGZun048B9Rs7UNEyco2z2DT0t5a4wWyyDBBp39y0oZFsnU~7j3RA5Q67UNlzYNNsvzTf~dpoiz4w7Xw0SQA807lNurqUq3O21FS95W8Z05U57Xpf6Xs-sxYF2Q0x-mbfkB0z1KHFRj-ZVv~ZdQqGR36YcKY7fNqb94kDhFjmkG7~QvehKnnNdWIRKjRAOeHbgrFo~6785w9bagX3nxcrqBlXzFYHXn-OmJbPSORNEJQN80MscItwsKmdclRSkA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            rattingNumber={4.6}
          />
          <HomeCardEstablishment
            establishment="Chi Fu"
            category="Japônes"
            image="https://s3-alpha-sig.figma.com/img/5d49/b6c9/4e6257b800024f536d54dd4473938b82?Expires=1697414400&Signature=fGjwfwYKy5qZDp5DbKwJixnaobw7x2a6~78pk0IHUPrCjzsH053w76kVr0nLsv1mNRANnJu9xO71Z12-CTPwuOfoGZun048B9Rs7UNEyco2z2DT0t5a4wWyyDBBp39y0oZFsnU~7j3RA5Q67UNlzYNNsvzTf~dpoiz4w7Xw0SQA807lNurqUq3O21FS95W8Z05U57Xpf6Xs-sxYF2Q0x-mbfkB0z1KHFRj-ZVv~ZdQqGR36YcKY7fNqb94kDhFjmkG7~QvehKnnNdWIRKjRAOeHbgrFo~6785w9bagX3nxcrqBlXzFYHXn-OmJbPSORNEJQN80MscItwsKmdclRSkA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            rattingNumber={4.6}
          />

          <HomeCardEstablishment
            establishment="Chi Fu"
            category="Japônes"
            image="https://s3-alpha-sig.figma.com/img/5d49/b6c9/4e6257b800024f536d54dd4473938b82?Expires=1697414400&Signature=fGjwfwYKy5qZDp5DbKwJixnaobw7x2a6~78pk0IHUPrCjzsH053w76kVr0nLsv1mNRANnJu9xO71Z12-CTPwuOfoGZun048B9Rs7UNEyco2z2DT0t5a4wWyyDBBp39y0oZFsnU~7j3RA5Q67UNlzYNNsvzTf~dpoiz4w7Xw0SQA807lNurqUq3O21FS95W8Z05U57Xpf6Xs-sxYF2Q0x-mbfkB0z1KHFRj-ZVv~ZdQqGR36YcKY7fNqb94kDhFjmkG7~QvehKnnNdWIRKjRAOeHbgrFo~6785w9bagX3nxcrqBlXzFYHXn-OmJbPSORNEJQN80MscItwsKmdclRSkA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            rattingNumber={4.6}
          />
        </div>
      </div>
    </div>
  );
};

export default CarrosselEstablishment;
