import React, { useState, useEffect } from 'react';
import { Stack, Text, HStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { useForm } from 'react-hook-form';
import providerRequests from '../api/providerRequests';

const PurchasesByProvider = () => {
  const { register, watch } = useForm({
    defaultValues: {
      // providerSelected: false,
    },
  });
  const [purchasesProvider, setPurchasesProvider] = useState([]);
  const [providers, setProviders] = useState([]);
  const providerSelected = watch('providerSelected');

  handleProviders();
  handleProviderSelected();

  return (
    <>
      <Stack>
        <Text>Historial C/C Proveedor</Text>
        <Select
          variant="flushed"
          placeholder={'Seleccione el proveedor'}
          {...register(`providerSelected`)}
        >
          {providers?.map((provider) => (
            <option value={provider._id}>{provider.name}</option>
          ))}
        </Select>
        {purchasesProvider && (
          <>
            <Text>CUIT: {purchasesProvider?.cuit}</Text>
            <Text>Dirección: {purchasesProvider?.address}</Text>
            <Text>Comentario: {purchasesProvider?.comment}</Text>
            <Text>
              Cuenta Corriente: {purchasesProvider?.checkingAccount} $
            </Text>
            {purchasesProvider?.purchases && (
              <>
                <Text>Historial compras:</Text>
                {purchasesProvider?.purchases?.map((purchase, index) => (
                  <HStack>
                    <Text>{index + 1}</Text>
                    <Text>
                      {purchase.amount} $, el día{' '}
                      {new Date(purchase.date).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
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

  function handleProviders() {
    useEffect(async () => {
      const providers = await providerRequests.getRecords();
      setProviders(providers);
    }, []);
  }

  function handleProviderSelected() {
    useEffect(() => {
      const providerFiltered = providers.find(
        (provider) => provider._id === providerSelected,
      );

      setPurchasesProvider(providerFiltered);
    }, [providerSelected, providers]);
  }
};

export default PurchasesByProvider;
