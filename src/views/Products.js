import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Drawer from '../components/Drawer';
import generateTableContent from '../util/generateTableContent';
import request from '../api/productsRequests';
import ProductsForm from '../components/Products/ProductsForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <ProductsForm renderData={renderData} />;

  const columns = [
    { displayName: 'Nombre', key: 'name', position: 0 },
    { displayName: 'Accion', key: 'action', position: 1 },
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
      <Drawer activationMessage="Cargar nuevo producto">
        <ProductsForm renderData={renderData} />
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );
};

export default Products;
