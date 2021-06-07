import { HStack, Box, useRadioGroup, useRadio, Center } from "@chakra-ui/react";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="50%">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function SelectTypeStock({ setType }) {
  const options = [
    { value: "Repuestos", key: "spare" },
    { value: "Aceites", key: "oil" },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "stock",
    defaultValue: options[0].value,
    onChange: (e) => {
      setType(options.find((option) => option.value === e).key)
    },
  });

  const group = getRootProps();

  return (
    <HStack {...group} mb={4}>
      {options.map(({ key, value }) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio} >
            <Center>{value}</Center>
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default SelectTypeStock;
