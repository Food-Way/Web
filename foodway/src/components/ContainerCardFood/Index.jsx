import ar from "../../assets/img/cardHome/ar.png";
import br from "../../assets/img/cardHome/br.png";
import it from "../../assets/img/cardHome/it.png";
import jp from "../../assets/img/cardHome/jp.png";
import mx from "../../assets/img/cardHome/mx.png";
import "./style.css";
import CardTypeFood from "../CardTypeFood/Index";
import { useRef, useState, useEffect } from "react";

const ContainerCardFood = () => {
  const containerCardsRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Inicialize a posição de rolagem no meio do tamanho do componente
    if (containerCardsRef.current) {
      const containerWidth = containerCardsRef.current.offsetWidth;
      const scrollWidth = containerCardsRef.current.scrollWidth;
      const initialScroll = (scrollWidth - containerWidth) / 2;
      containerCardsRef.current.scrollLeft = initialScroll;
      setScrollLeft(initialScroll);
    }
  }, []);

  const rolarParaEsquerda = () => {
    // Torna a rolagem mais suave
    const novaPosicao = scrollLeft - 600; // Ajuste a quantidade de rolagem
    if (containerCardsRef.current) {
      containerCardsRef.current.scrollTo({
        left: novaPosicao,
        behavior: "smooth", // Adiciona uma animação suave
      });
      setScrollLeft(novaPosicao);
    }
  };

  const rolarParaDireita = () => {
    // Torna a rolagem mais suave
    const novaPosicao = scrollLeft + 600; // Ajuste a quantidade de rolagem
    if (containerCardsRef.current) {
      containerCardsRef.current.scrollTo({
        left: novaPosicao,
        behavior: "smooth", // Adiciona uma animação suave
      });
      setScrollLeft(novaPosicao);
    }
  };

  return (
    <>
      <div className="container-scroll">
        <button onClick={rolarParaEsquerda}>&lt;</button>

        <div
          id="containerCards"
          className="container-cards"
          ref={containerCardsRef}
        >
          <CardTypeFood typeFood="Hamburguer" image={ar} />
          <CardTypeFood typeFood="Pizza" image={br} />
          <CardTypeFood typeFood="Japonesa" image={it} />
          <CardTypeFood typeFood="Mexicana" image={jp} />
          <CardTypeFood typeFood="Árabe" image={mx} />
          <CardTypeFood typeFood="Hamburguer" image={ar} />
          <CardTypeFood typeFood="Pizza" image={br} />
          <CardTypeFood typeFood="Japonesa" image={it} />
          <CardTypeFood typeFood="Mexicana" image={jp} />
          <CardTypeFood typeFood="Árabe" image={mx} />
          <CardTypeFood typeFood="Hamburguer" image={ar} />
          <CardTypeFood typeFood="Pizza" image={br} />
          <CardTypeFood typeFood="Japonesa" image={it} />
          <CardTypeFood typeFood="Mexicana" image={jp} />
          <CardTypeFood typeFood="Árabe" image={mx} />
        </div>
        <button onClick={rolarParaDireita}> &gt; </button>
      </div>
    </>
  );
};

export default ContainerCardFood;
