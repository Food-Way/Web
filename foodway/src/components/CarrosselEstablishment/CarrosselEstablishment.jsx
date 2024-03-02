import HomeCardEstablishment from "../HomeCardEstablishment/HomeCardEstablishment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./CarrosselEstablishment.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const CarrosselEstablishment = ({ headerText, establishment }) => {
  const navigate = useNavigate();
  useEffect(() => {

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
          {establishment.map((item, index) => {
            return (
              <SwiperSlide className="slider-card" key={index}>
                <HomeCardEstablishment
                  establishment={item.establishmentName}
                  category={item.culinary[0].name}
                  image={item.culinary[0].photo}
                  rattingNumber={item.generalRate}
                  onclick={() => {
                    navigate(`/establishment/info/${item.idUser}`);
                  }}
                />
              </SwiperSlide>
            );
          })}
          {establishment.map((item, index) => {
            return (
              <SwiperSlide className="slider-card" key={index}>
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
