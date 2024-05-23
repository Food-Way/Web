import React from "react";
import { Outlet } from "react-router-dom";
import MenuEstablishment from "../MenuEstablishment/MenuEstablishment";
import "./UserRender.css";

const UserRender = () => {
    return (
        <>
            <div className="render-user">
                <MenuEstablishment />
                <Outlet />
            </div >
        </>
    )
}
export default UserRender;