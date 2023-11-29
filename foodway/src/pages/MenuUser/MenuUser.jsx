import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuEstablishmentContainer from "../../components/MenuEstablishmentContainer/MenuEstablishmentContainer";

const MenuUser = (props) => {
  const routeParams = useParams();
  const token = atob(sessionStorage.getItem("token"));
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    console.log(routeParams);
  }, [routeParams]);

  return (
    <div className="menu-user-container" >
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
