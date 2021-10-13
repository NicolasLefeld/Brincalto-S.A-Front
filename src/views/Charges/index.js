import React, { useState, useEffect } from "react";
import generateTableContent from "../../util/generateTableContent";
import { useForm } from "react-hook-form";
import request from "../../api/chargesRequests";
import Drawer from "../../components/Drawer";
import Table from "../../components/Table";
import ChargesForm from "../../components/Charges/ChargesForm";

const Remitos = () => {
  const [charges, setCharges] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <ChargesForm renderData={renderData} />;

  handleCharges();

  const columns = [
    { displayName: "Tipo", key: "type", position: 0 },
    { displayName: "Cliente", key: "client", position: 1 },
    { displayName: "Observación", key: "paymentComment", position: 2 },
    { displayName: "Importe", key: "amount", position: 3 },
    { displayName: "Fecha", key: "date", position: 4 },
    { displayName: "Cheque", key: "check_id", position: 5 },
    { displayName: "Acción", key: "action", position: 6 },
  ];

  const tableContent = generateTableContent(
    columns,
    charges,
    renderData,
    request,
    drawerForm,
  );

  return (
    <div>
      <Drawer activationMessage="Cargar Cobros" defaultOpen size="xxl">
        {drawerForm}
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );

  function handleCharges() {
    useEffect(() => {
      (async () => {
        const charges = await request.getRecords();
        setCharges(charges);
      })();
    }, [render]);
  }
};

export default Remitos;
