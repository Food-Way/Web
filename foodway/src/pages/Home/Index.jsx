import React, { useRef, useEffect, useState } from "react";
import Header from "../../components/Header/HeaderGeneral";
import "./style.css";
import ContainerCardFood from "../../components/ContainerCardFood/Index";

const Home = () => {
return (
  <>
    <Header />
    <ContainerCardFood />
  </>
);
};

export default Home;
