import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Index";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/home" />
        <Route path="/sign-in" />
        <Route path="/sign-up-costumer" />
        <Route path="/sign-up-establishment" />
        <Route path="/perfil" />
        <Route path="/establishment" />
        <Route path="/menu" />
        <Route path="/establishment/menu/edit" />
        <Route path="/establishment/performance" />
        <Route Component={NotFound} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
export default Rotas;
