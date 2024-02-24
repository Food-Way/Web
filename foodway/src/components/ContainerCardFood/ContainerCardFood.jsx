import CardTypeFood from "../CardTypeFood/CardTypeFood";
import "./ContainerCardFood.css";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import api from "../../services/api";
import { SmsOutlined } from "@material-ui/icons";

import ContentLoader from "react-content-loader";

const ContainerCardFood = ({ categories }) => {



  const [tamanhoDoElemento, setTamanhoDoElemento] = useState(0);

  const calcularSlidesPorVisualizacao = (tamanhoDoElemento) => {
    if (tamanhoDoElemento > 1300) {
      return 6;
    } else if (tamanhoDoElemento <= 1300 && tamanhoDoElemento >= 800) {
      return 3;
    } else if (tamanhoDoElemento <= 800) {
      return 2;
    }
  };

  const slidesPorVisualizacao = calcularSlidesPorVisualizacao(tamanhoDoElemento);

  useEffect(() => {
    const calcularTamanhoDoElemento = () => {
      const elementoAlvo = document.getElementById("carrosselId");
      if (elementoAlvo) {
        const tamanho = elementoAlvo.getBoundingClientRect().width;
        setTamanhoDoElemento(tamanho);
      }
    };

    calcularTamanhoDoElemento();
    window.addEventListener("resize", calcularTamanhoDoElemento);

    return () => {
      window.removeEventListener("resize", calcularTamanhoDoElemento);
    };
  }, []);

  return (
    <>
      <div className="carrossel-typefood">
       
          <Swiper
            className="carrossel-container-typefood"
            id="carrosselId"
            loop={true}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={5}
            slidesPerView={slidesPorVisualizacao}
            navigation
          >
            {categories.map((item) => (
              <SwiperSlide key={item.id}>
                <CardTypeFood typeFood={item.name} image={item.photo} />
              </SwiperSlide>
            ))}
          </Swiper>
       
      </div>
    </>
  );
};

export default ContainerCardFood;