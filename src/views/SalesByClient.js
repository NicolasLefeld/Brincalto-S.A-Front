import React, { useState, useEffect } from "react";
import { Stack, Text, HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useForm } from "react-hook-form";
import clientRequest from "../api/clientRequests";
import { formatCurrency } from "../util/currencyHelper";

const SalesByClient = () => {
    const { register, watch } = useForm({
        defaultValues: {
            // clientSelected: false,
        },
    });
    const [salesClient, setSalesClient] = useState([]);
    const [clients, setClients] = useState([]);
    const clientSelected = watch("clientSelected");

    handleClients();
    handleClientSelected();

    return (
        <>
            <Stack>
                <Text>Historial C/C Cliente</Text>
                <Select
                    variant="flushed"
                    placeholder={"Seleccione el cliente"}
                    {...register(`clientSelected`)}
                >
                    {clients?.map((provider) => (
                        <option value={provider.id}>{provider.name}</option>
                    ))}
                </Select>
                {salesClient && (
                    <>
                        <Text>CUIT: {salesClient?.cuit}</Text>
                        <Text>Dirección: {salesClient?.address}</Text>
                        <Text>Comentario: {salesClient?.comment}</Text>
                        <Text>
                            Cuenta Corriente:{" "}
                            {formatCurrency(salesClient?.checkingAccount)}
                        </Text>
                        {salesClient?.sales && (
                            <>
                                <Text>Historial de ventas:</Text>
                                {salesClient?.sales?.map((purchase, index) => (
                                    <HStack>
                                        <Text>{index + 1}</Text>
                                        <Text>
                                            {purchase.amount} $, el día{" "}
                                            {new Date(
                                                purchase.date,
                                            ).toLocaleString("es-ES", {
                                                year: "numeric",
                                                month: "numeric",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                second: "numeric",
                                            })}
                                        </Text>
                                    </HStack>
                                ))}
                            </>
                        )}
                    </>
                )}
            </Stack>
        </>
    );

    function handleClients() {
        useEffect(async () => {
            const clients = await clientRequest.getRecords();
            setClients(clients);
        }, []);
    }

    function handleClientSelected() {
        useEffect(() => {
            const clientFinded = clients.find(
                (provider) => provider.id === clientSelected,
            );

            setSalesClient(clientFinded);
        }, [clientSelected, clients]);
    }
};

export default SalesByClient;
