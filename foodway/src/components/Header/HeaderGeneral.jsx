import LogoFoodWay from "../../assets/img/FoodWayLogo.png";
import SelectCategory from "../SelectCategory/SelectCategory";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./HeaderGeneral.css";

const HeaderGeneral = () => {
  return (
    <header>
      <div className="container">
        <Link className="left" to="/">
          <img src={LogoFoodWay} alt="Logo FoodWay" />
          <h1>FoodWay</h1>
        </Link>

        <div className="centerHeader">
          <SelectCategory />
          <SearchBar defaultMSG="Busque Restaurantes" />
          <SelectCategory />
        </div>
        <nav>
          <ul>
            <li>
              <Link className="linkItem" to={"/"}>
                Inicio
              </Link>
            </li>
            <li>
              <Link className="linkItem" to={"/about"}>
                Sobre
              </Link>
            </li>
            <li>
              <Link className="linkItem" to={"/sign-in"}>
                Login
              </Link>
            </li>
            <li>
              <Link className="linkItem" to={"sign-up"}>
                Cadastro
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderGeneral;
