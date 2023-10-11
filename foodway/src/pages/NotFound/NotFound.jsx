import "./NotFound.css";
import Header from "../../components/Header/HeaderGeneral";
import Footer from "../../components/Footer/Footer";
const NotFound = () => {
  return (
    <>
      <Header />
      <div className="main">
        <h1>Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
      </div>
      <Footer />
    </>
  );
};
export default NotFound;
