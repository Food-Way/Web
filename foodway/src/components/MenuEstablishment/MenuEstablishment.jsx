import { useState, React, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { faUser, faMagnifyingGlass, faStore, faUserLarge, faArrowRightFromBracket, faChartSimple, faComments, faRankingStar, faBookOpen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import UserProfile from "../../pages/UserProfile/UserProfile";
import DoneIcon from '@material-ui/icons/Done';
import { toast } from "react-toastify";
import './MenuEstablishment.css';
import parseJWT from "../../util/parseJWT";

const MenuEstablishment = (props) => {
  const bodyToken = parseJWT();
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
    // var establishment = document.querySelector(".establishment-item");
    // var users = document.querySelector(".users-item");
    var performance = document.querySelector(".performance-item");
    var menuReal = document.querySelector(".menuReal-item");
    var comments = document.querySelector(".comments-item");
    var relevance = document.querySelector(".relevance-item");
    var out = document.querySelector(".out-item");

    // console.log("PROFILE: " + profile);
    // console.log("SEARCH: " + search);
    // console.log("ESTABLISHMENT: " + establishment);
    // console.log("USERS: " + users);
    // console.log("PERFORMANCE: " + performance);
    // console.log("MENU REAL: " + menuReal);
    // console.log("COMMENTS: " + comments);
    // console.log("RELEVANCE: " + relevance);
    // console.log("OUT: " + out);

    if (oldPath != className) {
      setColor(className);
      setOldPath(className);
      // console.log("OLD PATH: " + oldPath);
      // console.log("NEW PATH: " + className);

      // if (profile.classList.contains("item-active") && className != ".profile-item") {
      //   profile.classList.remove("item-active");
      // }

      // if (atob(sessionStorage.getItem("typeUser")) !== "ESTABLISHMENT") {
      //   if (search.classList.contains("item-active") && className != ".search-item") {
      //     search.classList.remove("item-active");
      //   }
      // }

      if (atob(sessionStorage.getItem("typeUser")) == "ESTABLISHMENT") {
        // if (establishment.classList.contains("item-active") && className != ".establishment-item") {
        //   establishment.classList.remove("item-active");
        // }

        // if (users.classList.contains("item-active") && className != ".users-item") {
        //   users.classList.remove("item-active");
        // }

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
        navigate(`/establishment/info/${bodyToken.sub}`);
      } else {
        navigate(`/user/profile/${bodyToken.sub}`);
        window.location.reload();
      }

    } else if (className == ".users-item") {
      navigate("/users");

    } else if (className == ".search-item") {
      navigate("/search-user");
      window.location.reload();
    } else if (className == ".performance-item") {
      navigate(`/establishment/performance/insights/${bodyToken.sub}`);

    } else if (className == ".menuReal-item") {
      navigate(`/establishment/performance/menu/${bodyToken.sub}`);

    } else if (className == ".comments-item") {
      navigate(`/establishment/performance/comments/${bodyToken.sub}`);

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

  // function navigateColor(className) {
  //   var profile = document.querySelector(className);

  //   if (oldPath == "") {
  //     setColor(className);
  //     setOldPath(className);
  //     profile.classList.add("item-active");
  //   }
  // }

  function pathForNavigationColor() {
    var path = "";
    
    if (location.pathname.startsWith("/user-profile")) {
      path = ".profile-item"; 
    }
    
    if (location.pathname.startsWith("/establishment/info/")) {
      path = ".profile-item";
    }

    if (location.pathname == "/search-user") {
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

    if (location.pathname == "/establishment/performance/relevance" ) {
      path = ".relevance-item";
    }

    return path;
  }

  useEffect(() => {
    // navigateColor(pathForNavigationColor());
  }, []);

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

              // if (location.pathname.startsWith("/user-profile")) {
              //   if (location.pathname.startsWith("/user-profile-edit")) {
              //     var profileContainer = document.querySelector(".costumer");
              //     profileContainer.classList.toggle("costumer-switch");
              //   } else {
              //     var profileContainer = document.querySelector(".profile-container");
              //     profileContainer.classList.toggle("profile-container-switch");
              //   }
              // }

              if (location.pathname.startsWith("/search-user")) {
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

              // if (location.pathname.startsWith("/establishment/performance") && !location.pathname.endsWith("/comments") && !location.pathname.endsWith("/relevance")) {
              //   if (location.pathname.startsWith("/establishment/performance/menu")) {
              //     var profileContainer = document.querySelector(".menu-dashboard-container");
              //     profileContainer.classList.toggle("menu-dashboard-container-switch");
              //   } else {
              //     var profileContainer = document.querySelector(".performance-dash-container");
              //     profileContainer.classList.toggle("performance-dash-container-switch");
              //   }
              // }

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
                paddingLeft: openMenu ? "0" : "3rem", // Adicione essa linha para definir a margem à esquerda quando a barra lateral estiver expandida
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
                <span className="profile-item item-menu-box">Perfil</span>
              </MenuItem>

              {/* Utilizar parseJWT */}
              {atob(typeUser) == "ESTABLISHMENT" ? (
                <>
                  <MenuItem icon={<FontAwesomeIcon icon={faChartSimple} size="lg"
                    className="performance-item"
                  />}
                    onClick={() => {
                      setNavigate(".performance-item");
                    }}>
                    {" "}
                    <span className="performance-item">Desempenho</span>{" "}
                  </MenuItem>
                  <MenuItem icon={<FontAwesomeIcon icon={faBookOpen} size="lg"
                    className="menuReal-item"
                  />}
                    onClick={() => {
                      setNavigate(".menuReal-item");
                    }}>
                    {" "}
                    <span className="menuReal-item">Cardápio{" "}</span>
                  </MenuItem>
                  <MenuItem icon={<FontAwesomeIcon icon={faComments} size="lg"
                    className="comments-item"
                  />}
                    onClick={() => {
                      setNavigate(".comments-item");
                    }}>
                    {" "}
                    <span className="comments-item">Comentários{" "}</span>
                  </MenuItem>
                  <MenuItem icon={<FontAwesomeIcon icon={faRankingStar} size="lg"
                    className="relevance-item"
                  />}
                    onClick={() => {
                      setNavigate(".relevance-item");
                    }}>
                    {" "}
                    <span className="relevance-item">Relevância{" "}</span>
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
                    <span className="search-item">Busca</span>
                  </MenuItem>
                </>

                //     <SubMenu
                //       icon={
                //         <FontAwesomeIcon
                //           icon={faStore}
                //           size="lg"
                //           className="establishment-item"
                //         />
                //       }
                //       label={"Estabelecimento " + "(" + establishment.length + ")"}
                //       onClick={() => {
                //         setNavigate(".establishment-item");
                //       }}
                //     >
                //       {establishment.map((item) => {
                //         return (
                //           <MenuItem
                //             key={item.id}
                //             onClick={() => setCheck("e" + item.id)}
                //           >
                //             <div className="menu-item">
                //               <div className="pretty p-icon p-round p-smooth check-culinary">
                //                 <input
                //                   type="checkbox"
                //                   onClick={() => setCheck("e" + item.id)}
                //                   id={"e" + item.id}
                //                 />
                //                 <div className="state">
                //                   <DoneIcon className="icon check" />
                //                   <label>{item.nome}</label>
                //                 </div>
                //               </div>
                //             </div>
                //           </MenuItem>
                //         );
                //       })}
                //     </SubMenu>
                //     {sessionStorage.getItem("token") !== null ? (
                //       <MenuItem
                //         className="users-item"
                //         icon={
                //           <FontAwesomeIcon
                //             icon={faUserLarge}
                //             size="lg"
                //             onClick={() => {
                //               setNavigate(".users-item");
                //             }}
                //           />
                //         }
                //       >
                //         <span>Usuários ({users.length})</span>
                //       </MenuItem>
                //     ) : (
                //       ""
                //     )}
                //   </SubMenu>
                // </>
              )}
              {!clickLogout ? (
                <MenuItem
                  className="out-item"
                  icon={<FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />}
                  onClick={() => {
                    setNavigate(".out-item");
                  }}
                >
                  Sair
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