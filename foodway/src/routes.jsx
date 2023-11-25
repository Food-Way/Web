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

const Rotas = () => {
  return (
    <BrowserRouter>
    { sessionStorage.getItem("token") && window.location.pathname == "/user-profile" ||  window.location.pathname == "/establishment/performance/menu" || window.location.pathname == "/establishment/performance/relevance" || window.location.pathname == "/establishment/performance/comments" || window.location.pathname == "/search-user" || window.location.pathname == "/establishment/performance/insights" ?  <HeaderGeneral /> : "" }
    { sessionStorage.getItem("token") && window.location.pathname != "/" && window.location.pathname != "/sign-in" && window.location.pathname != "/sign-up" && window.location.pathname != "/sign-up-costumer" && window.location.pathname != "/sign-up-establishment" ? <MenuEstablishment height={`${location.pathname == "/establishment/performance/menu" || location.pathname == "/establishment/performance/relevance" || location.pathname == "/establishment/performance/comments" ||  window.location.pathname == "/search-user" || window.location.pathname == "/establishment/performance/insights" ? "88.8rem" : "170rem"}`} /> : <HeaderGeneral />}

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

        {/* Logado */}
        <Route Component={UserProfile} path="/user-profile" />
        {/* <Route path="/profile" />
        <Route path="/establishment" />
        <Route path="/menu" />
        <Route path="/establishment/menu/edit" />
        <Route path="/establishment/performance" /> */}
        <Route Component={PerformanceDash} path="/establishment/performance/insights"></Route>
        <Route Component={CommentDash} path="/establishment/performance/comments" />
        <Route Component={MenuDash} path="/establishment/performance/menu" />
        <Route Component={SearchUser} path="/search-user" />
        <Route Component={Relevance} path="/establishment/performance/relevance" />

        {/* Os dois */}
        <Route Component={EstablishmentPage} path="/establishment" />
        <Route Component={NotFound} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
export default Rotas;
