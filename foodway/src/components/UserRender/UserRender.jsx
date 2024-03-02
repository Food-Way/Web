import React from "react";
import { Outlet } from "react-router-dom";
import MenuEstablishment from "../MenuEstablishment/MenuEstablishment";

const UserRender = () => {
    return (
        <>
            <MenuEstablishment height="170rem"/>
            <Outlet />
        </>
    )
}   
export default UserRender;