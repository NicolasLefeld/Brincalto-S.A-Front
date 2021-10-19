import {
  Checkbox,
  Input,
  Stack,
  Button,
  DrawerFooter,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import request from "../api/stockRequests";

const StockForm = ({ renderData, data, type }) => {
  const { register, handleSubmit, watch } = useForm();
  const id = data?.id;

  const insertStock = async (data) => {
    await request.postRecord(data, type);
    renderData.setRender(!renderData.render);
  };

  const updateStock = async (data) => {
    if (data?.isMovement) {
      await request.updateRecordWithMovement(id, data, type);
      renderData.setRender(!renderData.render);
    } else {
      await request.updateRecord(id, data, type);
      renderData.setRender(!renderData.render);
    }
  };

  const IsAMovement = watch("isMovement", true);

  console.log(data);
  if (type === "spare") {
    if (id) {
      return (
        <form onSubmit={handleSubmit(updateStock)}>
          <Stack>
            <Checkbox {...register("isMovement")} defaultIsChecked>
              ¿Es un movimiento?
            </Checkbox>
            {IsAMovement ? (
              <>
                <Input
                  {...register("product")}
                  variant="flushed"
                  placeholder="Producto"
                  defaultValue={data.product}
                  isDisabled={IsAMovement}
                />
                <Input
                  {...register("comment")}
                  variant="flushed"
                  placeholder="Observación"
                  defaultValue={data.comment}
                />
                <Input
                  {...register("quantity")}
                  variant="flushed"
                  type="number"
                  step="any"
                  placeholder="Cantidad"
                  defaultValue={data.quantity}
                />
              </>
            ) : (
              <>
                <Input
                  {...register("product")}
                  variant="flushed"
                  placeholder="Producto"
                  defaultValue={data.product}
                  isDisabled={IsAMovement}
                />
                <Input
                  {...register("comment")}
                  variant="flushed"
                  placeholder="Observación"
                  defaultValue={data.comment}
                />
                <Input
                  {...register("quantity")}
                  variant="flushed"
                  type="number"
                  step="any"
                  placeholder="Cantidad"
                  defaultValue={data.quantity}
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
    return (
      <form onSubmit={handleSubmit(insertStock)}>
        <Stack>
          <Input
            {...register("product")}
            variant="flushed"
            placeholder="Producto"
          />
          <Input
            {...register("comment")}
            variant="flushed"
            placeholder="Observación"
          />
          <Input
            {...register("quantity")}
            variant="flushed"
            type="number"
            step="any"
            placeholder="Cantidad"
          />
        </Stack>
        <DrawerFooter>
          <Button type="submit" colorScheme="blue">
            Cargar
          </Button>
        </DrawerFooter>
      </form>
    );
  } else if (type === "oil") {
    if (id) {
      return (
        <form onSubmit={handleSubmit(updateStock)}>
          <Stack>
            <Input
              {...register("comment")}
              variant="flushed"
              placeholder="Aceite"
              defaultValue={data.comment}
            />
            <Checkbox {...register("isMovement")} defaultIsChecked>
              ¿Es un movimiento?
            </Checkbox>
            {IsAMovement ? (
              <>
                <Input
                  {...register("observation")}
                  variant="flushed"
                  placeholder="Observación"
                />
                <Input
                  {...register("littersTaken")}
                  variant="flushed"
                  type="number"
                  step="any"
                  placeholder="Litros tomados"
                />
              </>
            ) : (
              <>
                <Input
                  {...register("liters")}
                  variant="flushed"
                  placeholder="Litros Iniciales"
                  type="number"
                  step="any"
                  defaultValue={data.liters}
                />
                <Input
                  {...register("availableLitters")}
                  variant="flushed"
                  type="number"
                  step="any"
                  placeholder="Litros Disponibles"
                  defaultValue={data.availableLitters}
                />
                <Input
                  {...register("costPerLitter")}
                  variant="flushed"
                  type="number"
                  step="any"
                  placeholder="Costo por Litro"
                  defaultValue={data.costPerLitter}
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
    return (
      <form onSubmit={handleSubmit(insertStock)}>
        <Stack>
          <Input
            {...register("comment")}
            variant="flushed"
            placeholder="Aceite"
          />
          <Input
            {...register("liters")}
            variant="flushed"
            placeholder="Litros Iniciales"
            type="number"
            step="any"
          />
          <Input
            {...register("availableLitters")}
            variant="flushed"
            placeholder="Litros Disponibles"
            type="number"
            step="any"
          />
          <Input
            {...register("costPerLitter")}
            variant="flushed"
            type="number"
            step="any"
            placeholder="Costo por Litro"
          />
        </Stack>
        <DrawerFooter>
          <Button type="submit" colorScheme="blue">
            Cargar
          </Button>
        </DrawerFooter>
      </form>
    );
  }
};

export default StockForm;
