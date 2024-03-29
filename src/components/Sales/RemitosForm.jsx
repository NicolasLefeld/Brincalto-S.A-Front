import {
    Input,
    Stack,
    Button,
    DrawerFooter,
    Select,
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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import clientRequest from "../../api/clientRequests";
import productRequest from "../../api/productsRequests";
import DatePicker from "../../components/DatePicker";
import remitosRequest from "../../api/remitosRequests";
import { DeleteIcon } from "@chakra-ui/icons";
import SelectClient from "../Clients/SelectClient";

const RemitosForm = ({ renderData, data }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [products, setProducts] = useState([]);
    const [productsSelected, setProductsSelected] = useState([]);
    const [remitosWithPrice, setRemitosWithPrice] = useState([]);

    const form = useForm({
        defaultValues: {
            remitos: [],
        },
    });

    const { register, handleSubmit, control, watch, reset } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "remitos",
    });

    const idClientSelected = watch("clientId");
    const allRemitos = watch("remitos");

    const id = data?.id;

    handleProducts();
    handleCleanProductsParsedWhenOpenModal();

    const onSubmit = async (data) => {
        const parsedProducts = data?.remitos.map((remito) => remito.productId);
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
                        clientId: idClientSelected,
                        status: "pending",
                    });
                }),
            );
            renderData.setRender(!renderData.render);
            onClose();
            reset();
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    const addPriceToRemitos = (remitos, IdremitoToAddPrice, price) =>
        remitos?.map((remito) => {
            if (remito.productId === IdremitoToAddPrice) {
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
        const allRemitos = watch("remitos");
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
                    <SelectClient form={form} />
                    {idClientSelected && (
                        <>
                            {fields.map((field, index) => {
                                const typeRemito = watch(
                                    `remitos.${index}.type`,
                                    false,
                                );
                                return (
                                    <Stack key={field.id}>
                                        <HStack>
                                            <Select
                                                {...register(
                                                    `remitos.${index}.type`,
                                                )}
                                                variant="flushed"
                                                placeholder="Tipo de remito"
                                                required
                                            >
                                                <option
                                                    value={"batea"}
                                                    selected={
                                                        allRemitos[index]
                                                            .type === "batea"
                                                    }
                                                >
                                                    Venta x 28m3
                                                </option>
                                                <option
                                                    value={"ton"}
                                                    selected={
                                                        allRemitos[index]
                                                            .type === "ton"
                                                    }
                                                >
                                                    Venta x TN
                                                </option>
                                                <option
                                                    value={"chasis"}
                                                    selected={
                                                        allRemitos[index]
                                                            .type === "chasis"
                                                    }
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
                                                        onChange={(date) =>
                                                            field.onChange(date)
                                                        }
                                                        selected={field.value}
                                                    />
                                                )}
                                            />
                                            <Input
                                                {...register(
                                                    `remitos.${index}.remitoId`,
                                                )}
                                                variant="flushed"
                                                placeholder="N° Remito"
                                            />
                                            <Select
                                                {...register(
                                                    `remitos.${index}.productId`,
                                                )}
                                                variant="flushed"
                                                placeholder="Seleccione un producto"
                                                required
                                            >
                                                {products?.map((product) => (
                                                    <option value={product.id}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </Select>
                                            <Input
                                                {...register(
                                                    `remitos.${index}.observation`,
                                                )}
                                                variant="flushed"
                                                placeholder="Observaciónes"
                                            />
                                            {typeRemito === "ton" && (
                                                <Input
                                                    {...register(
                                                        `remitos.${index}.tons`,
                                                    )}
                                                    variant="flushed"
                                                    placeholder="Toneladas"
                                                    type="number"
                                                    step="any"
                                                />
                                            )}
                                            <Center>
                                                <Button
                                                    color="red.500"
                                                    fontSize="md"
                                                    leftIcon={<DeleteIcon />}
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                ></Button>
                                            </Center>
                                        </HStack>
                                    </Stack>
                                );
                            })}
                            <Button
                                spacing={10}
                                color="green.500"
                                fontSize="md"
                                onClick={() =>
                                    append({ type: allRemitos[0]?.type })
                                }
                            >
                                Agregar remito
                            </Button>
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
                                        products.find(
                                            (product) =>
                                                productSelected === product.id,
                                        )?.name
                                    }
                                </FormLabel>
                                <Input
                                    placeholder="Precio"
                                    onChange={(e) =>
                                        handleProductsValues(e, productSelected)
                                    }
                                />
                            </FormControl>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleSubmitRemitos}
                        >
                            Guardar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

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

// if (id) {
//   const onSubmit = async (data) => {
//     await remitosRequest.updateRecord(id, data);
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
