import { useEffect, useState } from "react";
import MenuEstablishmentContainer from "../../components/MenuEstablishmentPage/MenuEstablishmentPage";
import { useParams } from "react-router-dom";

const MenuUser = (props) => {
  const [menu, setMenu] = useState([]);
  const params = useParams();
  const idUser = params.id;

  useEffect(() => {
    console.log(idUser);
  }, [idUser]);

  return (
    <div className="menu-user-container" >
      <MenuEstablishmentContainer
        menu={menu}
        setMenu={setMenu}
        id={idUser}
        token={atob(sessionStorage.getItem("token"))}
      />
    </div>
  );
};
export default MenuUser;
