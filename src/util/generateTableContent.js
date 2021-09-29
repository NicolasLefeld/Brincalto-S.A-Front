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
  Text,
  Flex,
  Spacer,
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
  const location = useLocation();
  const { pathname } = location;
  const keys = columns.map(({ key }) => key);
  const thead = columns.map((column, index) => (
    <Th key={uuidv4()}>
      {columns.find((col) => col.position === index).displayName}
    </Th>
  ));
  const isSpare = pathname.includes('spare');
  const isOil = pathname.includes('oil');
  let tbody;

  if (Array.isArray(rows)) {
    tbody = rows.map((row) => {
      return (
        <Tr key={uuidv4()}>
          {keys.map((key) => {
            const rowValue = getDescendantProp(row, key);
            if (key === 'action') {
              const isSpareOrOil = isSpare || isOil;
              const handleType = isSpare ? 'Repuesto' : 'Aceite';
              return (
                <Td key={uuidv4()}>
                  <ButtonGroup>
                    <Drawer
                      activationMessage={`Editar ${
                        isSpareOrOil ? handleType : pathname
                      }`}
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
                                <Flex key={uuidv4()}>
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
                                  <Flex>
                                    <p>Observación: {move.comment}</p>
                                    <p>
                                      {`Fecha/hora: ${new Date(
                                        move.date,
                                      ).toLocaleString('es-AR')}`}
                                    </p>
                                    {isOil && (
                                      <p>Litros tomados: {move.littersTaken}</p>
                                    )}
                                    {isSpare && (
                                      <p>Cantidad: {move?.quantityTaken}</p>
                                    )}
                                    <hr />
                                  </Flex>
                                </Flex>
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

                    {row.assigned_products && (
                      <Popover
                        message={
                          row.assigned_products.length === 0
                            ? 'No hay productos asignados'
                            : 'Productos asignados'
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
                            {row.assigned_products.length !== 0 &&
                              row.assigned_products.map((product, index) => (
                                <Flex key={uuidv4()}>
                                  <Center>
                                    <Text fontSize="4xl">{index + 1}</Text>
                                  </Center>
                                  <Spacer />
                                  <Center>
                                    <Text fontSize="md">{product.name}</Text>
                                  </Center>
                                </Flex>
                              ))}
                          </>
                        }
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
            if (key === 'costPerLitter') {
              return <Td>{`${row.costPerLitter} $`}</Td>;
            }

            if (key === 'extras') {
              const rowExtras = (
                <Td key={uuidv4()}>
                  <ol>
                    {rowValue?.map((value) => (
                      <li
                        style={{ whiteSpace: 'nowrap' }}
                      >{`${value.concepto}:${value.amount}`}</li>
                    ))}
                  </ol>
                </Td>
              );
              return rowExtras;
            }

            if (key === 'provider') {
              const rowProvider = (
                <Td key={uuidv4()}>
                  <Text>{rowValue.name}</Text>
                </Td>
              );
              return rowProvider;
            }

            if (key === 'client_id') {
              const rowClient = (
                <Td key={uuidv4()}>
                  <Text>{rowValue.name}</Text>
                </Td>
              );
              return rowClient;
            }

            if (key === 'date') {
              const rowProvider = (
                <Td key={uuidv4()}>
                  <Text>
                    {new Date(rowValue).toLocaleString('es-ES', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    })}
                  </Text>
                </Td>
              );
              return rowProvider;
            }

            return <Td key={uuidv4()}>{rowValue}</Td>;
          })}
        </Tr>
      );
    });
  } else {
    tbody = (
      <Tr>
        <Td colSpan={columns.length}>
          <Center>{rows}</Center>
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
