import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/select";
import clientRequests from "../../api/clientRequests";
import { Spinner } from "@chakra-ui/react";
import { Stack, Text } from "@chakra-ui/layout";

const SelectClient = (props) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const { form, placeholder } = props;
  const { register } = form;

  fetchClients();

  return (
    <Stack>
      <Text fontSize="xl">Listado de Clientes</Text>
      {loading ? (
        <Spinner />
      ) : (
        <Select
          variant="flushed"
          placeholder={placeholder || "Seleccione un cliente"}
          {...register("clientId")}
        >
          {clients?.map((client) => (
            <option value={client.id}>{client.name}</option>
          ))}
        </Select>
      )}
    </Stack>
  );

  function fetchClients() {
    useEffect(async () => {
      setLoading(true);
      const clients = await clientRequests.getRecords();
      console.log(clients);
      if (clients !== "Any clients found") {
        setClients(clients);
        return setLoading(false);
      }
    }, []);
  }
};

export default SelectClient;
