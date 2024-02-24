import React from "react";
import MenuEstablishment from "../MenuEstablishment/MenuEstablishment";
import { Outlet } from "react-router-dom";

const EstablishmentRender = () => {
    return (
        <>
            <MenuEstablishment/>
            <Outlet />
        </>
    )
}
export default EstablishmentRender;