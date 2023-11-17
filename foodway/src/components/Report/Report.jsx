import React from "react";
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import arquivo from "../Report/leo.txt";

import "./Report.css";

const Report = () => {
    return (
        <>
            <div className="report-container">
                <div className="report-box">
                    <a href={arquivo} target="_blank" download="leo-coisa.txt">
                        Relatório - Janeiro
                        <FontAwesomeIcon icon={faDownload} size="xl" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default Report;