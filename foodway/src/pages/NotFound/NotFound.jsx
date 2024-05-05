import "./NotFound.css";
 

const NotFound = () => {
  const sadCat = "https://foodway.s3.amazonaws.com/public-images/sadCat.png";
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
