import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Drawer from "../components/Drawer";
import StockForm from "../components/StockForm";
import generateTableContent from "../util/generateTableContent";
import request from "../api/stockRequests";
import SelectTypeStock from "../components/SelectTypeStock";

const Client = () => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("spare");
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <StockForm renderData={renderData} type={type} />;

  useEffect(() => {
    (async () => {
      setItems(await request.getRecord(type));
    })();
  }, [type, render]);

  const columnsSpare = [
    { displayName: "Producto", key: "product.type", position: 0 },
    { displayName: "Cantidad", key: "quantity", position: 1 },
    { displayName: "Accion", key: "action", position: 2 },
  ];

  const columnsOil = [
    { displayName: "Aceite", key: "product.type", position: 0 },
    {
      displayName: "Costo por litro",
      key: "product.costPerLitter",
      position: 1,
    },
    {
      displayName: "Litros disponibles",
      key: "product.availableLiters",
      position: 2,
    },
    { displayName: "Cantidad", key: "quantity", position: 3 },
    { displayName: "Accion", key: "action", position: 4 },
  ];

  const tableContent = generateTableContent(
    type === "spare" ? columnsSpare : columnsOil,
    items,
    renderData,
    request,
    drawerForm
  );

  return (
    <div>
      <SelectTypeStock setType={setType} />
      <Drawer
        activationMessage={`Cargar nuevo ${
          type === "oil" ? "aceite" : "repuesto"
        }`}
      >
        <StockForm renderData={renderData} type={type} />
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );
};

export default Client;
