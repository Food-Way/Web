import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import SignupCostumer from "./pages/Signup/SignupCostumer/SignupCostumer";
import SignupCostumerEstablishment from "./pages/Signup/SignupEstablishment/SignupEstablishment";
import SignIn from "./pages/Signin/SignIn";
import UserProfile from "./pages/UserProfile/UserProfile";
import PerformanceDash from "./pages/PerformanceDash/PerformanceDash";
import SearchUser from "./pages/SearchUser/SearchUser";
import CommentDash from "./pages/CommentDash/CommentDash";
import MenuDash from "./pages/MenuDash/MenuDash";
import Relevance from "./pages/Relevance/Relevance";
import EstablishmentPage from "./pages/EstablishmentPage/EstablishmentPage";
import EstablishmentEditPersonal from "./pages/EstablishmentEditPersonal/EstablishmentEditPersonal";
import CostumerEdit from "./pages/CostumerEdit/CostumerEdit";
import CustomerEditPersonal from "./pages/CustomerEditPersonal/CustomerEditPersonal";
import UserRender from "./components/UserRender/UserRender";
import EstablishmentRender from "./components/EstablishmentRender/EstablishmentRender";
import PerformanceRender from "./components/PerformanceRender/PerformanceRender";
import RoutesDefault from "./components/RoutesDefault/RoutesDefault";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

const Rotas = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-left" />
      <Routes>
        <Route element={<RoutesDefault />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up-customer" element={<SignupCostumer />} />
          <Route path="/sign-up-establishment" element={<SignupCostumerEstablishment />} />
          {/* <Route path="/establishment/info/:id" element={<EstablishmentPage />} /> */}
          {/* <Route path="/establishment-menu/:id" element={<MenuUser />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/search-user" element={<SearchUser />} />
            <Route path="/establishment" element={<EstablishmentRender />}>
              <Route path="info/:id" element={<EstablishmentPage />} />
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
export default Rotas;