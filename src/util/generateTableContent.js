import React from 'react';
import { v4 as uuidv4 } from 'uuid';
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
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import Popover from '../components/Popover';
import Drawer from '../components/Drawer';
import getDescendantProp from '../util/getDescendantProp';
import { useLocation, useHistory } from 'react-router-dom';

const generateTableContent = (
  columns,
  rows,
  renderData,
  request,
  drawerForm,
) => {
  const history = useHistory();
  const location = useLocation();

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
        if (key === 'action') {
          return (
            <Td key={uuidv4()}>
              <ButtonGroup>
                <Drawer
                  activationMessage={`Editar ${location.pathname}`}
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

                {row.movements && (
                  <Popover
                    message={
                      row.movements.length === 0
                        ? 'No hay movimentos'
                        : 'Mostrando movimientos'
                    }
                    trigger={
                      <IconButton
                        colorScheme="yellow"
                        aria-label="Remove client"
                        icon={<InfoIcon />}
                      />
                    }
                    body={
                      <>
                        {row.movements.length !== 0 &&
                          row.movements.map((move, index) => (
                            <div
                              key={uuidv4()}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <p
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  padding: '20px',
                                  fontSize: '21px',
                                }}
                              >
                                {index + 1}
                              </p>
                              <div>
                                <p>Observación: {move.comment}</p>
                                <p>
                                  {`Fecha/hora: ${new Date(
                                    move.date,
                                  ).toLocaleString('es-AR')}`}
                                </p>
                                <p>Litros tomados:{move.littersTaken}</p>
                                <hr />
                              </div>
                            </div>
                          ))}
                      </>
                    }
                    // footer={
                    //   <Button
                    //     colorScheme="yellow"
                    //     onClick={() => redirect(row._id)}
                    //   >
                    //     Cargar Movimiento
                    //   </Button>
                    // }
                  />
                )}

                <Popover
                  message="¿Eliminar definitivamente?"
                  trigger={
                    <IconButton
                      colorScheme="red"
                      aria-label="Remove client"
                      icon={<DeleteIcon />}
                    />
                  }
                  footer={
                    <Button
                      colorScheme="red"
                      onClick={async () => {
                        await request.deleteRecord(row._id, row.type);
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
        if (key === 'liters') {
          return <Td>{`${row.availableLitters} de ${row.liters}`}</Td>;
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
