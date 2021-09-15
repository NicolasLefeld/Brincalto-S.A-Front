import { Input, Stack, Button, DrawerFooter } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import request from '../../api/productsRequests';

const ProductsForm = ({ renderData, data }) => {
  const { register, handleSubmit } = useForm();
  const _id = data?._id;

  if (_id) {
    const onSubmit = async (data) => {
      await request.updateRecord(_id, data);
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
    await request.postRecord(data);
    renderData.setRender(!renderData.render);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Input {...register('name')} variant="flushed" placeholder="Nombre" />
      </Stack>
      <DrawerFooter>
        <Button type="submit" colorScheme="blue">
          Crear
        </Button>
      </DrawerFooter>
    </form>
  );
};

export default ProductsForm;
