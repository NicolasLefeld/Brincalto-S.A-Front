import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/react";
import { Stack, Text } from "@chakra-ui/layout";
import providerRequests from "../../api/providerRequests";

const SelectProvider = (props) => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { form, placeholder } = props;
    const { register } = form;

    fetchProviders();

    return (
        <Stack>
            <Text fontSize="xl">Listado de Proveedores</Text>
            {loading ? (
                <Spinner />
            ) : (
                <Select
                    variant="flushed"
                    placeholder={placeholder || "Seleccione un proveedor"}
                    {...register("providerId")}
                >
                    {providers?.map((provider) => (
                        <option value={provider.id}>{provider.name}</option>
                    ))}
                </Select>
            )}
        </Stack>
    );

    function fetchProviders() {
        useEffect(async () => {
            setLoading(true);
            const providers = await providerRequests.getRecords();
            if (providers) {
                setProviders(providers);
                return setLoading(false);
            }
        }, []);
    }
};

export default SelectProvider;
