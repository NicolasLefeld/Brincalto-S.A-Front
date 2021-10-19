import React, { useState, useEffect } from "react";
import generateTableContent from "../../util/generateTableContent";
import request from "../../api/checkWalletRequest";
import Table from "../../components/Table";
import ChargesForm from "../../components/Charges/ChargesForm";
import { Stack, HStack, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Input } from "@chakra-ui/input";
import { useForm } from "react-hook-form";

const CheckWallet = () => {
  const { register, watch } = useForm();
  const [charges, setCharges] = useState([]);
  const [chargesFiltered, setChargesFiltered] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <ChargesForm renderData={renderData} />;

  const checkIdSelected = watch("checkIdSelected");
  const stateSelected = watch("stateSelected");

  handleCharges();
  handleStateSelected();
  handleFilterByCheckIdSelected();

  const columns = [
    { displayName: "Número de cheque", key: "checkNumber", position: 0 },
    { displayName: "Estado", key: "status", position: 1 },
    { displayName: "Banco", key: "bank", position: 2 },
    { displayName: "Cliente", key: "from", position: 3 },
    { displayName: "Importe", key: "amount", position: 4 },
    { displayName: "Fecha", key: "expirationDate", position: 5 },
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
      <Stack
        p={5}
        m={3}
        border={"1px solid rgba(66,66,66,0.1)"}
        borderRadius={5}
      >
        <Text fontSize="xl">Filtrar Cartera de Cheques</Text>

        <HStack py={3}>
          <Select
            variant="flushed"
            placeholder={"Filtrar por estado"}
            {...register(`stateSelected`)}
          >
            <option value="all">Todos</option>
            <option value="received">En cartera</option>
            <option value="processed">Entregado</option>
          </Select>
          <Input
            variant="flushed"
            placeholder="Filtrar por número de cheque"
            {...register(`checkIdSelected`)}
          />
        </HStack>
      </Stack>
      <Table tableContent={tableContent} />
    </div>
  );

  function handleCharges() {
    useEffect(() => {
      (async () => {
        const charges = await request.getRecords();
        setCharges(charges);
        setChargesFiltered(charges);
      })();
    }, [render]);
  }

  function handleStateSelected() {
    useEffect(async () => {
      if (stateSelected === "processed" || stateSelected === "received") {
        const filterByStateAndClientSelected = chargesFiltered.filter(
          (sale) => sale.status === stateSelected,
        );
        return setCharges(filterByStateAndClientSelected);
      } else if (stateSelected === "all") {
        return setCharges(chargesFiltered);
      }
    }, [stateSelected]);
  }

  function handleFilterByCheckIdSelected() {
    useEffect(async () => {
      if (checkIdSelected) {
        const filteredChecks = chargesFiltered.filter(
          (charge) => charge.checkNumber === checkIdSelected,
        );
        setCharges(filteredChecks);
      } else {
        return setCharges(chargesFiltered);
      }
    }, [checkIdSelected]);
  }
};

export default CheckWallet;
