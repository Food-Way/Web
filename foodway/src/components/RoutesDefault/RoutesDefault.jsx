import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/HeaderGeneral";

const RoutesDefault = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default RoutesDefault;