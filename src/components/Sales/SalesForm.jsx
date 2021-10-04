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
  const { register, handleSubmit, watch, setValue } = useForm();

  const isClientSelected = watch('client_id');
  const isTypeSelected = watch('type');
  const importNet = watch('net');
  const importNetPlusIva = watch('netPlusIva');

  const [startDate, setStartDate] = useState(new Date());
  const [clients, setClients] = useState([]);

  const _id = data?._id;

  handleProviders();
  handleImportNetPlusIva();
  handleTotal();

  if (_id) {
    const onSubmit = async (data) => {
      await salesRequests.updateRecord(_id, data);
      renderData.setRender(!renderData.render);
    };
    console.log(data);
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Text fontSize="xl">Clientes</Text>
          <Select
            {...register('client_id')}
            variant="flushed"
            placeholder={data.client_id}
          >
            {clients?.map((client) => (
              <option value={client._id}>{client.name}</option>
            ))}
          </Select>
          <Text fontSize="xl">Tipo factura</Text>
          <Select
            {...register('type')}
            variant="flushed"
            defaultValue={data.type}
          >
            <option value="A">Factura A</option>
            <option value="B">Factura B</option>
          </Select>
          <Text fontSize="xl">Estado</Text>
          <Select
            {...register('status')}
            variant="flushed"
            placeholder={data.status === 'pending' ? 'Pendiente' : 'Procesada'}
          >
            <option value="pending">Pendiente</option>
            <option value="processed">Procesada</option>
          </Select>
          <Text fontSize="xl">Datos Factura</Text>
          <Text>Fecha</Text>
          <DatePicker
            selected={new Date(data.date)}
            onChange={(date) => setStartDate(date)}
          />
          <Input
            {...register('invoice_id')}
            variant="flushed"
            placeholder="N° Factura"
            defaultValue={data.invoice_id}
          />
          <Input
            {...register('concept')}
            variant="flushed"
            placeholder="Concepto"
            defaultValue={data.concept}
          />
          <Input
            {...register('net')}
            variant="flushed"
            placeholder="Importe Neto"
            type="number"
            defaultValue={data.net}
            step="any"
          />
          {isTypeSelected === 'A' && (
            <>
              <Input
                {...register('netPlusIva')}
                variant="flushed"
                placeholder="IVA"
                type="number"
                defaultValue={data.netPlusIva}
                step="any"
              />
              <Input
                {...register('total')}
                variant="flushed"
                placeholder="Total"
                type="number"
                defaultValue={data.total}
                step="any"
              />
            </>
          )}
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
        {isClientSelected && (
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
              <option value="processed">Procesada</option>
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
              {...register('net')}
              variant="flushed"
              placeholder="Importe Neto"
              type="number"
            />
            {isTypeSelected === 'A' && (
              <>
                <Input
                  {...register('netPlusIva')}
                  variant="flushed"
                  placeholder="IVA"
                  type="number"
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
        {isClientSelected && (
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

  function handleImportNetPlusIva() {
    useEffect(() => {
      if (isTypeSelected === 'A' && importNet) {
        setValue('netPlusIva', importNet * 0.21);
      }
    }, [importNet]);
  }

  function handleTotal() {
    useEffect(() => {
      if (isTypeSelected === 'A') {
        if (importNet || importNetPlusIva) {
          setValue(
            'total',
            parseFloat(parseFloat(importNet) + parseFloat(importNetPlusIva)),
          );
        }
      }
    }, [importNet, importNetPlusIva]);
  }
};

export default Sales;
