import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Drawer from '../components/Drawer';
import generateTableContent from '../util/generateTableContent';
import request from '../api/userRequests';
import UserForm from '../components/User/UserForm';

const User = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <UserForm renderData={renderData} />;

  const columns = [
    { displayName: 'Email', key: 'email', position: 0 },
    { displayName: 'Rol', key: 'role', position: 1 },
    { displayName: 'Accion', key: 'action', position: 2 },
  ];

  useEffect(() => {
    (async () => {
      const dataUsers = await request.getRecords();
      setUsers(dataUsers);
    })();
  }, [render]);

  const tableContent = generateTableContent(
    columns,
    users,
    renderData,
    request,
    drawerForm,
  );

  return (
    <div>
      <Drawer activationMessage="Cargar nuevo usuario">{drawerForm}</Drawer>
      <Table tableContent={tableContent} />
    </div>
  );
};

export default User;
