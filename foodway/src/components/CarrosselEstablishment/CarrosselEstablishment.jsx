import HomeCardEstablishment from "../HomeCardEstablishment/HomeCardEstablishment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./CarrosselEstablishment.css";

const CarrosselEstablishment = ({ headerText }) => {
  return (
    <div className="carrossel-establishment-container">
      <div className="carrossel-establishment">
        <h2>{headerText}</h2>

        <Swiper
          loop={true}
          className="cards-container"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={4}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Chi Fu"
              category="Japônes"
              image="https://www.construtoradubai.com.br/wp-content/uploads/2021/05/restaurante-japones-em-osasco-os-7-melhores.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Ratatui"
              category="Italiana"
              image="https://media-cdn.tripadvisor.com/media/photo-s/0c/16/aa/0c/restaurante-famiglia.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Fogo de chão"
              category="Brasileira"
              image="https://blog.originalmiles.com.br/wp-content/uploads/2014/01/santinho-700x525.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Chi Fu"
              category="Chinesa"
              image="https://s3-alpha-sig.figma.com/img/5d49/b6c9/4e6257b800024f536d54dd4473938b82?Expires=1697414400&Signature=fGjwfwYKy5qZDp5DbKwJixnaobw7x2a6~78pk0IHUPrCjzsH053w76kVr0nLsv1mNRANnJu9xO71Z12-CTPwuOfoGZun048B9Rs7UNEyco2z2DT0t5a4wWyyDBBp39y0oZFsnU~7j3RA5Q67UNlzYNNsvzTf~dpoiz4w7Xw0SQA807lNurqUq3O21FS95W8Z05U57Xpf6Xs-sxYF2Q0x-mbfkB0z1KHFRj-ZVv~ZdQqGR36YcKY7fNqb94kDhFjmkG7~QvehKnnNdWIRKjRAOeHbgrFo~6785w9bagX3nxcrqBlXzFYHXn-OmJbPSORNEJQN80MscItwsKmdclRSkA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Chi Fu"
              category="Japônes"
              image="https://www.construtoradubai.com.br/wp-content/uploads/2021/05/restaurante-japones-em-osasco-os-7-melhores.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Ratatui"
              category="Italiana"
              image="https://media-cdn.tripadvisor.com/media/photo-s/0c/16/aa/0c/restaurante-famiglia.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Fogo de chão"
              category="Brasileira"
              image="https://blog.originalmiles.com.br/wp-content/uploads/2014/01/santinho-700x525.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Chi Fu"
              category="Chinesa"
              image="https://s3-alpha-sig.figma.com/img/5d49/b6c9/4e6257b800024f536d54dd4473938b82?Expires=1697414400&Signature=fGjwfwYKy5qZDp5DbKwJixnaobw7x2a6~78pk0IHUPrCjzsH053w76kVr0nLsv1mNRANnJu9xO71Z12-CTPwuOfoGZun048B9Rs7UNEyco2z2DT0t5a4wWyyDBBp39y0oZFsnU~7j3RA5Q67UNlzYNNsvzTf~dpoiz4w7Xw0SQA807lNurqUq3O21FS95W8Z05U57Xpf6Xs-sxYF2Q0x-mbfkB0z1KHFRj-ZVv~ZdQqGR36YcKY7fNqb94kDhFjmkG7~QvehKnnNdWIRKjRAOeHbgrFo~6785w9bagX3nxcrqBlXzFYHXn-OmJbPSORNEJQN80MscItwsKmdclRSkA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Chi Fu"
              category="Japônes"
              image="https://www.construtoradubai.com.br/wp-content/uploads/2021/05/restaurante-japones-em-osasco-os-7-melhores.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Ratatui"
              category="Italiana"
              image="https://media-cdn.tripadvisor.com/media/photo-s/0c/16/aa/0c/restaurante-famiglia.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Fogo de chão"
              category="Brasileira"
              image="https://blog.originalmiles.com.br/wp-content/uploads/2014/01/santinho-700x525.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
          <SwiperSlide className="slider-card">
            <HomeCardEstablishment
              establishment="Chi Fu"
              category="Chinesa"
              image="https://s3-alpha-sig.figma.com/img/5d49/b6c9/4e6257b800024f536d54dd4473938b82?Expires=1697414400&Signature=fGjwfwYKy5qZDp5DbKwJixnaobw7x2a6~78pk0IHUPrCjzsH053w76kVr0nLsv1mNRANnJu9xO71Z12-CTPwuOfoGZun048B9Rs7UNEyco2z2DT0t5a4wWyyDBBp39y0oZFsnU~7j3RA5Q67UNlzYNNsvzTf~dpoiz4w7Xw0SQA807lNurqUq3O21FS95W8Z05U57Xpf6Xs-sxYF2Q0x-mbfkB0z1KHFRj-ZVv~ZdQqGR36YcKY7fNqb94kDhFjmkG7~QvehKnnNdWIRKjRAOeHbgrFo~6785w9bagX3nxcrqBlXzFYHXn-OmJbPSORNEJQN80MscItwsKmdclRSkA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              rattingNumber={4.6}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CarrosselEstablishment;
