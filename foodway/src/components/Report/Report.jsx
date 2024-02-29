import React, { useState, useEffect } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arquivo from "../Report/leo.txt";
import api_call from "../../services/apiImpl";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";

import "./Report.css";

const Report = () => {
  const routeParams = useParams();
  const id = routeParams.id;
  const [menu, setMenu] = useState([]);

  async function getMenu({ filter }) {
    const response = await api_call("get", `products/establishments/${id}/${filter}`, null, atob(sessionStorage.getItem("token")));
    console.log(response);
    setMenu(response);
  }

  useEffect(() => {
    getMenu({ filter: "name" });
  }, []);

  const downloadExcel = () => {
    const data = menu.map(item => [item.name, item.idProduct]);

    const ws = XLSX.utils.aoa_to_sheet([["Name", "IdProduct"], ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    const fileName = "relatorio.xlsx";

    if (typeof window !== "undefined") {
      const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div className="report-container">
        <div className="report-box">
          <button onClick={downloadExcel}>
            Relatório - Janeiro
            <FontAwesomeIcon icon={faDownload} size="xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Report;
