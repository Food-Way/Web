import logoIcon from "../../assets/img/icons/logo.png";
import insta from "../../assets/img/icons/insta.svg";
import face from "../../assets/img/icons/face.svg";
import twitter from "../../assets/img/icons/twitter.svg";
import github from "../../assets/img/icons/github.svg";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="container-footer">
      <div className="footer">
        <div className="category-establishment">
          <h2>Restaurante</h2>
          <ul>
            <li>Árabe</li>
            <li>Brasileiro</li>
            <li>Italiano</li>
            <li>Japônes</li>
            <li>Mexicano</li>
            <li>Tailandês</li>
          </ul>
        </div>
        <div className="centerIcon">
          <img src={logoIcon} alt="logo" />
          <div className="sub-footer">
            <ul>
              <li>
                <a href="">Início</a>
              </li>

              <li>
                <a href="">Sobre</a>
              </li>

              <li>
                <a href="">App</a>
              </li>

              <li>
                <a href="">Login</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="list-social-media">
          <ul>
            <li>
              <img src={insta} className="socialIcon" alt="instagram" />
            </li>
            <li>
              <img src={face} className="socialIcon" alt="facebook" />
            </li>
            <li>
              <img src={twitter} className="socialIcon" alt="twitter" />
            </li>
            <li>
              <img src={github} className="socialIcon" alt="github" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
