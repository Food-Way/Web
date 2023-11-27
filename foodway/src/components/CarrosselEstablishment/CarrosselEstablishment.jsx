import HomeCardEstablishment from "../HomeCardEstablishment/HomeCardEstablishment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./CarrosselEstablishment.css";
import { useEffect } from "react";

const CarrosselEstablishment = ({ headerText, establishment }) => {
  useEffect(() => {
    console.log("CarrosselEstablishment");
    console.log(establishment);
  }, [establishment]);

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
          {establishment.map((item) => {
            return (
              <SwiperSlide className="slider-card">
                <HomeCardEstablishment
                  establishment={item.establishmentName}
                  category={item.culinary[0].name}
                  image={item.culinary[0].photo}
                  rattingNumber={item.generalRate}
                />
              </SwiperSlide>
            );
          })}
          {establishment.map((item) => {
            return (
              <SwiperSlide className="slider-card">
                <HomeCardEstablishment
                  establishment={item.establishmentName}
                  category={item.culinary[0].name}
                  image={item.culinary[0].photo}
                  rattingNumber={item.generalRate}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* {establishment.map((item) => {
                category={item.culinary[0].name}
                image={item.profilePhoto}
                rattingNumber={item.generalRate}
          })} */}
      </div>
    </div>
  );
};

export default CarrosselEstablishment;
