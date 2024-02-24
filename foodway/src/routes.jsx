import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
import EstablishmentEditPersonal from "./pages/EstablishmentEditPersonal/EstablishmentEditPersonal";
import MenuUser from "./pages/MenuUser/MenuUser";
import CostumerEdit from "./pages/CostumerEdit/CostumerEdit";
import CustomerEditPersonal from "./pages/CustomerEditPersonal/CustomerEditPersonal";
import UserRender from "./components/UserRender/UserRender";
import EstablishmentRender from "./components/EstablishmentRender/EstablishmentRender";
import PerformanceRender from "./components/PerformanceRender/PerformanceRender";
import RoutesDefault from "./components/RoutesDefault/RoutesDefault";

const Rotas = () => {
  return (

    // <BrowserRouter>
    // { sessionStorage.getItem("token") && 
    // window.location.pathname.startsWith("/user-profile") || 
    // window.location.pathname.startsWith("/establishment/performance/menu") || 
    // window.location.pathname == "/establishment/performance/relevance" || 
    // window.location.pathname.startsWith("/establishment/performance/comments") || 
    // window.location.pathname == "/search-user" || 
    // window.location.pathname == "/establishment-edit" || 
    // window.location.pathname == "/user-profile-edit" || 
    // window.location.pathname.startsWith("/establishment/performance/insights") || 
    // window.location.pathname.startsWith("/establishment-menu/:id") || 
    // window.location.pathname.startsWith("/establishment/info/:id") || 
    // window.location.pathname == "/establishment" ?  <HeaderGeneral /> : "" }

    // { 
    // // Valida se tem algo no token e mostra o menu geral (atribuindo seus valores de width e heigth), caso não tiver coloca o header geral
    // sessionStorage.getItem("token") && 
    // window.location.pathname != "/" && 
    // window.location.pathname != "/sign-in" && 
    // window.location.pathname != "/sign-up" && 
    // window.location.pathname != "/sign-up-costumer" && 
    // window.location.pathname != "/sign-up-establishment" ? 
    // <MenuEstablishment height={`
    // ${window.location.pathname.startsWith("/establishment/performance/menu") || 
    // window.location.pathname == "/establishment/performance/relevance" || 
    // window.location.pathname == "/establishment-edit" || 
    // window.location.pathname == "/user-profile-edit" || 
    // window.location.pathname.startsWith("/establishment/performance/comments") ||  
    // window.location.pathname.startsWith("/search-user") || 
    // window.location.pathname.startsWith("/establishment/performance/insights") || 
    // window.location.pathname.startsWith("/establishment-menu/:id") ? "88.8rem" : "170rem"}`} /> : <HeaderGeneral />}

    //   <ToastContainer position="top-left" />
    //   <Routes>
    //     {/* Não logado */}
    //     <Route Component={Home} path="/" />
    //     <Route path="/about" />
    //     <Route Component={Signup} path="/sign-up" />
    //     <Route Component={SignIn} path="/sign-in" />
    //     <Route Component={SignupCostumer} path="/sign-up-costumer" />
    //     <Route
    //       Component={SignupCostumerEstablishment}
    //       path="/sign-up-establishment"
    //     />
    //     <Route Component={UserProfile} path="/user-profile/:id" />

    //     <Route path="/establishment-menu/:id" Component={MenuUser} />

    //     <Route path="/profile" />

    //     <Route path="/establishment" />
    //     <Route
    //       path="/establishment-edit"
    //       Component={EstablismentEditPersonal}
    //     />

    //     <Route
    //       path="/customer-edit-personal-info"
    //       Component={CustomerEditPersonal}
    //     />

    //     {/* Não logado */}
    //     {/* Logados */}
    //     <Route Component={CostumerEdit} path="/user-profile-edit" />

    //     <Route path="/profile" />

    //     <Route path="/establishment/performance" />
    //     <Route
    //       Component={CommentDash}
    //       path="/establishment/performance/comments/:id"
    //     />
    //     <Route Component={MenuDash} path="/establishment/performance/menu/:id" />

    //     <Route Component={EstablishmentPage} path="/establishment/info/:id" />
    //     <Route Component={PerformanceDash} path="/establishment/performance/insights/:id" />
    //     <Route Component={SearchUser} path="/search-user" />
    //     <Route
    //       Component={Relevance}
    //       path="/establishment/performance/relevance"
    //     />
    //     <Route Component={NotFound} path="*" />
    //   </Routes>
    // </BrowserRouter>

    <BrowserRouter>
      <ToastContainer position="top-left" />
      <Routes>
        <Route element={<RoutesDefault />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up-customer" element={<SignupCostumer />} />
          <Route path="/sign-up-establishment" element={<SignupCostumerEstablishment />} />
          <Route path="/establishment/info/:id" element={<EstablishmentPage />} />
          <Route path="/establishment-menu/:id" element={<MenuUser />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/search-user" element={<SearchUser />} />
            <Route path="/establishment" element={<EstablishmentRender />}>
              <Route path="edit" element={<EstablishmentEditPersonal />} />
              <Route path="performance" element={<PerformanceRender />} >
                <Route path="comments/:id" element={<CommentDash />} />
                <Route path="menu/:id" element={<MenuDash />} />
                <Route path="insights/:id" element={<PerformanceDash />} />
                <Route path="relevance" element={<Relevance />} />
              </Route>
            </Route>
            <Route path="/user" element={<UserRender />}>
              <Route path="profile/:id" element={<UserProfile />} />
              <Route path="edit-personal" element={<CustomerEditPersonal />} />
              <Route path="profile-edit" element={<CostumerEdit />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  );
};

function ProtectedRoutes() {
  const isAuthenticated = sessionStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <SignIn />;
}

export default Rotas;
