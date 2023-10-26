import CardTypeFood from "../CardTypeFood/CardTypeFood";
import "./ContainerCardFood.css";
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
      </div>
    </>
  );
};

export default ContainerCardFood;
