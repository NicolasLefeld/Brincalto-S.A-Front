import {
  Spacer,
  Input,
  Stack,
  Button,
  Text,
  DrawerFooter,
  Select,
  Flex,
  HStack,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import clientRequest from '../../api/clientRequests';
import productRequest from '../../api/productsRequests';
import DatePicker from '../../components/DatePicker';
import remitosRequest from '../../api/remitosRequests';

const RemitosForm = ({ renderData, data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [providers, setProviders] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsSelected, setProductsSelected] = useState([]);
  const [remitosWithPrice, setRemitosWithPrice] = useState([]);

  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      remitos: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'remitos',
  });

  const idClientSelected = watch('client_id');
  const allRemitos = watch('remitos');

  const _id = data?._id;

  handleClients();
  handleProducts();
  handleCleanProductsParsedWhenOpenModal();

  const onSubmit = async (data) => {
    const parsedProducts = data?.remitos.map((remito) => remito.product_id);
    let uniqueProducts = [...new Set(parsedProducts)];
    setProductsSelected(uniqueProducts);
    onOpen();
  };

  const handleSubmitRemitos = async () => {
    try {
      const result = await Promise.all(
        remitosWithPrice?.map(async (remito) => {
          await remitosRequest.postRecord({
            ...remito,
            client_id: idClientSelected,
            status: 'pending',
          });
        }),
      );
      renderData.setRender(!renderData.render);
      onClose();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const addPriceToRemitos = (remitos, IdremitoToAddPrice, price) =>
    remitos?.map((remito) => {
      if (remito.product_id === IdremitoToAddPrice) {
        return {
          ...remito,
          price,
        };
      } else {
        return {
          ...remito,
        };
      }
    });

  const handleProductsValues = (data, productId) => {
    const price = data.target.value;
    const allRemitos = watch('remitos');
    return setRemitosWithPrice(
      remitosWithPrice.length > 0
        ? addPriceToRemitos(remitosWithPrice, productId, price)
        : addPriceToRemitos(allRemitos, productId, price),
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Text fontSize="xl">Cliente</Text>
          <Select
            {...register('client_id')}
            variant="flushed"
            placeholder="Seleccione un cliente"
          >
            {providers?.map((provider) => (
              <option key={provider._id} value={provider._id}>
                {provider.name}
              </option>
            ))}
          </Select>
          {idClientSelected && (
            <>
              <Button
                spacing={10}
                color="green.500"
                fontSize="md"
                onClick={() => append({ type: allRemitos[0]?.type })}
              >
                Agregar remito
              </Button>
              {fields.map((field, index) => {
                const typeRemito = watch(`remitos.${index}.type`, false);
                return (
                  <Stack key={field.id}>
                    <Flex alignContent justifyContent>
                      <Center>
                        <Text fontSize="xl">{`Remito ${index + 1}`}</Text>
                      </Center>
                      <Spacer />
                      <Center>
                        <Button
                          color="red.500"
                          fontSize="md"
                          onClick={() => remove(index)}
                        >
                          Eliminar remito
                        </Button>
                      </Center>
                    </Flex>
                    <HStack>
                      <Select
                        {...register(`remitos.${index}.type`)}
                        variant="flushed"
                        placeholder="Tipo de remito"
                        required
                      >
                        <option
                          value={'batea'}
                          selected={allRemitos[index].type === 'batea'}
                        >
                          Venta x 28m3
                        </option>
                        <option
                          value={'ton'}
                          selected={allRemitos[index].type === 'ton'}
                        >
                          Venta x TN
                        </option>
                        <option
                          value={'chasis'}
                          selected={allRemitos[index].type === 'chasis'}
                        >
                          Venta x 6m3
                        </option>
                      </Select>
                      <Controller
                        control={control}
                        name={`remitos.${index}.date`}
                        defaultValue={new Date()}
                        render={({ field }) => (
                          <DatePicker
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                          />
                        )}
                      />
                      <Input
                        {...register(`remitos.${index}.remito_id`)}
                        variant="flushed"
                        placeholder="N° Remito"
                      />
                      <Select
                        {...register(`remitos.${index}.product_id`)}
                        variant="flushed"
                        placeholder="Seleccione un producto"
                        required
                      >
                        {products?.map((product) => (
                          <option value={product._id}>{product.name}</option>
                        ))}
                      </Select>
                      <Input
                        {...register(`remitos.${index}.observation`)}
                        variant="flushed"
                        placeholder="Observaciónes"
                      />
                      {typeRemito === 'ton' && (
                        <Input
                          {...register(`remitos.${index}.tons`)}
                          variant="flushed"
                          placeholder="Toneladas"
                          type="number"
                        />
                      )}
                    </HStack>
                  </Stack>
                );
              })}
            </>
          )}
        </Stack>
        <DrawerFooter>
          {idClientSelected && (
            <Button type="submit" colorScheme="blue">
              Crear
            </Button>
          )}
        </DrawerFooter>
      </form>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Finaliza la carga de remitos</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {productsSelected?.map((productSelected, index) => (
              <FormControl mt={4}>
                <FormLabel>
                  {
                    products.find((product) => productSelected === product._id)
                      ?.name
                  }
                </FormLabel>
                <Input
                  placeholder="Precio"
                  onChange={(e) => handleProductsValues(e, productSelected)}
                />
              </FormControl>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitRemitos}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  function handleClients() {
    useEffect(async () => {
      const providers = await clientRequest.getRecords();
      setProviders(providers);
    }, []);
  }

  function handleProducts() {
    useEffect(async () => {
      const products = await productRequest.getRecords();
      setProducts(products);
    }, []);
  }

  function handleCleanProductsParsedWhenOpenModal() {
    useEffect(() => {
      isOpen && setRemitosWithPrice([]);
    }, [isOpen]);
  }
};

export default RemitosForm;

// if (_id) {
//   const onSubmit = async (data) => {
//     await remitosRequest.updateRecord(_id, data);
//     renderData.setRender(!renderData.render);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Stack>
//         <Input
//           {...register('name')}
//           defaultValue={data.name}
//           variant="flushed"
//           placeholder="Nombre"
//         />
//         <Input
//           {...register('comment')}
//           defaultValue={data.comment}
//           variant="flushed"
//           placeholder="Comentario"
//         />
//         <Input
//           {...register('cuit')}
//           defaultValue={data.cuit}
//           variant="flushed"
//           placeholder="CUIT"
//         />
//         <Input
//           {...register('address')}
//           defaultValue={data.address}
//           variant="flushed"
//           placeholder="Dirección"
//         />
//         <Input
//           {...register('checkingAccount')}
//           defaultValue={data.checkingAccount}
//           variant="flushed"
//           type="number"
//           placeholder="Cuenta corriente"
//         />
//       </Stack>
//       <DrawerFooter>
//         <Button type="submit" colorScheme="blue">
//           Modificar
//         </Button>
//       </DrawerFooter>
//     </form>
//   );
// }
