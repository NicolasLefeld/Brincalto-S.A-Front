import React from "react";
import { Table as ChakraTable, Box } from "@chakra-ui/react";

const Table = ({ tableContent }) => {
    console.log(tableContent);
    return (
        <Box overflowX="auto">
            <ChakraTable variant="striped">
                {tableContent.head}
                {tableContent.body}
            </ChakraTable>
        </Box>
    );
};

export default Table;
