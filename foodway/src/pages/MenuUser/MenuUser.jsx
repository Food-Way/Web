import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Menu } from "react-pro-sidebar";
import MenuEstablishmentContainer from "../../components/MenuEstablishmentContainer/MenuEstablishmentContainer";

const MenuUser = (props) => {
  const routeParams = useParams();
  const token = atob(sessionStorage.getItem("token"));
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    console.log(routeParams);
  }, [routeParams]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <MenuEstablishmentContainer
        menu={menu}
        setMenu={setMenu}
        id={routeParams.id}
        token={token}
      />
    </div>
  );
};
export default MenuUser;
