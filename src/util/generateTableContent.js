import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  ButtonGroup,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Popover from "../components/Popover";
import Drawer from "../components/Drawer";
import getDescendantProp from "../util/getDescendantProp";

const generateTableContent = (
  columns,
  rows,
  renderData,
  request,
  drawerForm
) => {
  const keys = columns.map(({ key }) => key);

  const thead = columns.map((column, index) => (
    <Th key={uuidv4()}>
      {columns.find((col) => col.position === index).displayName}
    </Th>
  ));
  
  let tbody = rows.map((row) => (
    <Tr key={uuidv4()}>
      {keys.map((key) => {
        const rowValue = getDescendantProp(row, key);
        if (key === "action") {
          return (
            <Td key={uuidv4()}>
              <ButtonGroup>
                <Drawer
                  activationMessage="Editar cliente"
                  triggerButton={
                    <IconButton
                      colorScheme="blue"
                      aria-label="Edit client"
                      icon={<EditIcon />}
                    />
                  }
                >
                  {React.cloneElement(drawerForm, { data: row })}
                </Drawer>

                <Popover
                  message="¿Eliminar definitivamente?"
                  trigger={
                    <IconButton
                      colorScheme="red"
                      aria-label="Remove client"
                      icon={<DeleteIcon />}
                    />
                  }
                  body={
                    <Button
                      colorScheme="red"
                      onClick={async () => {
                        await request.deleteRecord(row._id);
                        renderData.setRender(!renderData.render);
                      }}
                    >
                      Eliminar
                    </Button>
                  }
                />
              </ButtonGroup>
            </Td>
          );
        }
        return <Td key={uuidv4()}>{rowValue}</Td>;
      })}
    </Tr>
  ));

  if (tbody.length === 0) {
    tbody = (
      <Tr>
        <Td colSpan={columns.length}>
          <Center>No se encontraron resultados</Center>
        </Td>
      </Tr>
    );
  }

  return {
    head: (
      <Thead>
        <Tr>{thead}</Tr>
      </Thead>
    ),
    body: <Tbody>{tbody}</Tbody>,
  };
};

export default generateTableContent;
