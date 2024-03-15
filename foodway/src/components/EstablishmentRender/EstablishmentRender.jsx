import React from "react";
import MenuEstablishment from "../MenuEstablishment/MenuEstablishment";
import "./EstablishmentRender.css";
import { Outlet } from "react-router-dom";

const EstablishmentRender = () => {
    return (
        <>
            <div className="render-establishment">
                <MenuEstablishment />
                <Outlet />
            </div>
        </>
    )
}
export default EstablishmentRender;