import React, { useState, useEffect } from "react";
import { Stack, Text, HStack, Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useForm } from "react-hook-form";
import providerRequests from "../api/providerRequests";
import SelectProvider from "../components/Provider/SelectProvider";

const PurchasesByProvider = () => {
  const form = useForm({
    defaultValues: {
      // provider_id: false,
    },
  });
  const { register, watch } = form;
  const [purchasesProvider, setPurchasesProvider] = useState([]);
  const [providers, setProviders] = useState([]);
  const provider_id = watch("provider_id");

  handleProviders();
  handleProviderSelected();

  return (
    <>
      <Stack>
        <Text fontSize="2xl">Historial de Cuenta Corriente de Proveedor</Text>
        <SelectProvider form={form} />
        {purchasesProvider && (
          <>
            <HStack
              border="1px solid var(--chakra-colors-gray-200)"
              justifyContent="space-evenly"
              py={4}
            >
              <Stack>
                <Text fontSize="xl">Proveedor</Text>
                <Text>{purchasesProvider?.name}</Text>
              </Stack>
              <Stack>
                <Text fontSize="xl">Cuenta Corriente</Text>
                <Text>{purchasesProvider?.checkingAccount?.toFixed(2)} $</Text>
              </Stack>
              <Stack>
                <Text fontSize="xl">Datos Personales</Text>
                <Flex direction="column" justifyContent="space-evenly">
                  <Text>CUIT: {purchasesProvider?.cuit}</Text>
                  <Text>Dirección: {purchasesProvider?.address}</Text>
                  <Text>Comentario: {purchasesProvider?.comment}</Text>
                </Flex>
              </Stack>
            </HStack>
            {purchasesProvider?.purchases && (
              <Flex
                border="1px solid var(--chakra-colors-gray-200)"
                p={8}
                display="column"
              >
                <Text fontSize="xl">Compras asociadas con el proveedor</Text>
                {purchasesProvider?.purchases?.map((purchase, index) => (
                  <Flex direction="row" justifyContent="space-between" px={32}>
                    <Text>{index + 1}</Text>
                    <Text>
                      {purchase.amount} $, el día{" "}
                      {new Date(purchase.date).toLocaleString("es-ES", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            )}
          </>
        )}
      </Stack>
    </>
  );

  function handleProviders() {
    useEffect(async () => {
      const providers = await providerRequests.getRecords();
      setProviders(providers);
    }, []);
  }

  function handleProviderSelected() {
    useEffect(() => {
      const providerFiltered = providers.find(
        (provider) => provider._id === provider_id,
      );

      setPurchasesProvider(providerFiltered);
    }, [provider_id, providers]);
  }
};

export default PurchasesByProvider;
