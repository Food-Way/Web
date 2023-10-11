import ar from "../../assets/img/cardHome/ar.png";
import br from "../../assets/img/cardHome/br.png";
import it from "../../assets/img/cardHome/it.png";
import jp from "../../assets/img/cardHome/jp.png";
import mx from "../../assets/img/cardHome/mx.png";
import "./ContainerCardFood.css";
import CardTypeFood from "../CardTypeFood/CardTypeFood";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ContainerCardFood = () => (
  <>
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
      <SwiperSlide>
        {" "}
        <CardTypeFood typeFood="Hamburguer" image={ar} />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <CardTypeFood typeFood="Pizza" image={br} />
      </SwiperSlide>
      <SwiperSlide>
        <CardTypeFood typeFood="Japonesa" image={it} />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <CardTypeFood typeFood="Mexicana" image={jp} />
      </SwiperSlide>
      <SwiperSlide>
        <CardTypeFood typeFood="Árabe" image={mx} />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <CardTypeFood typeFood="Hamburguer" image={ar} />
      </SwiperSlide>
      <SwiperSlide>
        <CardTypeFood typeFood="Pizza" image={br} />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <CardTypeFood typeFood="Japonesa" image={it} />
      </SwiperSlide>
      <SwiperSlide>
        <CardTypeFood typeFood="Mexicana" image={jp} />
      </SwiperSlide>
      <SwiperSlide>
        <CardTypeFood typeFood="Árabe" image={mx} />
      </SwiperSlide>
      <SwiperSlide>
        <CardTypeFood typeFood="Hamburguer" image={ar} />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <CardTypeFood typeFood="Pizza" image={br} />
      </SwiperSlide>
      <SwiperSlide>
        <CardTypeFood typeFood="Japonesa" image={it} />
      </SwiperSlide>
      <SwiperSlide>
        <CardTypeFood typeFood="Mexicana" image={jp} />
      </SwiperSlide>
      <SwiperSlide>
        <CardTypeFood typeFood="Árabe" image={mx} />
      </SwiperSlide>
    </Swiper>
  </>
);

export default ContainerCardFood;
