import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Drawer from '../components/Drawer';
import generateTableContent from '../util/generateTableContent';
import request from '../api/purchasesRequests';
import PurchaseForm from '../components/Purchases/PurchaseForm';

const Purchases = () => {
  const [products, setProducts] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <PurchaseForm renderData={renderData} />;

  const columns = [
    { displayName: 'Proveedor', key: 'provider', position: 0 },
    { displayName: 'Fecha', key: 'date', position: 1 },
    { displayName: 'N° Factura', key: 'invoice_id', position: 2 },
    { displayName: 'Concepto', key: 'concept', position: 3 },
    { displayName: 'Imp. Neto', key: 'net', position: 4 },
    { displayName: 'Imp. IVA', key: 'netPlusIva', position: 5 },
    { displayName: 'Imp. Total', key: 'total', position: 6 },
    { displayName: 'Extras', key: 'extras', position: 7 },
    { displayName: 'Acción', key: 'action', position: 8 },
  ];

  useEffect(() => {
    (async () => {
      const products = await request.getRecords();
      setProducts(products);
    })();
  }, [render]);

  const tableContent = generateTableContent(
    columns,
    products,
    renderData,
    request,
    drawerForm,
  );

  return (
    <div>
      <Drawer activationMessage="Cargar factura">
        <PurchaseForm renderData={renderData} />
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );
};

export default Purchases;
