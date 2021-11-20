import {
    Textarea,
    Input,
    Stack,
    Button,
    DrawerFooter,
    Select,
    HStack,
    Center,
} from "@chakra-ui/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "../DatePicker";
import chargesRequest from "../../api/chargesRequests";
import { DeleteIcon } from "@chakra-ui/icons";
import SelectClient from "../Clients/SelectClient";
import MultiSelectMenu from "../Multiselect";
import { useEffect, useState } from "react";
import invoicesRequests from "../../api/invoicesRequests";

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

    const idClientSelected = watch("clientId");
    const allCharges = watch("charges");
    const paymentComment = watch("paymentComment");

    const [pendingInvoicesOfClient, setPendingInvoicesOfClient] = useState([]);
    const [invoicesAll, setInvoicesAll] = useState([]);

    useEffect(() => {
        getInvoicesPending();
    }, [idClientSelected]);

    const getInvoicesPending = async () => {
        if (idClientSelected) {
            const response = await invoicesRequests.getInvoicesPendingById(
                idClientSelected,
            );
            setPendingInvoicesOfClient(response);
        }
    };

    const onSubmit = async (data) => {
        try {
            const result = await Promise.all(
                allCharges?.map(async (charge) => {
                    return await chargesRequest.postRecord({
                        ...charge,
                        clientId: idClientSelected,
                        paymentComment,
                    });
                }),
            );
            renderData.setRender(!renderData.render);
            const idAllSales = result?.map((charge) => charge._id);
            const pdf = await chargesRequest.downloadPDF({
                details: idAllSales,
                invoices: invoicesAll,
            });
            const pdfBlob = new Blob([pdf], { type: "application/pdf" });
            const blobUrl = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", `Cobros-${new Date()}.pdf`);
            link.click();
            link.remove();
            console.log(result);
            URL.revokeObjectURL(blobUrl);
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    const isPendingInvoices = Array.isArray(pendingInvoicesOfClient);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <SelectClient form={form} />
                    {idClientSelected && (
                        <>
                            <MultiSelectMenu
                                label={
                                    isPendingInvoices
                                        ? "Facturas pendientes del cliente"
                                        : "No hay facturas pendientes del cliente"
                                }
                                options={pendingInvoicesOfClient}
                                onChange={setInvoicesAll}
                                disabled={!isPendingInvoices}
                            />
                            {fields.map((field, index) => {
                                const typeRemito = watch(
                                    `charges.${index}.paymentMethod`,
                                    false,
                                );
                                return (
                                    <Stack key={field.id}>
                                        <HStack>
                                            <Select
                                                {...register(
                                                    `charges.${index}.paymentMethod`,
                                                )}
                                                variant="flushed"
                                                placeholder="Tipo de pago"
                                                required
                                            >
                                                <option
                                                    value={"check"}
                                                    selected={
                                                        allCharges[index]
                                                            .paymentMethod ===
                                                        "check"
                                                    }
                                                >
                                                    Cheque
                                                </option>
                                                <option
                                                    value={"cash"}
                                                    selected={
                                                        allCharges[index]
                                                            .paymentMethod ===
                                                        "cash"
                                                    }
                                                >
                                                    Efectivo
                                                </option>
                                                <option
                                                    value={"others"}
                                                    selected={
                                                        allCharges[index]
                                                            .paymentMethod ===
                                                        "others"
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
                                                        onChange={(date) =>
                                                            field.onChange(date)
                                                        }
                                                        selected={field.value}
                                                    />
                                                )}
                                            />

                                            <Input
                                                {...register(
                                                    `charges.${index}.amount`,
                                                )}
                                                variant="flushed"
                                                placeholder="Importe"
                                                type="number"
                                                step="any"
                                            />
                                            {typeRemito === "check" && (
                                                <>
                                                    <Input
                                                        {...register(
                                                            `charges.${index}.checkNumber`,
                                                        )}
                                                        variant="flushed"
                                                        placeholder="Numero de cheque"
                                                        type="number"
                                                        step="any"
                                                    />
                                                    <Input
                                                        {...register(
                                                            `charges.${index}.bank`,
                                                        )}
                                                        variant="flushed"
                                                        placeholder="Banco"
                                                    />
                                                    <Controller
                                                        control={control}
                                                        name={`charges.${index}.expirationDate`}
                                                        render={({ field }) => (
                                                            <DatePicker
                                                                onChange={(
                                                                    date,
                                                                ) =>
                                                                    field.onChange(
                                                                        date,
                                                                    )
                                                                }
                                                                selected={
                                                                    field.value
                                                                }
                                                                placeholder="Fecha expiración"
                                                            />
                                                        )}
                                                    />
                                                </>
                                            )}
                                            {typeRemito === "others" && (
                                                <Input
                                                    {...register(
                                                        `charges.${index}.commentOthers`,
                                                    )}
                                                    variant="flushed"
                                                    placeholder="Comentario"
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
                                    append({
                                        type: allCharges[0]?.paymentMethod,
                                    })
                                }
                            >
                                Agregar cobro
                            </Button>
                        </>
                    )}
                    <Textarea
                        {...register("paymentComment")}
                        placeholder="Observación para cada cobro ingresado"
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
