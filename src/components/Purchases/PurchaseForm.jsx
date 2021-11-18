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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import providerRequest from "../../api/providerRequests";
import purchasesRequests from "../../api/purchasesRequests";
import DatePicker from "../../components/DatePicker";
import SelectProvider from "../Provider/SelectProvider";

const PurchaseForm = ({ renderData, data }) => {
  const form = useForm({
    defaultValues: {
      extras: [],
      status: "pending",
    },
  });
  const { register, handleSubmit, control, watch, setValue, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "extras",
  });

  const isProviderSelected = watch("providerId");
  const importNet = watch("net");
  const importNetPlusIva = watch("netPlusIva");
  const extras = watch("extras");

  const [startDate, setStartDate] = useState(new Date());
  const [providers, setProviders] = useState([]);

  const id = data?.id;

  handleProviders();
  handleImportNetPlusIva();
  handleTotal();

  if (id) {
    const onSubmit = async (data) => {
      await purchasesRequests.updateRecord(id, data);
      renderData.setRender(!renderData.render);
      reset();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Input
            {...register("name")}
            defaultValue={data.name}
            variant="flushed"
            placeholder="Nombre"
          />
          <Input
            {...register("comment")}
            defaultValue={data.comment}
            variant="flushed"
            placeholder="Comentario"
          />
          <Input
            {...register("cuit")}
            defaultValue={data.cuit}
            variant="flushed"
            placeholder="CUIT"
          />
          <Input
            {...register("address")}
            defaultValue={data.address}
            variant="flushed"
            placeholder="Dirección"
          />
          <Input
            {...register("checkingAccount")}
            defaultValue={data.checkingAccount}
            variant="flushed"
            type="number"
            step="any"
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
        <SelectProvider form={form} />
        {isProviderSelected && (
          <>
            <Text fontSize="xl">Estado</Text>
            <Select {...register("status")} variant="flushed">
              <option value="pending" selected>
                Pendiente
              </option>
              <option value="paid">Pagada</option>
            </Select>
            <Text fontSize="xl">Datos Factura</Text>
            <Text>Fecha</Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <Input
              {...register("invoiceId")}
              variant="flushed"
              placeholder="N° Factura"
            />
            <Input
              {...register("concept")}
              variant="flushed"
              placeholder="Concepto"
            />
            <Input
              {...register("net")}
              variant="flushed"
              placeholder="Importe Neto"
              type="number"
              step="any"
            />
            <Input
              {...register("netPlusIva")}
              variant="flushed"
              placeholder="IVA"
              type="number"
              step="any"
              step="any"
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
                      step="any"
                    />
                  </VStack>
                </Stack>
              );
            })}
            <Input
              {...register("total")}
              variant="flushed"
              placeholder="Total"
              type="number"
              step="any"
              step="any"
            />
            <Button color="green.500" fontSize="md" onClick={() => append()}>
              Agregar extra
            </Button>
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

  function handleImportNetPlusIva() {
    useEffect(() => {
      if (importNet) {
        setValue("netPlusIva", importNet * 0.21);
      }
    }, [importNet]);
  }

  function handleTotal() {
    useEffect(() => {
      console.log(extras, "------------");
      let totalExtras = 0;
      extras?.forEach((extra) => (totalExtras += parseFloat(extra.amount)));
      console.log(totalExtras);
      if (importNet || importNetPlusIva) {
        setValue(
          "total",
          parseFloat(
            parseFloat(importNet) +
              parseFloat(importNetPlusIva) +
              parseFloat(totalExtras),
          ).toFixed(2),
        );
      }
    }, [importNet, importNetPlusIva, extras]);
  }
};

export default PurchaseForm;
