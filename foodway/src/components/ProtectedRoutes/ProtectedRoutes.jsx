import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MenuEstablishment from "../MenuEstablishment/MenuEstablishment";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (atob(sessionStorage.getItem("token"))) {
            if (atob(sessionStorage.getItem("typeUser")) === "ESTABLISHMENT") {
                navigate(`/establishment/info/${atob(sessionStorage.getItem("idUser"))}`);
            } else {
                navigate(`/user/profile/${atob(sessionStorage.getItem("idUser"))}`);
            }
        } else {
            navigate("/sign-in");
        }
    }, []);

    return (
        <>
            <MenuEstablishment />
            <Outlet />
        </>
    )
}
export default ProtectedRoutes;