import { useEffect, useState } from "react";
import parseJWT from "../../util/parseJWT";
import MenuEstablishmentContainer from "../../components/MenuEstablishmentPage/MenuEstablishmentPage";

const MenuUser = (props) => {
  const bodyToken = parseJWT();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    console.log(bodyToken.sub);
  }, [bodyToken.sub]);

  return (
    <div className="menu-user-container" >
      <MenuEstablishmentContainer
        menu={menu}
        setMenu={setMenu}
        id={bodyToken.sub}
        token={atob(sessionStorage.getItem("token"))}
      />
    </div>
  );
};
export default MenuUser;
