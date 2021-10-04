import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table';
import Drawer from '../../../components/Drawer';
import generateTableContent from '../../../util/generateTableContent';
import request from '../../../api/invoicesRequests';
import SalesForm from '../../../components/Sales/SalesForm';

const Invoices = () => {
  const [sales, setSales] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <SalesForm renderData={renderData} />;

  const columns = [
    { displayName: 'Cliente', key: 'client_id', position: 0 },
    { displayName: 'Fecha', key: 'date', position: 1 },
    { displayName: 'N° Factura', key: 'invoice_id', position: 2 },
    { displayName: 'Concepto', key: 'concept', position: 3 },
    { displayName: 'Imp. Neto', key: 'net', position: 4 },
    { displayName: 'Imp. IVA', key: 'netPlusIva', position: 5 },
    { displayName: 'Imp. Total', key: 'total', position: 6 },
    { displayName: 'Acción', key: 'action', position: 7 },
  ];

  useEffect(() => {
    (async () => {
      const products = await request.getRecords();
      setSales(products);
    })();
  }, [render]);

  const tableContent = generateTableContent(
    columns,
    sales,
    renderData,
    request,
    drawerForm,
  );

  return (
    <div>
      <Drawer activationMessage="Cargar factura" defaultOpen>
        <SalesForm renderData={renderData} />
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );
};

export default Invoices;
