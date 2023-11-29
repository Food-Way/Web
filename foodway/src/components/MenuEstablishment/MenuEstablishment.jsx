import { useState, React, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import {
  faUser,
  faMagnifyingGlass,
  faStore,
  faUserLarge,
  faArrowRightFromBracket,
  faChartSimple,
  faComments,
  faRankingStar,
  faBookOpen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../pages/UserProfile/UserProfile";
import DoneIcon from "@material-ui/icons/Done";
import { toast } from "react-toastify";
import "./MenuEstablishment.css";

const MenuEstablishment = (props) => {
  const navigate = useNavigate();
  const [oldPath, setOldPath] = useState("");
  const [openMenu, setOpenMenu] = useState(true);

  const [establishment, setEstablishment] = useState([
    { id: 1, nome: "Restaurante Italiano" },
    { id: 2, nome: "Churrascaria" },
    { id: 3, nome: "Comida Mexicana" },
    { id: 4, nome: "Sushi Bar" },
    { id: 5, nome: "Cafeteria" },
    { id: 6, nome: "Pizzaria" },
    { id: 7, nome: "Restaurante Vegetariano" },
    { id: 8, nome: "Comida Indiana" },
    { id: 9, nome: "Restaurante de Frutos do Mar" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, nome: "Alice" },
    { id: 2, nome: "Bob" },
    { id: 3, nome: "Charlie" },
    { id: 4, nome: "David" },
    { id: 5, nome: "Eva" },
  ]);

  const typeUser = sessionStorage.getItem("typeUser");

  const handleLogoff = () => {
    sessionStorage.clear();
    toast.success("Logout realizado com sucesso!");
    setTimeout(() => {
      navigate("/");
      location.reload();
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
    var establishment = document.querySelector(".establishment-item");
    var users = document.querySelector(".users-item");
    var out = document.querySelector(".out-item");

    if (oldPath != className) {
      setColor(className);
      setOldPath(className);

      if (
        profile.classList.contains("item-active") &&
        className != ".profile-item"
      ) {
        profile.classList.remove("item-active");
      }

      if (
        search.classList.contains("item-active") &&
        className != ".search-item"
      ) {
        search.classList.remove("item-active");
      }

      if (
        establishment.classList.contains("item-active") &&
        className != ".establishment-item"
      ) {
        establishment.classList.remove("item-active");
      }

      if (
        users.classList.contains("item-active") &&
        className != ".users-item"
      ) {
        users.classList.remove("item-active");
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
      navigate(`/user-profile/${atob(sessionStorage.getItem("idUser"))}`);
    } else if (className == ".users-item") {
      navigate("/users");
    } else if(className == ".search-item") {
      navigate("/search-user");
    } else if (className == ".out-item") {
      handleLogoff();
    }
    return className;
  }

  function setColor(className) {
    var item = document.querySelector(className);
    item.classList.toggle("item-active");
  }

  return (
    <>
      <button
        className="btn-menu-switch"
        onClick={(event) => {
          console.log("clicou");
          setOpenMenu(!openMenu);
          var btnImage = event.currentTarget;
          var btn = document.querySelector(".btn-menu-switch");
          var headerContainer = document.querySelector(".container-header");

          if (location.pathname.startsWith("/user-profile")) {
            var profileContainer = document.querySelector(".profile-container");
            profileContainer.classList.toggle("profile-container-switch");
          }

          if (location.pathname.startsWith("/search-user")) {
            var profileContainer = document.querySelector(".search-user-container");
            profileContainer.classList.toggle("search-user-container-switch");
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
            <span className="profile-item">Perfil</span>
          </MenuItem>

          {/* Utilizar parseJWT */}
          {typeUser === "ESTABLISHMENT " ? (
            <>
              <MenuItem icon={<FontAwesomeIcon icon={faChartSimple} size="lg" />}>
                {" "}
                Desempenho{" "}
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faBookOpen} size="lg" />}>
                {" "}
                Cardápio{" "}
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faComments} size="lg" />}>
                {" "}
                Comentários{" "}
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faRankingStar} size="lg" />}>
                {" "}
                Relevância{" "}
              </MenuItem>
            </>
          ) : (
            <>
              <SubMenu
                icon={
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="lg"
                    className="search-item"
                  />
                }
                label={"Busca"}
                onClick={() => {
                  setNavigate(".search-item");
                }}
              >
              </SubMenu>
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
          {sessionStorage.getItem("token") !== null ? (
            <MenuItem
              className="out-item"
              icon={<FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />}
              onClick={() => {
                setNavigate(".out-item");
              }}
            >
              {" "}
              Sair{" "}
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
  );
};

export default MenuEstablishment;
