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
import paymentsRequest from "../../api/paymentRequests";
import { DeleteIcon } from "@chakra-ui/icons";
import SelectProvider from "../Provider/SelectProvider";
import checkWalletRequest from "../../api/checkWalletRequest";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../util/currencyHelper";

const PaymentsForm = ({ renderData, data }) => {
    const [checks, setChecks] = useState([]);

    useEffect(() => {
        const getChecks = async () => {
            const checks = await checkWalletRequest.getRecords();
            if (checks) {
                if (Array.isArray(checks)) {
                    const checksParsed = checks.filter(
                        (check) => check.status === "received",
                    );
                    console.log(checksParsed);
                    return setChecks(checksParsed);
                }
                return setChecks(checks);
            }
        };

        getChecks();
    }, [checks]);

    const form = useForm({
        defaultValues: {
            payments: [],
        },
    });

    const { register, handleSubmit, control, watch } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "payments",
    });

    const isProviderSelected = watch("providerId");
    const allCharges = watch("payments");
    const paymentComment = watch("paymentComment");
    const id = data?.id;

    const onSubmit = async (data) => {
        try {
            const result = await Promise.all(
                allCharges?.map(async (charge) => {
                    console.log("acaaaa", charge);
                    return await paymentsRequest.postRecord({
                        ...charge,
                        providerId: isProviderSelected,
                        paymentComment,
                        checkId: charge.check_id,
                        // paymentMethod:
                        //     charge.paymentMethod === "checkOwn" ||
                        //     charge.paymentMethod === "check"
                        //         ? "check"
                        //         : charge.paymentMethod,
                    });
                }),
            );
            renderData.setRender(!renderData.render);
            const idAllSales = result?.map((charge) => charge._id);
            const pdf = await paymentsRequest.downloadPDF(idAllSales);
            const pdfBlob = new Blob([pdf], { type: "application/pdf" });
            const blobUrl = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", `Orden de pago - ${new Date()}.pdf`);
            link.click();
            link.remove();
            // return result;
            URL.revokeObjectURL(blobUrl);
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <SelectProvider form={form} />
                    {isProviderSelected && (
                        <>
                            {fields.map((field, index) => {
                                const typeRemito = watch(
                                    `payments.${index}.paymentMethod`,
                                    false,
                                );
                                return (
                                    <Stack key={field.id}>
                                        <HStack>
                                            <Select
                                                {...register(
                                                    `payments.${index}.paymentMethod`,
                                                )}
                                                variant="flushed"
                                                placeholder="Tipo de pago"
                                                required
                                            >
                                                <option
                                                    value={"checkOwn"}
                                                    selected={
                                                        allCharges[index]
                                                            .paymentMethod ===
                                                        "checkOwn"
                                                    }
                                                >
                                                    Cheque Propio
                                                </option>
                                                <option
                                                    value={"checkThirdParty"}
                                                    selected={
                                                        allCharges[index]
                                                            .paymentMethod ===
                                                        "checkThirdParty"
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
                                            {typeRemito ===
                                            "checkThirdParty" ? (
                                                <Select
                                                    {...register(
                                                        `payments.${index}.check_id`,
                                                    )}
                                                    variant="flushed"
                                                    placeholder="Seleccionate un cheque pa"
                                                    required
                                                >
                                                    {Array.isArray(checks) &&
                                                        checks?.map((check) => (
                                                            <option
                                                                value={check.id}
                                                            >
                                                                Vto{" "}
                                                                {new Date(
                                                                    check.expirationDate,
                                                                ).toLocaleDateString(
                                                                    "es-AR",
                                                                )}
                                                                ,{" "}
                                                                {formatCurrency(
                                                                    check.amount,
                                                                )}
                                                            </option>
                                                        ))}
                                                </Select>
                                            ) : (
                                                <>
                                                    <Controller
                                                        control={control}
                                                        name={`payments.${index}.date`}
                                                        defaultValue={
                                                            new Date()
                                                        }
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
                                                            />
                                                        )}
                                                    />
                                                    <Input
                                                        {...register(
                                                            `payments.${index}.amount`,
                                                        )}
                                                        variant="flushed"
                                                        placeholder="Importe"
                                                        type="number"
                                                        step="any"
                                                    />
                                                    {typeRemito ===
                                                        "checkOwn" && (
                                                        <>
                                                            <Input
                                                                {...register(
                                                                    `payments.${index}.checkNumber`,
                                                                )}
                                                                variant="flushed"
                                                                placeholder="Numero de cheque"
                                                                type="number"
                                                                step="any"
                                                            />
                                                            <Input
                                                                {...register(
                                                                    `payments.${index}.bank`,
                                                                )}
                                                                variant="flushed"
                                                                placeholder="Banco"
                                                            />
                                                            <Controller
                                                                control={
                                                                    control
                                                                }
                                                                name={`payments.${index}.expirationDate`}
                                                                render={({
                                                                    field,
                                                                }) => (
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
                                                    {typeRemito ===
                                                        "others" && (
                                                        <Input
                                                            {...register(
                                                                `payments.${index}.commentOthers`,
                                                            )}
                                                            variant="flushed"
                                                            placeholder="Comentario"
                                                        />
                                                    )}
                                                </>
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
                                        paymentMethod:
                                            allCharges[0]?.paymentMethod,
                                    })
                                }
                            >
                                Agregar Pago
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
                    {isProviderSelected && (
                        <Button type="submit" colorScheme="blue">
                            Crear
                        </Button>
                    )}
                </DrawerFooter>
            </form>
        </>
    );
};

export default PaymentsForm;
