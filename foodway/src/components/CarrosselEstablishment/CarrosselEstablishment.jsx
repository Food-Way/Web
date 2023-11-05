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
              image="https://www.construtoradubai.com.br/wp-content/uploads/2021/05/restaurante-japones-em-osasco-os-7-melhores.jpg"
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
              image="https://www.construtoradubai.com.br/wp-content/uploads/2021/05/restaurante-japones-em-osasco-os-7-melhores.jpg"
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
              image="https://blog.originalmiles.com.br/wp-content/uploads/2014/01/santinho-700x525.jpg"
              rattingNumber={4.6}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CarrosselEstablishment;
