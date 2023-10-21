import "./ContainerCardFood.css";
import CardTypeFood from "../CardTypeFood/CardTypeFood";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ContainerCardFood = () => {
  const ar = "https://foodway.blob.core.windows.net/public/ar.png";
  const br = "https://foodway.blob.core.windows.net/public/br.png";
  const it = "https://foodway.blob.core.windows.net/public/it.png";
  const jp = "https://foodway.blob.core.windows.net/public/jp.png";
  const mx = "https://foodway.blob.core.windows.net/public/mx.png";

  return (
    <>
      <Swiper
        loop={true}
        className="cards-container"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
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
};

export default ContainerCardFood;
