import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Drawer from '../components/Drawer';
import StockForm from '../components/StockForm';
import generateTableContent from '../util/generateTableContent';
import request from '../api/stockRequests';
import SelectTypeStock from '../components/SelectTypeStock';

const Spare = () => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState('spare');
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <StockForm renderData={renderData} type={type} />;

  useEffect(() => {
    (async () => {
      setItems(await request.getRecord(type));
    })();
  }, [type, render]);

  const columnsSpare = [
    { displayName: 'Producto', key: 'product', position: 0 },
    { displayName: 'Observación', key: 'comment', position: 1 },
    { displayName: 'Cantidad', key: 'quantity', position: 2 },
    { displayName: 'Accion', key: 'action', position: 3 },
  ];

  const tableContent = generateTableContent(
    columnsSpare,
    items,
    renderData,
    request,
    drawerForm,
  );

  return (
    <div>
      <Drawer activationMessage={`Cargar Repuesto`}>
        <StockForm renderData={renderData} type={type} />
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );
};

export default Spare;
