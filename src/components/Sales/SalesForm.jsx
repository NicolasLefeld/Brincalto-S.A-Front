import {
  Spacer,
  Input,
  Stack,
  Button,
  Text,
  DrawerFooter,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import salesRequests from "../../api/invoicesRequests";
import SelectClient from "../Clients/SelectClient";
import DatePicker from "../DatePicker";

const Sales = ({ renderData, data }) => {
  const form = useForm({
    defaultValues: {
      status: "pending",
    },
  });

  const { register, handleSubmit, watch, setValue, reset } = form;

  const isClientSelected = watch("clientId");
  const isTypeSelected = watch("type");
  const importNet = watch("net");
  const importNetPlusIva = watch("netPlusIva");

  const [startDate, setStartDate] = useState(new Date());

  const id = data?.id;

  handleImportNetPlusIva();
  handleTotal();

  if (id) {
    const onSubmit = async (data) => {
      await salesRequests.updateRecord(id, data);
      renderData.setRender(!renderData.render);
    };
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <SelectClient form={form} placeholder={data.clientId.name} />
          <Text fontSize="xl">Tipo factura</Text>
          <Select
            {...register("type")}
            variant="flushed"
            defaultValue={data.type}
          >
            <option value="A">Factura A</option>
            <option value="B">Factura B</option>
          </Select>
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
            selected={new Date(data.date)}
            onChange={(date) => setStartDate(date)}
          />
          <Input
            {...register("invoiceId")}
            variant="flushed"
            placeholder="N° Factura"
            defaultValue={data.invoiceId}
          />
          <Input
            {...register("concept")}
            variant="flushed"
            placeholder="Concepto"
            defaultValue={data.concept}
          />
          <Input
            {...register("net")}
            variant="flushed"
            placeholder="Importe Neto"
            type="number"
            defaultValue={data.net}
            step="any"
          />
          {isTypeSelected === "A" && (
            <>
              <Input
                {...register("netPlusIva")}
                variant="flushed"
                placeholder="IVA"
                type="number"
                defaultValue={data.netPlusIva}
                step="any"
              />
              <Input
                {...register("total")}
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
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <SelectClient form={form} />
        {isClientSelected && (
          <>
            <Text fontSize="xl">Tipo factura</Text>
            <Select
              {...register("type")}
              variant="flushed"
              placeholder="Seleccione el tipo"
              required
            >
              <option value="A">Factura A</option>
              <option value="B">Factura B</option>
            </Select>
            <Text fontSize="xl">Estado</Text>
            <Select
              {...register("status")}
              variant="flushed"
              placeholder="Seleccione el estado"
            >
              <option value="pending">Pendiente</option>
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
            {isTypeSelected === "A" && (
              <>
                <Input
                  {...register("netPlusIva")}
                  variant="flushed"
                  placeholder="IVA"
                  type="number"
                  step="any"
                />
                <Input
                  {...register("total")}
                  variant="flushed"
                  placeholder="Total"
                  type="number"
                  step="any"
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

  function handleImportNetPlusIva() {
    useEffect(() => {
      if (isTypeSelected === "A" && importNet) {
        setValue("netPlusIva", importNet * 0.21);
      }
    }, [importNet]);
  }

  function handleTotal() {
    useEffect(() => {
      if (isTypeSelected === "A") {
        if (importNet || importNetPlusIva) {
          setValue(
            "total",
            parseFloat(
              parseFloat(importNet) + parseFloat(importNetPlusIva),
            ).toFixed(2),
          );
        }
      }
    }, [importNet, importNetPlusIva]);
  }
};

export default Sales;
