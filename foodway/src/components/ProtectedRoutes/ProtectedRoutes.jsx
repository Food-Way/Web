import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MenuEstablishment from "../MenuEstablishment/MenuEstablishment";
import { useNavigate } from "react-router-dom";
import parseJWT from "../../util/parseJWT";
const bodyToken = parseJWT();

const ProtectedRoutes = () => {

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (atob(sessionStorage.getItem("token"))) {
    //         if (atob(sessionStorage.getItem("typeUser")) === "ESTABLISHMENT") {
    //             navigate(`/establishment/info/${bodyToken.sub}`);
    //         } else {
    //             navigate(`/user/profile/${bodyToken.sub}`);
    //         }
    //     } else {
    //         navigate("/sign-in");
    //     }
    // }, []);

    return (
        <>
            <MenuEstablishment />
            <Outlet />
        </>
    )
}
export default ProtectedRoutes;