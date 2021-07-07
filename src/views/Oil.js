import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Drawer from '../components/Drawer';
import StockForm from '../components/StockForm';
import generateTableContent from '../util/generateTableContent';
import request from '../api/stockRequests';
const Oil = () => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState('oil');
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <StockForm renderData={renderData} type={type} />;

  useEffect(() => {
    (async () => {
      setItems(await request.getRecord(type));
    })();
  }, [type, render]);

  const columnsOil = [
    { displayName: 'Aceite', key: 'comment', position: 0 },
    {
      displayName: 'Litros',
      key: 'liters',
      position: 1,
    },
    { displayName: 'Acción', key: 'action', position: 2 },
  ];

  const tableContent = generateTableContent(
    columnsOil,
    items,
    renderData,
    request,
    drawerForm,
  );

  return (
    <div>
      <Drawer activationMessage={`Cargar Aceite`}>
        <StockForm renderData={renderData} type={type} />
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );
};

export default Oil;
