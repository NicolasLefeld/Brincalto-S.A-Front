import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Drawer from '../components/Drawer';
import generateTableContent from '../util/generateTableContent';
import request from '../api/providerRequests';
import ProviderForm from '../components/Provider/ProviderForm';

const Provider = () => {
  const [providers, setProviders] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <ProviderForm renderData={renderData} />;

  const columns = [
    { displayName: 'Nombre', key: 'name', position: 0 },
    { displayName: 'Comentario', key: 'comment', position: 1 },
    { displayName: 'CUIT', key: 'cuit', position: 2 },
    { displayName: 'Dirección', key: 'address', position: 3 },
    { displayName: 'Balance', key: 'checkingAccount', position: 4 },
    { displayName: 'Accion', key: 'action', position: 5 },
  ];

  useEffect(() => {
    (async () => {
      const providers = await request.getRecords();
      setProviders(providers);
    })();
  }, [render]);

  const tableContent = generateTableContent(
    columns,
    providers,
    renderData,
    request,
    drawerForm,
  );

  return (
    <div>
      <Drawer activationMessage="Cargar nuevo proveedor">
        <ProviderForm renderData={renderData} />
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );
};

export default Provider;
