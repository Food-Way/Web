import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import HeaderGeneral from "./components/Header/HeaderGeneral";
import Footer from "./components/Footer/Footer";

const Rotas = () => {
  return (
    <BrowserRouter>
      <HeaderGeneral />
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Signin} path="/sign-in" />
        <Route path="/about" />
        <Route path="/sign-up-costumer" />
        <Route path="/sign-up-establishment" />
        <Route path="/perfil" />
        <Route path="/establishment" />
        <Route path="/menu" />
        <Route path="/establishment/menu/edit" />
        <Route path="/establishment/performance" />
        <Route Component={NotFound} path="*" />
      </Routes>
      <Footer />
      ''
    </BrowserRouter>
  );
};
export default Rotas;
