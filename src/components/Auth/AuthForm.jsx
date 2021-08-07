import { Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import request from '../../api/authRequest';
import { login } from '../../util/authHelper';
import { ErrorMessage } from '@hookform/error-message';
import { CustomAlert } from '../CustomAlert';

const AuthForm = () => {
  const h = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    const submitRequest = await request.putAuth(data);

    if (submitRequest?.accessToken) {
      login(submitRequest.accessToken);
      h.push('/home');
    } else {
      setError(
        'password',
        { type: 'focus', message: 'Error de credenciales' },
        { shouldFocus: true },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register('email', { required: 'Email requerido.' })}
          />
        </FormControl>
        <FormControl id="password">
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <CustomAlert text={message} />}
          />
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            {...register('password', { required: 'Contraseña requerida.' })}
          />
        </FormControl>
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <CustomAlert text={message} />}
        />
        <Stack spacing={10}>
          <Button
            type="submit"
            colorScheme="blue"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Ingresar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AuthForm;
