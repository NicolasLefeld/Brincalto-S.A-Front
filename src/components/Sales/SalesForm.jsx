import {
  Spacer,
  Input,
  Stack,
  Button,
  Text,
  DrawerFooter,
  Select,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import client from '../../api/clientRequests';
import salesRequests from '../../api/invoicesRequests';
import DatePicker from '../DatePicker';

const Sales = ({ renderData, data }) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      extras: [],
    },
  });

  const isProviderSelected = watch('client_id');
  const isTypeSelected = watch('type');
  const importNet = watch('net');

  const [startDate, setStartDate] = useState(new Date());
  const [clients, setClients] = useState([]);

  const _id = data?._id;

  handleProviders();

  if (_id) {
    const onSubmit = async (data) => {
      await salesRequests.updateRecord(_id, data);
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
    await salesRequests.postRecord(parsedData);
    renderData.setRender(!renderData.render);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Text fontSize="xl">Clientes</Text>
        <Select
          {...register('client_id')}
          variant="flushed"
          placeholder="Seleccione un cliente"
        >
          {clients?.map((client) => (
            <option value={client._id}>{client.name}</option>
          ))}
        </Select>
        {isProviderSelected && (
          <>
            <Text fontSize="xl">Tipo factura</Text>
            <Select
              {...register('type')}
              variant="flushed"
              placeholder="Seleccione el tipo"
              required
            >
              <option value="A">Factura A</option>
              <option value="B">Factura B</option>
            </Select>
            <Text fontSize="xl">Estado</Text>
            <Select
              {...register('status')}
              variant="flushed"
              placeholder="Seleccione el estado"
            >
              <option value="pending">Pendiente</option>
              <option value="paid">Procesada</option>
            </Select>
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
              {...register('amount')}
              variant="flushed"
              placeholder="Importe"
              type="number"
            />
            {isTypeSelected === 'A' && (
              <>
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
                  defaultValue={importNet && importNet * 1.21}
                />
                <Input
                  {...register('total')}
                  variant="flushed"
                  placeholder="Total"
                  type="number"
                />
              </>
            )}
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
      const providers = await client.getRecords();
      setClients(providers);
    }, []);
  }
};

export default Sales;
