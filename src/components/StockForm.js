import { Input, Stack, Button, DrawerFooter } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import request from "../api/stockRequests";

const StockForm = ({ renderData, data, type }) => {
  const { register, handleSubmit } = useForm();
  const _id = data?._id;

  const insertStock = async (data) => {
    await request.postRecord(data, type);

    renderData.setRender(!renderData.render);
  };

  const updateStock = async (data) => {
    await request.updateRecord(_id, data, type);
    renderData.setRender(!renderData.render);
  };

  if (type === "spare") {
    if (_id) {
      return (
        <form onSubmit={handleSubmit(updateStock)}>
          <Stack>
            <Input
              {...register("product")}
              variant="flushed"
              placeholder="Producto"
              defaultValue={data.product.type}
            />
            <Input
              {...register("quantity")}
              variant="flushed"
              type="number"
              placeholder="Cantidad"
              defaultValue={data.quantity}
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
    return (
      <form onSubmit={handleSubmit(insertStock)}>
        <Stack>
          <Input
            {...register("product")}
            variant="flushed"
            placeholder="Producto"
          />
          <Input
            {...register("quantity")}
            variant="flushed"
            type="number"
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
    if (_id) {
      return (
        <form onSubmit={handleSubmit(updateStock)}>
          <Stack>
            <Input
              {...register("product")}
              variant="flushed"
              placeholder="Aceite"
              defaultValue={data.product.type}
            />
            <Input
              {...register("costPerLitter")}
              variant="flushed"
              placeholder="Costo por litro"
              defaultValue={data.product.costPerLitter}
            />
            <Input
              {...register("availableLiters")}
              variant="flushed"
              placeholder="Litros disponibles"
              defaultValue={data.product.availableLiters}
            />
            <Input
              {...register("quantity")}
              variant="flushed"
              type="number"
              placeholder="Cantidad"
              defaultValue={data.quantity}
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
    return (
      <form onSubmit={handleSubmit(insertStock)}>
        <Stack>
          <Input
            {...register("product")}
            variant="flushed"
            placeholder="Aceite"
          />
          <Input
            {...register("costPerLitter")}
            variant="flushed"
            placeholder="Costo por litro"
          />
          <Input
            {...register("availableLiters")}
            variant="flushed"
            placeholder="Litros disponibles"
          />
          <Input
            {...register("quantity")}
            variant="flushed"
            type="number"
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
  }
};

export default StockForm;
