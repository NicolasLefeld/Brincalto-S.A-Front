import React from "react";
import { Table as ChakraTable } from "@chakra-ui/react";

const Table = ({ tableContent }) => {
  return (
    <ChakraTable variant="striped">
      {tableContent.head}
      {tableContent.body}
    </ChakraTable>
  );
};

export default Table;
