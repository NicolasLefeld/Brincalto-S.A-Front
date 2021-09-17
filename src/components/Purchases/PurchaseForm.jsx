import {
  Spacer,
  Input,
  Stack,
  Button,
  Text,
  DrawerFooter,
  Select,
  Flex,
  VStack,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import providerRequest from '../../api/providerRequests';
import purchasesRequests from '../../api/purchasesRequests';
import DatePicker from '../../components/DatePicker';

const PurchaseForm = ({ renderData, data }) => {
  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      extras: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'extras',
  });

  const isProviderSelected = watch('provider_id');

  const [startDate, setStartDate] = useState(new Date());
  const [providers, setProviders] = useState([]);

  const _id = data?._id;

  handleProviders();

  if (_id) {
    const onSubmit = async (data) => {
      await purchasesRequests.updateRecord(_id, data);
      renderData.setRender(!renderData.render);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Input
            {...register('name')}
            defaultValue={data.name}
            variant="flushed"
            placeholder="Nombre"
          />
          <Input
            {...register('comment')}
            defaultValue={data.comment}
            variant="flushed"
            placeholder="Comentario"
          />
          <Input
            {...register('cuit')}
            defaultValue={data.cuit}
            variant="flushed"
            placeholder="CUIT"
          />
          <Input
            {...register('address')}
            defaultValue={data.address}
            variant="flushed"
            placeholder="Dirección"
          />
          <Input
            {...register('checkingAccount')}
            defaultValue={data.checkingAccount}
            variant="flushed"
            type="number"
            placeholder="Cuenta corriente"
          />
        </Stack>
        <DrawerFooter>
          <Button type="submit" colorScheme="blue">
            Modificar
          </Button>
        </DrawerFooter>
      </form>
    );
  }

  const onSubmit = async (data) => {
    const parsedData = {
      ...data,
      date: startDate,
    };
    await purchasesRequests.postRecord(parsedData);
    renderData.setRender(!renderData.render);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Text fontSize="xl">Proveedor</Text>
        <Select
          {...register('provider_id')}
          variant="flushed"
          placeholder="Seleccione un proveedor"
        >
          {providers?.map((provider) => (
            <option value={provider._id}>{provider.name}</option>
          ))}
        </Select>
        {isProviderSelected && (
          <>
            <Text fontSize="xl">Datos Factura</Text>
            <Text>Fecha</Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <Input
              {...register('invoice_id')}
              variant="flushed"
              placeholder="N° Factura"
            />
            <Input
              {...register('concept')}
              variant="flushed"
              placeholder="Concepto"
            />
            <Input
              {...register('net')}
              variant="flushed"
              placeholder="Importe Neto"
              type="number"
            />
            <Input
              {...register('netPlusIva')}
              variant="flushed"
              placeholder="IVA"
              type="number"
            />
            {fields.map((field, index) => {
              return (
                <Stack key={field.id}>
                  <Flex alignContent justifyContent>
                    <Center>
                      <Text fontSize="xl">{`Extra ${index + 1}`}</Text>
                    </Center>
                    <Spacer />
                    <Center>
                      <Button
                        color="red.500"
                        fontSize="md"
                        onClick={() => remove(index)}
                      >
                        Eliminar extra
                      </Button>
                    </Center>
                  </Flex>
                  <VStack>
                    <Input
                      {...register(`extras.${index}.concepto`)}
                      variant="flushed"
                      placeholder="Concepto"
                    />
                    <Input
                      {...register(`extras.${index}.amount`)}
                      variant="flushed"
                      placeholder="Monto"
                      type="number"
                    />
                  </VStack>
                </Stack>
              );
            })}
            <Button
              color="green.500"
              fontSize="md"
              onClick={() => append({ firstName: 'bill', lastName: 'luo' })}
            >
              Agregar extra
            </Button>
            {/* {inputsExtraManually?.map((input, index) => (
              <Stack key={input}>
                <Flex alignContent justifyContent>
                  <Center>
                    <Text fontSize="xl">{`Extra ${index + 1}`}</Text>
                  </Center>
                  <Spacer />
                  <Center
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteExtra(input)}
                  >
                    <Text color="red.500" fontSize="md">
                      Eliminar?
                    </Text>
                  </Center>
                </Flex>
                <Input
                  variant="flushed"
                  placeholder={`Concepto ${index + 1}`}
                  {...register('extras.concepto.' + index)}
                />
                <Input
                  ref={register}
                  variant="flushed"
                  type="number"
                  placeholder={`Monto ${index + 1}`}
                  {...register('extras.' + index + '.amount')}
                />
              </Stack>
            ))}
            <Button colorScheme="blue" onClick={handleExtra}>
              Agregar EXTRA
            </Button> */}
          </>
        )}
      </Stack>
      <DrawerFooter>
        {isProviderSelected && (
          <Button type="submit" colorScheme="blue">
            Crear
          </Button>
        )}
      </DrawerFooter>
    </form>
  );

  function handleProviders() {
    useEffect(async () => {
      const providers = await providerRequest.getRecords();
      setProviders(providers);
    }, []);
  }
};

export default PurchaseForm;
