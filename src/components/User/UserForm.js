import { Input, Stack, Button, DrawerFooter, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import request from '../../api/userRequests';

const UserForm = ({ renderData, data }) => {
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
            {...register('email')}
            defaultValue={data?.email}
            variant="flushed"
            placeholder="Email"
          />
          <Input
            {...register('password')}
            variant="flushed"
            type="number"
            placeholder="Contraseña"
            defaultValue="1234"
            value="1234"
          />
          <Select {...register('role')}>
            <option value="admin">Admin</option>
            <option value="operator">Operador</option>
          </Select>
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
        <Input
          {...register('email')}
          defaultValue={data?.email}
          variant="flushed"
          placeholder="Email"
        />
        <Input
          {...register('password')}
          defaultValue={data?.password}
          variant="flushed"
          type="number"
          placeholder="Contraseña"
        />
        <Select {...register('role')}>
          <option value="admin">Administrador</option>
          <option value="operator">Operador</option>
        </Select>
      </Stack>
      <DrawerFooter>
        <Button type="submit" colorScheme="blue">
          Crear
        </Button>
      </DrawerFooter>
    </form>
  );
};

export default UserForm;
