import {
  Input,
  Checkbox,
  Stack,
  Text,
  Button,
  DrawerFooter,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import clientRequest from "../../api/clientRequests";
import productsRequest from "../../api/productsRequests";

const ClientForm = ({ renderData, data }) => {
  const [products, setProducts] = useState([]);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      sales: [],
      products: [],
      assignedProducts: [],
    },
  });
  const assignedProducts = watch("assigned_products");
  console.log(assignedProducts);

  const _id = data?._id;

  handleProducts();

  const handleCreate = () => {
    const onSubmit = async (data) => {
      await clientRequest.postRecord(data);
      renderData.setRender(!renderData.render);
    };

    const ProductsCheckList = (
      <Stack border="1px" borderColor="gray.200" padding={4}>
        <Text fontSize="xl">Productos asignados</Text>
        <CheckboxGroup colorScheme="blue">
          {products.map((product) => (
            <Checkbox
              id={product._id}
              value={product._id}
              {...register(`assigned_products`)}
            >
              {product.name}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Stack>
    );

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          {ProductsCheckList}
          <Input {...register("name")} variant="flushed" placeholder="Nombre" />
          <Input
            {...register("cuit")}
            variant="flushed"
            type="number"
            step="any"
            placeholder="CUIT"
          />
          <Input
            {...register("address")}
            variant="flushed"
            placeholder="Dirección"
          />
          <Input
            {...register("contacto")}
            variant="flushed"
            placeholder="Contacto"
          />
          <Input
            {...register("checkingAccount")}
            variant="flushed"
            type="number"
            step="any"
            placeholder="C/C Cuenta corriente"
          />
        </Stack>
        <DrawerFooter>
          <Button type="submit" colorScheme="blue">
            Crear
          </Button>
        </DrawerFooter>
      </form>
    );
  };

  const handleEdit = () => {
    const onSubmit = async (data) => {
      await clientRequest.updateRecord(_id, data);
      renderData.setRender(!renderData.render);
    };

    const assignedProducts = data?.assignedProducts.map(
      (product) => product._id,
    );

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Stack border="1px" borderColor="gray.200" padding={4}>
            <Text fontSize="xl">Productos asignados</Text>
            <CheckboxGroup colorScheme="blue" defaultValue={assignedProducts}>
              {products.map((product) => (
                <Checkbox
                  id={product._id}
                  value={product._id}
                  {...register(`assigned_products`)}
                >
                  {product.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </Stack>
          <Input
            {...register("name")}
            defaultValue={data.name}
            variant="flushed"
            placeholder="Nombre"
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
            {...register("contact")}
            defaultValue={data.contact}
            variant="flushed"
            placeholder="Contacto"
          />
          <Input
            {...register("comment")}
            defaultValue={data.comment}
            variant="flushed"
            placeholder="Comentario"
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
  };

  if (_id) {
    return handleEdit();
  }

  return handleCreate();

  function handleProducts() {
    useEffect(async () => {
      const allProducts = await productsRequest.getRecords();
      setProducts(allProducts);
    }, []);
  }
};

export default ClientForm;
