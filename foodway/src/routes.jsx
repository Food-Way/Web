import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import HeaderGeneral from "./components/Header/HeaderGeneral";
import Footer from "./components/Footer/Footer";
import SignupCostumer from "./pages/Signup/SignupCostumer/SignupCostumer";
import SignupCostumerEstablishment from "./pages/Signup/SignupEstablishment/SignupEstablishment";
import SignIn from "./pages/Signin/SignIn";
import UserProfile from "./pages/UserProfile/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentDash from "./pages/CommentDash/CommentDash";

const Rotas = () => {
  return (
    <BrowserRouter>
      <HeaderGeneral />
      <ToastContainer position="top-left" />
      <Routes>
        <Route Component={Home} path="/" />
        <Route path="/about" />
        <Route Component={Signup} path="/sign-up" />
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/sign-up-costumer" Component={SignupCostumer} />
        <Route
          path="/sign-up-establishment"
          Component={SignupCostumerEstablishment}
        />
        <Route Component={UserProfile} path="/user-profile" />
        <Route path="/profile" />
        <Route path="/establishment" />
        <Route path="/menu" />
        <Route path="/establishment/menu/edit" />
        <Route path="/establishment/performance" />
        <Route Component={CommentDash} path="/establishment/performance/comments" />
        <Route Component={NotFound} path="*" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default Rotas;
