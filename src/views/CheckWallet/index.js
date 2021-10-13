import React, { useState, useEffect } from "react";
import generateTableContent from "../../util/generateTableContent";
import request from "../../api/checkWalletRequest";
import Table from "../../components/Table";
import ChargesForm from "../../components/Charges/ChargesForm";

const CheckWallet = () => {
  const [charges, setCharges] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <ChargesForm renderData={renderData} />;

  handleCharges();

  const columns = [
    { displayName: "Número de cheque", key: "check_number", position: 0 },
    { displayName: "Estado", key: "status", position: 1 },
    { displayName: "Banco", key: "bank", position: 2 },
    { displayName: "Cliente", key: "from", position: 3 },
    { displayName: "Importe", key: "amount", position: 4 },
    { displayName: "Fecha", key: "expirationDate", position: 5 },
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

export default CheckWallet;
