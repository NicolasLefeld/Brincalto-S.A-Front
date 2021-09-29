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
  const [productsParsedToSend, setProductsParsedToSend] = useState([]);

  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      remitos: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'remitos',
  });

  const isClientSelected = watch('client_id');

  const _id = data?._id;

  handleClients();
  handleProducts();
  handleCleanProductsParsedWhenOpenModal();

  const onSubmit = async (data) => {
    const parsedProducts = data?.remitos.map((remito) => remito.product_id);
    let uniqueProducts = [...new Set(parsedProducts)];
    setProductsSelected(uniqueProducts);
    onOpen();

    // await remitosRequest.postRecord(parsedData);
    // renderData.setRender(!renderData.render);
  };

  useEffect(() => {
    console.log(productsParsedToSend);
  }, [productsParsedToSend]);

  const handleProductsValues = (data, productId) => {
    const price = data.target.value;
    const todosLosRemitos = watch('remitos');
    return setProductsParsedToSend(
      productsParsedToSend.length > 0
        ? productsParsedToSend.map((remito) => {
            if (remito.product_id === productId) {
              return {
                ...remito,
                price,
              };
            } else {
              return {
                ...remito,
              };
            }
          })
        : todosLosRemitos.map((remito) => {
            if (remito.product_id === productId) {
              return {
                ...remito,
                price,
              };
            } else {
              return {
                ...remito,
              };
            }
          }),
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
          {isClientSelected && (
            <>
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
                        <option value={'28m3'}>Venta x 28m3</option>
                        <option value={'ton'}>Venta x TN</option>
                        <option value={'6m3'}>Venta x 6m3</option>
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
              <Button color="green.500" fontSize="md" onClick={() => append()}>
                Agregar remito
              </Button>
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
            <Button colorScheme="blue" mr={3}>
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
      isOpen && setProductsParsedToSend([]);
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
