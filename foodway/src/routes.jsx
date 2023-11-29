import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import HeaderGeneral from "./components/Header/HeaderGeneral";
import SignupCostumer from "./pages/Signup/SignupCostumer/SignupCostumer";
import SignupCostumerEstablishment from "./pages/Signup/SignupEstablishment/SignupEstablishment";
import SignIn from "./pages/Signin/SignIn";
import UserProfile from "./pages/UserProfile/UserProfile";
import PerformanceDash from "./pages/PerformanceDash/PerformanceDash";
import SearchUser from "./pages/SearchUser/SearchUser";
import CommentDash from "./pages/CommentDash/CommentDash";
import MenuDash from "./pages/MenuDash/MenuDash";
import MenuEstablishment from "./components/MenuEstablishment/MenuEstablishment";
import Relevance from "./pages/Relevance/Relevance";
import EstablishmentPage from "./pages/EstablishmentPage/EstablishmentPage";
import EstablismentEditPersonal from "./pages/EstablismentEditPersonal/EstablismentEditPersonal";
import MenuUser from "./pages/MenuUser/MenuUser";
import CostumerEdit from "./pages/CostumerEdit/CostumerEdit";
import CustomerEditPersonal from "./pages/CustomerEditPersonal/CustomerEditPersonal";

const Rotas = () => {
  const token = sessionStorage.getItem("token");

  return (
    <BrowserRouter>
    { sessionStorage.getItem("token") && 
    window.location.pathname.startsWith("/user-profile") || 
    window.location.pathname.startsWith("/establishment/performance/menu") || 
    window.location.pathname == "/establishment/performance/relevance" || 
    window.location.pathname == "/establishment/performance/comments" || 
    window.location.pathname == "/search-user" || 
    window.location.pathname == "/establishment-edit" || 
    window.location.pathname == "/user-profile-edit" || 
    window.location.pathname.startsWith("/establishment/performance/insights") || 
    window.location.pathname.startsWith("/establishment-menu/:id") || 
    window.location.pathname.startsWith("/establishment/info") || 
    window.location.pathname == "/establishment" ?  <HeaderGeneral /> : "" }

    { sessionStorage.getItem("token") && 
    window.location.pathname != "/" && 
    window.location.pathname != "/sign-in" && 
    window.location.pathname != "/sign-up" && 
    window.location.pathname != "/sign-up-costumer" && 
    window.location.pathname != "/sign-up-establishment" ? <MenuEstablishment height={`
    ${window.location.pathname.startsWith("/establishment/performance/menu") || 
    window.location.pathname == "/establishment/performance/relevance" || 
    window.location.pathname == "/establishment-edit" || 
    window.location.pathname == "/user-profile-edit" || 
    window.location.pathname == "/establishment/performance/comments" ||  
    window.location.pathname.startsWith("/search-user") || 
    window.location.pathname.startsWith("/establishment/performance/insights") || 
    window.location.pathname.startsWith("/establishment-menu/:id") || 
    window.location.pathname.startsWith("/establishment/info") ? "88.8rem" : "170rem"}`} /> : <HeaderGeneral />}

      <ToastContainer position="top-left" />
      <Routes>
        {/* Não logado */}
        <Route Component={Home} path="/" />
        <Route path="/about" />
        <Route Component={Signup} path="/sign-up" />
        <Route Component={SignIn} path="/sign-in" />
        <Route Component={SignupCostumer} path="/sign-up-costumer" />
        <Route
          Component={SignupCostumerEstablishment}
          path="/sign-up-establishment"
        />
        <Route Component={UserProfile} path="/user-profile/:id" />

        <Route path="/establishment-menu/:id" Component={MenuUser} />

        <Route path="/profile" />

        <Route path="/establishment" />
        <Route
          path="/establishment-edit"
          Component={EstablismentEditPersonal}
        />

        <Route
          path="/customer-edit-personal-info"
          Component={CustomerEditPersonal}
        />

        {/* Não logado */}
        {/* Logados */}
        <Route Component={CostumerEdit} path="/user-profile-edit" />

        <Route path="/profile" />

        <Route path="/establishment/performance" />
        <Route
          Component={CommentDash}
          path="/establishment/performance/comments"
        />
        <Route Component={MenuDash} path="/establishment/performance/menu" />

        <Route Component={EstablishmentPage} path="/establishment/info/:id" />
        <Route Component={PerformanceDash} path="/establishment/performance/insights" />
        <Route Component={SearchUser} path="/search-user" />
        <Route
          Component={Relevance}
          path="/establishment/performance/relevance"
        />
        <Route Component={NotFound} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
export default Rotas;
