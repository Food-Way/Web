import "./NotFound.css";
import NotFoundCat from "../../../public/not-found-cat.png";

const NotFound = () => {
  return (
    <>
      <div className="main">
        <h1>Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <img src={NotFoundCat} alt="Gato triste"/>
      </div>
    </>
  );
};
export default NotFound;
