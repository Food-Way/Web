import CardTypeFood from "../CardTypeFood/CardTypeFood";
import "./ContainerCardFood.css";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import ScrollReveal from 'scrollreveal';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
    const config = {
      delay: 500,
      distance: '50px',
      duration: 500,
      easing: 'ease-in-out',
      origin: 'bottom',
    };

    const elementsToReveal = [
      '.carrossel-typefood'
    ];

    elementsToReveal.forEach((element) => {
      if (element) {
        ScrollReveal().reveal(element, config);
      }
    });
    
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