import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Drawer from '../components/Drawer';
import generateTableContent from '../util/generateTableContent';
import request from '../api/clientRequests';
import ClientForm from '../components/ClientForm';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <ClientForm renderData={renderData} />;

  const columns = [
    { displayName: 'Nombre', key: 'name', position: 0 },
    { displayName: 'CUIT', key: 'cuit', position: 1 },
    { displayName: 'Dirección', key: 'address', position: 2 },
    { displayName: 'Contacto', key: 'contacto', position: 3 },
    { displayName: 'Cuenta corriente', key: 'checkingAccount', position: 4 },
    { displayName: 'Accion', key: 'action', position: 5 },
  ];

  useEffect(() => {
    (async () => {
      const clients = await request.getRecords();
      setClients(clients);
    })();
  }, [render]);

  const tableContent = generateTableContent(
    columns,
    clients,
    renderData,
    request,
    drawerForm,
  );

  return (
    <div>
      <Drawer activationMessage="Cargar nuevo cliente">
        <ClientForm renderData={renderData} />
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );
};

export default Client;
