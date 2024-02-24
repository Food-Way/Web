import React from "react";
import Header from "../Header/HeaderGeneral";
import { Outlet } from "react-router-dom";

const UserRender = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}   
export default UserRender;