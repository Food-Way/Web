import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/HeaderGeneral";
import Footer from "../Footer/Footer";

const RoutesDefault = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer/>
        </>
    )
}

export default RoutesDefault;