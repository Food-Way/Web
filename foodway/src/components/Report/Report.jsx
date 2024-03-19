import React, { useState, useEffect } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api_call from "../../services/apiImpl";
import { FileBuilder } from 'excel-build';
import { SheetBuilder } from 'excel-build';
import { CellBuilder } from 'excel-build';
import parseJWT from "../../util/parseJWT";
import moment from 'moment';

import "./Report.css";

const Report = () => {
  const bodyToken = parseJWT();
  const [menu, setMenu] = useState([]);

  async function getMenu({ filter }) {
    const response = await api_call("get", `products/establishments/${bodyToken.idUser}/${filter}`, null, atob(sessionStorage.getItem("token")));
    console.log(response);
    setMenu(response.data);
  }

  useEffect(() => {
    getMenu({ filter: "name" });
  }, []);

  const downloadExcel = () => {
    const now = new Date();
    const formattedDateTime = now.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const finalDate = moment(formattedDateTime).format('DD/MM/YYYY');
    const reportTitle = ['Relatório de produtos'];
    const reportFoodway = [`${atob(sessionStorage.getItem("establishmentName"))} - Foodway ${moment(formattedDateTime).format('YYYY')}`];
    const reportDate = ['Data: ' + finalDate];
    const reportResumeMerge = menu.length + 4;
    const reportDateMerge = menu.length + 5;
    var sum = 0;

    menu.forEach(item => {
      sum = sum + parseFloat(item.price);
    });

    const reportQuantity = ['Resumo: ' + menu.length + ' produtos com valor total de R$ ' + sum.toFixed(2)];

    const excelFile = new FileBuilder('relatorio-' + formattedDateTime);

    const sheet1 = new SheetBuilder('Relatório de produtos')

    sheet1.appendCustomRow(
      reportFoodway.map((item) =>
        new CellBuilder(item)
          .setFontSize(18)
          .setFontColor('#FFFFFF')
          .setBackgroundColor('#222222')
          .setFontBold()
          .build()
      )
    )

    sheet1.appendCustomRow(
      reportTitle.map((item) =>
        new CellBuilder(item)
          .setFontSize(16)
          .setFontColor('#FFFFFF')
          .setBackgroundColor('#000000')
          .build()
      )
    )

      .appendThead(['ID do produto', 'Nome', 'Preço', 'Última atualização'])
      .appendTbody(menu.map(product => [
        product.idProduct,
        product.name,
        "R$ " + product.price.toFixed(2),
        moment(product.updatedAt).format('DD/MM/YYYY HH:mm:ss')
      ]))
      .setColumnWidth(0, 250)
      .setColumnWidth(1, 100)
      .setColumnWidth(2, 100)
      .setColumnWidth(3, 150)
      .mergeCell([0, 1], [3, 1])
      .mergeCell([0, 2], [3, 2])
      .mergeCell([0, reportResumeMerge], [3, reportResumeMerge])
      .mergeCell([0, reportDateMerge], [3, reportDateMerge])

    sheet1.appendCustomRow(
      reportQuantity.map((item) =>
        new CellBuilder(item)
          .setFontSize(16)
          .setFontColor('#FFFFFF')
          .setBackgroundColor('#222222')
          .build()
      )
    )

    sheet1.appendCustomRow(
      reportDate.map((item) =>
        new CellBuilder(item)
          .setFontSize(16)
          .setFontColor('#FFFFFF')
          .setBackgroundColor('#000000')
          .build()
      )
    )

    excelFile.addSheet(sheet1).download();
  };

  return (
    <>
      <div className="report-container">
        <div className="report-box">
          <button onClick={downloadExcel}>
            Relatório de produtos
            <FontAwesomeIcon icon={faDownload} size="xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Report;
