import { useState, React, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { faUser, faMagnifyingGlass, faStore, faUserLarge, faArrowRightFromBracket, faChartSimple, faComments, faRankingStar, faBookOpen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import UserProfile from "../../pages/UserProfile/UserProfile";
import DoneIcon from '@material-ui/icons/Done';
import { toast } from "react-toastify";
import './MenuEstablishment.css';

const MenuEstablishment = (props) => {
  const navigate = useNavigate();
  const [oldPath, setOldPath] = useState("");
  const [openMenu, setOpenMenu] = useState(true);
  const [clickLogout, setClickLogout] = useState(false);

  const [establishment, setEstablishment] = useState([
    { "id": 1, "nome": "Restaurante Italiano" },
    { "id": 2, "nome": "Churrascaria" },
    { "id": 3, "nome": "Comida Mexicana" },
    { "id": 4, "nome": "Sushi Bar" },
    { "id": 5, "nome": "Cafeteria" },
    { "id": 6, "nome": "Pizzaria" },
    { "id": 7, "nome": "Restaurante Vegetariano" },
    { "id": 8, "nome": "Comida Indiana" },
    { "id": 9, "nome": "Restaurante de Frutos do Mar" }
  ]);

  const [users, setUsers] = useState([
    { "id": 1, "nome": "Alice" },
    { "id": 2, "nome": "Bob" },
    { "id": 3, "nome": "Charlie" },
    { "id": 4, "nome": "David" },
    { "id": 5, "nome": "Eva" }
  ]);

  const typeUser = sessionStorage.getItem("typeUser");

  const handleLogoff = () => {
    toast.success("Logout realizado com sucesso!");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
      sessionStorage.clear();
      setClickLogout(true);
    }, 2000);
  };

  function setCheck(id) {
    var check = document.getElementById(id);
    if (check.checked) {
      check.checked = false;
    } else {
      check.checked = true;
    }
  }

  function setNavigate(className) {
    className = className || <UserProfile />;

    var profile = document.querySelector(".profile-item");
    var search = document.querySelector(".search-item");
    var performance = document.querySelector(".performance-item");
    var menuReal = document.querySelector(".menuReal-item");
    var comments = document.querySelector(".comments-item");
    var relevance = document.querySelector(".relevance-item");
    var out = document.querySelector(".out-item");

    if (oldPath != className) {
      setColor(className);
      setOldPath(className);

      if (atob(sessionStorage.getItem("typeUser")) == "ESTABLISHMENT") {

        if (performance.classList.contains("item-active") && className != ".performance-item") {
          performance.classList.remove("item-active");
        }

        if (menuReal.classList.contains("item-active") && className != ".menuReal-item") {
          menuReal.classList.remove("item-active");
        }

        if (comments.classList.contains("item-active") && className != ".comments-item") {
          comments.classList.remove("item-active");
        }

        if (relevance.classList.contains("item-active") && className != ".relevance-item") {
          relevance.classList.remove("item-active");
        }
      }

      if (out.classList.contains("item-active") && className != ".out-item") {
        out.classList.remove("item-active");
      }
    }

    console.log(className);
    if (className == "") {
      navigate("/*");

    } else if (className == ".establishment-item") {
      navigate("/establishment/search");

    } else if (className == ".profile-item") {
      if (atob(sessionStorage.getItem("typeUser")) == "ESTABLISHMENT") {
        navigate(`/establishment/info`);
      } else {
        navigate(`/user/profile`);
        window.location.reload();
      }

    } else if (className == ".users-item") {
      navigate("/users");

    } else if (className == ".search-item") {
      navigate("/user/search");
      window.location.reload();
    } else if (className == ".performance-item") {
      navigate(`/establishment/performance/insights`);

    } else if (className == ".menuReal-item") {
      navigate(`/establishment/performance/menu`);

    } else if (className == ".comments-item") {
      navigate(`/establishment/performance/comments`);

    } else if (className == ".relevance-item") {
      navigate("/establishment/performance/relevance");

    } else if (className == ".out-item") {
      handleLogoff();
    }
    return className;
  }

  function setColor(className) {
    var item = document.querySelector(className);
    item.classList.toggle("item-active");
  }


  function pathForNavigationColor() {
    var path = "";

    if (location.pathname.startsWith("/user-profile")) {
      path = ".profile-item";
    }

    if (location.pathname.startsWith("/establishment/info/")) {
      path = ".profile-item";
    }

    if (location.pathname == "/user/search") {
      path = ".search-item";
    }

    if (location.pathname.startsWith("/establishment/performance/insights")) {
      path = ".performance-item";
    }

    if (location.pathname.startsWith("/establishment/performance/menu")) {
      path = ".menuReal-item";
    }

    if (location.pathname.startsWith("/establishment/performance/comments")) {
      path = ".comments-item";
    }

    if (location.pathname == "/establishment/performance/relevance") {
      path = ".relevance-item";
    }

    return path;
  }



  return (
    <>
      {sessionStorage.getItem("token") ? (
        <>
          <button
            className="btn-menu-switch"
            onClick={(event) => {
              console.log("clicou");
              setOpenMenu(!openMenu);
              var btnImage = event.currentTarget;
              var btn = document.querySelector(".btn-menu-switch");
              var headerContainer = document.querySelector(".container-header");


              if (location.pathname.startsWith("/user/search")) {
                var profileContainer = document.querySelector(".search-user-container");
                profileContainer.classList.toggle("search-user-container-switch");
              }

              if (location.pathname.startsWith("/establishment/info")) {
                var profileContainer = document.querySelector(".establishment-content-container");
                profileContainer.classList.toggle("establishment-content-container-switch");
              }

              if (location.pathname.startsWith("/establishment-menu")) {
                var profileContainer = document.querySelector(".menu-user-container");
                profileContainer.classList.toggle("menu-user-container-switch");
              }

              if (location.pathname.endsWith("/comments")) {
                var profileContainer = document.querySelector(".comment-dashboard-container");
                profileContainer.classList.toggle("comment-dashboard-container-switch");

              }

              if (location.pathname.endsWith("/relevance")) {
                var profileContainer = document.querySelector(".relevance-container");
                profileContainer.classList.toggle("relevance-container-switch");
              }

              btnImage.classList.toggle("btn-menu-rotate");
              btn.classList.toggle("btn-menu-animate");
              headerContainer.classList.toggle("container-switch-header");
            }}
          ></button>
          <Sidebar
            collapsed={openMenu}
            rootStyles={{
              [`.${sidebarClasses.container}`]: {
                height: props.height,
                width: openMenu ? "75px" : "17vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "var(--branco)",
                paddingTop: "5rem",
                paddingLeft: openMenu ? "0" : "3rem",
                paddingBottom: "3rem",
                transition: "all 0.3s",
                position: "absolute",
              },
            }}
          >
            <Menu>
              <MenuItem
                icon={<FontAwesomeIcon icon={faUser} size="lg" className="profile-item" />}
                onClick={() => {
                  setNavigate(".profile-item");
                }}
              >
                <span className="profile-item text-item">Perfil</span>
              </MenuItem>

              {atob(typeUser) == "ESTABLISHMENT" ? (
                <>
                  <MenuItem icon={<FontAwesomeIcon icon={faChartSimple} size="lg"
                    className="performance-item"
                  />}
                    onClick={() => {
                      setNavigate(".performance-item");
                    }}>
                    {" "}
                    <span className="performance-item text-item">Desempenho</span>{" "}
                  </MenuItem>
                  <MenuItem icon={<FontAwesomeIcon icon={faBookOpen} size="lg"
                    className="menuReal-item"
                  />}
                    onClick={() => {
                      setNavigate(".menuReal-item");
                    }}>
                    {" "}
                    <span className="menuReal-item text-item">Cardápio{" "}</span>
                  </MenuItem>
                  <MenuItem icon={<FontAwesomeIcon icon={faComments} size="lg"
                    className="comments-item"
                  />}
                    onClick={() => {
                      setNavigate(".comments-item");
                    }}>
                    {" "}
                    <span className="comments-item text-item">Comentários{" "}</span>
                  </MenuItem>
                  <MenuItem icon={<FontAwesomeIcon icon={faRankingStar} size="lg"
                    className="relevance-item"
                  />}
                    onClick={() => {
                      setNavigate(".relevance-item");
                    }}>
                    {" "}
                    <span className="relevance-item text-item">Relevância{" "}</span>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    icon={
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        size="lg"
                        className="search-item"
                      />
                    }
                    onClick={() => {
                      setNavigate(".search-item");
                    }}
                  >
                    <span className="search-item text-item">Busca</span>
                  </MenuItem>
                </>


              )}
              {!clickLogout ? (
                <MenuItem
                  className="out-item"
                  icon={<FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />}
                  onClick={() => {
                    setNavigate(".out-item");
                  }}
                >
                  <span className="out-item text-item">Sair</span>
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
            <div className="box-copyright">
              <span> {openMenu ? "" : "Todos os direitos reservados"} </span>
              <b> {openMenu ? "© 2023" : "FoodWay © 2023"} </b>
            </div>
          </Sidebar>
        </>
      ) : (
        ""
      )
      }
    </>
  );
};

export default MenuEstablishment;