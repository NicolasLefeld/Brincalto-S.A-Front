import {
  Checkbox,
  Input,
  Stack,
  Button,
  DrawerFooter,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import request from '../api/stockRequests';

const StockForm = ({ renderData, data, type }) => {
  const { register, handleSubmit, watch } = useForm();
  const _id = data?._id;

  const insertStock = async (data) => {
    await request.postRecord(data, type);
    renderData.setRender(!renderData.render);
  };

  const updateStock = async (data) => {
    if (data?.isMovement) {
      await request.updateRecordWithMovement(_id, data, type);
    } else {
      await request.updateRecord(_id, data, type);
    }
    renderData.setRender(!renderData.render);
  };

  const IsAMovement = watch('isMovement', true);

  console.log(data);
  if (type === 'spare') {
    if (_id) {
      return (
        <form onSubmit={handleSubmit(updateStock)}>
          <Stack>
            <Input
              {...register('product')}
              variant="flushed"
              placeholder="Producto"
              defaultValue={data.product}
              isDisabled={IsAMovement}
            />
            <Checkbox {...register('isMovement')} defaultIsChecked>
              ¿Es un movimiento?
            </Checkbox>
            {IsAMovement ? (
              <>
                <Input
                  {...register('comment')}
                  variant="flushed"
                  placeholder="Observación"
                  defaultValue={data.comment}
                />
                <Input
                  {...register('quantity')}
                  variant="flushed"
                  type="number"
                  placeholder="Cantidad"
                  defaultValue={data.quantity}
                />
              </>
            ) : (
              <>
                <Input
                  {...register('comment')}
                  variant="flushed"
                  placeholder="Observación"
                  defaultValue={data.comment}
                />
                <Input
                  {...register('quantity')}
                  variant="flushed"
                  type="number"
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
            {...register('product')}
            variant="flushed"
            placeholder="Producto"
          />
          <Input
            {...register('comment')}
            variant="flushed"
            placeholder="Observación"
          />
          <Input
            {...register('quantity')}
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
  } else if (type === 'oil') {
    if (_id) {
      return (
        <form onSubmit={handleSubmit(updateStock)}>
          <Stack>
            <Input
              {...register('comment')}
              variant="flushed"
              placeholder="Aceite"
              defaultValue={data.comment}
            />
            <Checkbox {...register('isMovement')} defaultIsChecked>
              ¿Es un movimiento?
            </Checkbox>
            {IsAMovement ? (
              <>
                <Input
                  {...register('observation')}
                  variant="flushed"
                  placeholder="Observación"
                />
                <Input
                  {...register('littersTaken')}
                  variant="flushed"
                  type="number"
                  placeholder="Litros tomados"
                />
              </>
            ) : (
              <>
                <Input
                  {...register('liters')}
                  variant="flushed"
                  placeholder="Litros Iniciales"
                  type="number"
                  defaultValue={data.liters}
                />
                <Input
                  {...register('availableLitters')}
                  variant="flushed"
                  type="number"
                  placeholder="Litros Disponibles"
                  defaultValue={data.availableLitters}
                />
                <Input
                  {...register('costPerLitter')}
                  variant="flushed"
                  type="number"
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
            {...register('comment')}
            variant="flushed"
            placeholder="Aceite"
          />
          <Input
            {...register('liters')}
            variant="flushed"
            placeholder="Litros Iniciales"
            type="number"
          />
          <Input
            {...register('availableLitters')}
            variant="flushed"
            placeholder="Litros Disponibles"
            type="number"
          />
          <Input
            {...register('costPerLitter')}
            variant="flushed"
            type="number"
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
