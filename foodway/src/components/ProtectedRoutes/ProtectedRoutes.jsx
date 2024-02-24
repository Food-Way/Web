import React from "react";
import { Outlet } from "react-router-dom";
import MenuEstablishment from "../MenuEstablishment/MenuEstablishment";

const ProtectedRoutes = () => {
    return (
        <>
            <MenuEstablishment />
            <Outlet />
        </>
    )
}
export default ProtectedRoutes;