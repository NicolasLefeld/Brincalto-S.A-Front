import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Thead,
  Stack,
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
  Checkbox,
  Spacer,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import Popover from '../components/Popover';
import Drawer from '../components/Drawer';
import getDescendantProp from '../util/getDescendantProp';
import { useLocation } from 'react-router-dom';
import remitosRequests from '../api/remitosRequests';
import { useForm } from 'react-hook-form';

const generateTableContent = (
  columns,
  rows,
  renderData,
  request,
  drawerForm,
) => {
  const location = useLocation();
  const { pathname } = location;
  const isSpare = pathname.includes('spare');
  const isOil = pathname.includes('oil');

  const [selectedAllRemitos, setselectedAllRemitos] = useState(false);

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      remitosToBeProcessed: [],
    },
  });
  const remitosToBeProcessed = watch('remitosToBeProcessed');

  const onSubmit = async () => {
    await remitosRequests.markAsProcessed(remitosToBeProcessed);
    reset({ remitosToBeProcessed: [] });
    renderData.setRender(!renderData.render);
  };

  const handleAllRemitos = () => {
    setselectedAllRemitos(!selectedAllRemitos);
    return rows.map((row, index) => {
      const IsStatusPending = row.status === 'pending';
      if (IsStatusPending && !selectedAllRemitos) {
        return setValue(`remitosToBeProcessed.${index}`, row._id);
      }
      return setValue(`remitosToBeProcessed.${index}`, false);
    });
  };

  const keys = columns.map(({ key }) => key);

  const thead = columns.map((column, index) => (
    <Th key={uuidv4()}>
      <Stack>
        <Text>{columns.find((col) => col.position === index).displayName}</Text>
      </Stack>
      {column.displayName === 'Procesar' && (
        <Stack>
          <Checkbox onChange={handleAllRemitos} isChecked={selectedAllRemitos}>
            Seleccionar Todos
          </Checkbox>
          <Button
            type="submit"
            fontSize="xs"
            colorScheme="blue"
            onClick={handleSubmit(onSubmit)}
          >
            Procesar remitos
          </Button>
        </Stack>
      )}
    </Th>
  ));

  let tbody;

  if (Array.isArray(rows)) {
    tbody = rows.map((row, index) => {
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
                      />
                    )}
                    {row.assignedProducts && (
                      <Popover
                        message={
                          row.assignedProducts.length === 0
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
                            {row.assignedProducts.length !== 0 &&
                              row.assignedProducts.map((product, index) => (
                                <Flex key={uuidv4()}>
                                  <Center>
                                    <Text fontSize="4xl">{index + 1}</Text>
                                  </Center>
                                  <Spacer />
                                  <Center>
                                    <Text fontSize="md">{product?.name}</Text>
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
            if (key === 'forProcessing') {
              const rowForProcessing = (
                <Td key={uuidv4()}>
                  <Stack>
                    {row.status === 'processed' ? (
                      <Text>Procesado / {row.statusId}</Text>
                    ) : (
                      <>
                        <Checkbox
                          id={row._id}
                          value={row._id}
                          {...register(`remitosToBeProcessed.${index}`)}
                        >
                          Seleccionar
                        </Checkbox>
                      </>
                    )}
                  </Stack>
                </Td>
              );
              return rowForProcessing;
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
                  <Text>{rowValue?.name}</Text>
                </Td>
              );
              return rowClient;
            }
            if (key === 'product_id') {
              const rowProduct = (
                <Td key={uuidv4()}>
                  <Text>
                    {rowValue.lenght > 0 && rowValue?.map((val) => val?.name)}
                  </Text>
                </Td>
              );
              return rowProduct;
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
