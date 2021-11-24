import React, { useState, useEffect } from "react";
import generateTableContent from "../../util/generateTableContent";
import request from "../../api/paymentRequests";
import Drawer from "../../components/Drawer";
import Table from "../../components/Table";
import PaymentsForm from "../../components/Payments/PaymentsForm";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [render, setRender] = useState(false);
    const renderData = { render, setRender };
    const drawerForm = <PaymentsForm renderData={renderData} />;

    handleCharges();

    const columns = [
        { displayName: "Tipo", key: "type", position: 0 },
        { displayName: "Proveedor", key: "provider", position: 1 },
        { displayName: "Observación", key: "paymentComment", position: 2 },
        { displayName: "Importe", key: "amount", position: 3 },
        { displayName: "Fecha", key: "date", position: 4 },
        { displayName: "Cheque", key: "check", position: 5 },
        { displayName: "Acción", key: "action", position: 6 },
    ];

    const tableContent = generateTableContent(
        columns,
        payments,
        renderData,
        request,
        drawerForm,
    );

    return (
        <div>
            <Drawer activationMessage="Cargar Pagos" defaultOpen size="xxl">
                {drawerForm}
            </Drawer>
            <Table tableContent={tableContent} />
        </div>
    );

    function handleCharges() {
        useEffect(() => {
            (async () => {
                const payments = await request.getRecords();
                setPayments(payments);
            })();
        }, [render]);
    }
};

export default Payments;
