import {
  Input,
  Select,
  Checkbox,
  Stack,
  Text,
  Button,
  DrawerFooter,
  CheckboxGroup,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import clientRequest from '../api/clientRequests';
import productsRequest from '../api/productsRequests';

const ClientForm = ({ renderData, data }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(
    data.assigned_products || [],
  );
  const { register, handleSubmit, control } = useForm();
  const _id = data?._id;

  handleProducts();

  // useEffect(() => {
  //   console.log(selectedProducts);
  // }, [selectedProducts, setSelectedProducts]);

  const onChangeProductSelected = (id) => {
    console.log(selectedProducts);
    const handleNewProducts = selectedProducts?.includes(id)
      ? selectedProducts?.filter((selectProduct) => selectProduct !== id)
      : [...(selectedProducts ?? []), id];
    setSelectedProducts(handleNewProducts);
    console.log(handleNewProducts);
    return handleNewProducts;
    // console.log(selectedProducts);
    // const index = selectedProducts.indexOf(id);
    // console.log(index);
    // if (index > -1) {
    //   return setSelectedProducts(selectedProducts.splice(index, 1));
    // }
    // return setSelectedProducts((prevState) => [
    //   id,
    //   ...prevState?.selectedProducts,
    // ]);
  };

  const handleCreate = () => {
    const onSubmit = async (data) => {
      const parsedData = {
        ...data,
        assigned_products: selectedProducts,
      };
      await clientRequest.postRecord(parsedData);
      renderData.setRender(!renderData.render);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            control={control}
            name="selectedProducts"
            render={({ onChange }) => {
              return (
                <Stack border="1px" borderColor="gray.200" padding={4}>
                  <Text fontSize="xl">Asignar productos</Text>
                  <CheckboxGroup colorScheme="blue">
                    {products.map((product) => (
                      <Checkbox
                        id={product._id}
                        onChange={() => {
                          onChange;
                          return onChangeProductSelected(product._id);
                        }}
                        value={product._id}
                      >
                        {product.name}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </Stack>
              );
            }}
          />
          <Input {...register('name')} variant="flushed" placeholder="Nombre" />
          <Input
            {...register('cuit')}
            variant="flushed"
            type="number"
            placeholder="CUIT"
          />
          <Input
            {...register('address')}
            variant="flushed"
            placeholder="Dirección"
          />
          <Input
            {...register('contacto')}
            variant="flushed"
            placeholder="Contacto"
          />
          <Input
            {...register('checkingAccount')}
            variant="flushed"
            type="number"
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
      const parsedData = {
        ...data,
        assigned_products: selectedProducts,
      };
      await clientRequest.updateRecord(_id, parsedData);
      renderData.setRender(!renderData.render);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            control={control}
            name="selectedProducts"
            render={({ onChange }) => {
              return (
                <Stack border="1px" borderColor="gray.200" padding={4}>
                  <Text fontSize="xl">Producto asignados</Text>
                  <CheckboxGroup
                    colorScheme="blue"
                    defaultValue={data.assigned_products}
                  >
                    {products.map((product) => (
                      <Checkbox
                        id={product._id}
                        onChange={() => {
                          onChange;
                          return onChangeProductSelected(product._id);
                        }}
                        value={product._id}
                      >
                        {product.name}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </Stack>
              );
            }}
          />
          <Input
            {...register('name')}
            defaultValue={data.name}
            variant="flushed"
            placeholder="Nombre"
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
            {...register('contact')}
            defaultValue={data.contact}
            variant="flushed"
            placeholder="Contacto"
          />
          <Input
            {...register('comment')}
            defaultValue={data.comment}
            variant="flushed"
            placeholder="Comentario"
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
