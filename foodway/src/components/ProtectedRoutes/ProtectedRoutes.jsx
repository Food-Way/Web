import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MenuEstablishment from "../MenuEstablishment/MenuEstablishment";
import { useNavigate } from "react-router-dom";
import parseJWT from "../../util/parseJWT";
const bodyToken = parseJWT();

const ProtectedRoutes = () => {

    const navigate = useNavigate();


    return (
        <>
            <MenuEstablishment />
            <Outlet />
        </>
    )
}
export default ProtectedRoutes;