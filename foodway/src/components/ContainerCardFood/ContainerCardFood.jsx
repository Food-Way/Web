import CardTypeFood from "../CardTypeFood/CardTypeFood";
import "./ContainerCardFood.css";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ContainerCardFood = (props) => {

  const [tamanhoDoElemento, setTamanhoDoElemento] = useState(0);

  const calcularSlidesPorVisualizacao = (tamanhoDoElemento) => {
    if (tamanhoDoElemento > 1300) {
      // Telas muito grandes (1201px e acima)
      return 6; // Número de slides para telas muito grandes
    } else if (tamanhoDoElemento <= 1300 && tamanhoDoElemento >= 800) {
      return 3;
    } else if (tamanhoDoElemento <= 800) {
      return 2;
    }
  };
  const slidesPorVisualizacao =
    calcularSlidesPorVisualizacao(tamanhoDoElemento);

  useEffect(() => {
    console.log(props)
    // Função para calcular o tamanho do elemento
    const calcularTamanhoDoElemento = () => {
      const elementoAlvo = document.getElementById("carrosselId");

      if (elementoAlvo) {
        const tamanho = elementoAlvo.getBoundingClientRect().width; // Substitua "width" pela propriedade desejada (e.g., "height")

        setTamanhoDoElemento(tamanho);
      }
    };

    // Chama a função inicialmente
    calcularTamanhoDoElemento();

    // Adiciona um ouvinte de redimensionamento da janela para atualizar o tamanho quando a janela for redimensionada
    window.addEventListener("resize", calcularTamanhoDoElemento);

    return () => {
      // Remove o ouvinte de redimensionamento ao desmontar o componente
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
          <SwiperSlide>
            <CardTypeFood typeFood={props.typeFood} image={props.image} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default ContainerCardFood;
