import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import HeaderGeneral from "./components/Header/HeaderGeneral";
import Footer from "./components/Footer/Footer";
import SignupCostumer from "./pages/Signup/SignupCostumer/SignupCostumer";
import SignIn from "./pages/Signin/SignIn";

const Rotas = () => {
  return (
    <BrowserRouter>
      <HeaderGeneral />
      <Routes>
        <Route Component={Home} path="/" />

        <Route path="/about" />
        <Route Component={Signup} path="/sign-up" />
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/sign-up-costumer" Component={SignupCostumer} />
        <Route path="/sign-up-establishment" />
        <Route path="/perfil" />
        <Route path="/establishment" />
        <Route path="/menu" />
        <Route path="/establishment/menu/edit" />
        <Route path="/establishment/performance" />
        <Route Component={NotFound} path="*" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default Rotas;
