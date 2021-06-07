import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

function StatsCard(props) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function BasicStatistics() {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"6xl"}
        py={10}
        fontWeight={"bold"}
      >
        Brincalto S. A.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={"Cuentas corrientes"} stat={"9.999.999$"} />
        <StatsCard title={"Gastos del mes"} stat={"600$"} />
        <StatsCard title={"Items en stock"} stat={"20"} />
        <StatsCard title={"Cosa random"} stat={"asdf"} />
        <StatsCard title={"testtt"} stat={"test"} />
      </SimpleGrid>
    </Box>
  );
}
