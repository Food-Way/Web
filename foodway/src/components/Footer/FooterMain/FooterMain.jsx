import React from "react";
import logoIcon from "../../../assets/img/icons/logo.png";
import insta from "../../../assets/img/icons/insta.svg";
import face from "../../../assets/img/icons/face.svg";
import twitter from "../../../assets/img/icons/twitter.svg";
import github from "../../../assets/img/icons/github.svg";
import "./FooterMain.css";
import { Link } from "react-router-dom";

const FooterMain = () => {
  // Use the Navigate component to navigate to the specified route

  return (
    <>
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
                  <Link className="link" to="/">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/about">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/app">
                    App
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/sign-in">
                    Login
                  </Link>
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
    </>
  );
};

export default FooterMain;
