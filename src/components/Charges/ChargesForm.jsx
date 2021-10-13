import {
  Spacer,
  Textarea,
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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import clientRequest from "../../api/clientRequests";
import productRequest from "../../api/productsRequests";
import DatePicker from "../DatePicker";
import chargesRequest from "../../api/chargesRequests";
import { DeleteIcon } from "@chakra-ui/icons";
import SelectClient from "../Clients/SelectClient";

const ChargesForm = ({ renderData, data }) => {
  const form = useForm({
    defaultValues: {
      charges: [],
    },
  });

  const { register, handleSubmit, control, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "charges",
  });

  const idClientSelected = watch("client_id");
  const allCharges = watch("charges");
  const paymentComment = watch("paymentComment");
  const _id = data?._id;

  const onSubmit = async (data) => {
    try {
      console.log(allCharges);
      const result = await Promise.all(
        allCharges?.map(async (charge) => {
          await chargesRequest.postRecord(
            {
              ...charge,
              clientId: idClientSelected,
              paymentComment,
            },
            charge.paymentMethod,
          );
        }),
      );
      renderData.setRender(!renderData.render);
      return result;
    } catch (error) {
      console.log(error);
    }
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
                  `charges.${index}.paymentMethod`,
                  false,
                );
                return (
                  <Stack key={field.id}>
                    <HStack>
                      <Select
                        {...register(`charges.${index}.paymentMethod`)}
                        variant="flushed"
                        placeholder="Tipo de pago"
                        required
                      >
                        <option
                          value={"check"}
                          selected={allCharges[index].paymentMethod === "check"}
                        >
                          Cheque
                        </option>
                        <option
                          value={"cash"}
                          selected={allCharges[index].paymentMethod === "cash"}
                        >
                          Efectivo
                        </option>
                        <option
                          value={"others"}
                          selected={
                            allCharges[index].paymentMethod === "others"
                          }
                        >
                          Otros
                        </option>
                      </Select>
                      <Controller
                        control={control}
                        name={`charges.${index}.date`}
                        defaultValue={new Date()}
                        render={({ field }) => (
                          <DatePicker
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                          />
                        )}
                      />

                      <Input
                        {...register(`charges.${index}.amount`)}
                        variant="flushed"
                        placeholder="Importe"
                        type="number"
                        step="any"
                      />
                      {typeRemito === "check" && (
                        <>
                          <Input
                            {...register(`charges.${index}.checkNumber`)}
                            variant="flushed"
                            placeholder="Numero de cheque"
                            type="number"
                            step="any"
                          />
                          <Input
                            {...register(`charges.${index}.bank`)}
                            variant="flushed"
                            placeholder="Banco"
                          />
                          <Controller
                            control={control}
                            name={`charges.${index}.expirationDate`}
                            render={({ field }) => (
                              <DatePicker
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                                placeholder="Fecha expiración"
                              />
                            )}
                          />
                        </>
                      )}
                      {typeRemito === "others" && (
                        <Input
                          {...register(`charges.${index}.commentOthers`)}
                          variant="flushed"
                          placeholder="Comentario"
                        />
                      )}
                      <Center>
                        <Button
                          color="red.500"
                          fontSize="md"
                          leftIcon={<DeleteIcon />}
                          onClick={() => remove(index)}
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
                onClick={() => append({ type: allCharges[0]?.paymentMethod })}
              >
                Agregar cobro
              </Button>
            </>
          )}
          <Textarea
            {...register("paymentComment")}
            placeholder="Observación para cada pago ingresado"
            size="sm"
          />
        </Stack>
        <DrawerFooter>
          {idClientSelected && (
            <Button type="submit" colorScheme="blue">
              Crear
            </Button>
          )}
        </DrawerFooter>
      </form>
    </>
  );
};

export default ChargesForm;

// if (_id) {
//   const onSubmit = async (data) => {
//     await chargesRequest.updateRecord(_id, data);
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
