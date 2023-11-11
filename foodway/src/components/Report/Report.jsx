import React from "react";
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./Report.css";

const Report = () => {
    return (
        <>
            <div className="report-container">
                <div className="report-box">
                    <span>Relatório - Janeiro</span>
                    <FontAwesomeIcon icon={faDownload} size="2xl" />
                </div>
            </div>
        </>
    );
}

export default Report;