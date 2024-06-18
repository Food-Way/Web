import React from "react";
import "./FooterMain.css";
import { Link } from "react-router-dom";

const FooterMain = () => {
  const logoIcon = "https://foodway.s3.amazonaws.com/public-images/logo.png";
  const insta = "https://foodway.s3.amazonaws.com/public-images/insta.svg";
  const face = "https://foodway.s3.amazonaws.com/public-images/face.svg";
  const twitter = "https://foodway.s3.amazonaws.com/public-images/twitter.svg";
  const github = "https://foodway.s3.amazonaws.com/public-images/github.svg";
  return (
    <>
      <div className="container-footer">
        <div className="footer">
          <div className="category-establishment">
            <h2>Restaurantes</h2>
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
            <img src={logoIcon} alt="Logo Foodway" />
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
                <img src={insta} className="socialIcon" alt="Logo instagram" />
              </li>
              <li>
                <img src={face} className="socialIcon" alt="Logo facebook" />
              </li>
              <li>
                <img src={twitter} className="socialIcon" alt="Logo twitter" />
              </li>
              <li>
                <img src={github} className="socialIcon" alt="Logo github" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterMain;
