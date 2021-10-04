import React, { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/select';
import { DateUtils } from 'react-day-picker';
import Table from '../../../components/Table';
import Drawer from '../../../components/Drawer';
import generateTableContent from '../../../util/generateTableContent';
import request from '../../../api/remitosRequests';
import RemitosForm from '../../../components/Sales/RemitosForm';
import clientRequest from '../../../api/clientRequests';
import { useForm } from 'react-hook-form';
import { HStack, Text, Stack } from '@chakra-ui/layout';
import FilterByCalendar from '../../../components/Sales/FilterByCalendar';
import { Button } from '@chakra-ui/button';
import { jsPDF } from 'jspdf';
import parse from 'html-react-parser';

const Remitos = () => {
  const { register, watch } = useForm();

  const clientSelected = watch('clientSelected');
  const stateSelected = watch('stateSelected');

  const [remitosPDF, setRemitosPDF] = useState(false);
  const [to, setTo] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const [clients, setClients] = useState([]);
  const [remitos, setRemitos] = useState([]);
  const [remitosFiltered, setRemitosFiltered] = useState([]);
  const [render, setRender] = useState(false);
  const renderData = { render, setRender };
  const drawerForm = <RemitosForm renderData={renderData} />;

  handleClients();
  handleSales();
  handleClientsSelected();
  handleStateSelected();
  handleFilterByDate();

  const columns = [
    { displayName: 'Cliente', key: 'client_id', position: 0 },
    { displayName: 'N° Remito', key: 'remito_id', position: 1 },
    { displayName: 'Concepto', key: 'observation', position: 2 },
    { displayName: 'Precio', key: 'price', position: 3 },
    { displayName: 'Estado', key: 'status', position: 4 },
    { displayName: 'Producto', key: 'product_id', position: 5 },
    { displayName: 'Tipo', key: 'type', position: 6 },
    { displayName: 'Toneladas', key: 'tons', position: 7 },
    { displayName: 'Procesar', key: 'forProcessing', position: 8 },
    { displayName: 'Fecha', key: 'date', position: 9 },
    { displayName: 'Acción', key: 'action', position: 10 },
  ];

  const tableContent = generateTableContent(
    columns,
    remitos,
    renderData,
    request,
    drawerForm,
  );

  const handleNewRangeFilters = (day) => {
    const oldRange = {
      from,
      to,
    };
    const newRange = DateUtils.addDayToRange(day, oldRange);
    setFrom(newRange.from);
    setTo(newRange.to);
  };

  const downloadAllRemitos = async () => {
    const doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
    });

    const idAllSales = remitos?.map((sale) => sale._id);
    const html = await request.downloadPDF(idAllSales);

    console.log(html);

    // var blobPDF = new Blob([html], { type: 'text/html' });
    // var blobUrl = URL.createObjectURL(blobPDF);
    // window.open(blobUrl);
    // const file = new Blob([html], { type: 'text/html' });
    // const fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
    // console.log(doc);
    setRemitosPDF(<div id="remitoPDF">{parse(html)}</div>);

    doc.html(document.getElementById('page_1'), {
      callback: function (doc) {
        doc.save(`Remitos-desde-${from.getMonth()}-hasta-${to.getMonth()}.pdf`);
      },
    });
  };

  return (
    <div>
      <Stack p={5} m={3} border={'1px solid black'} borderRadius={5}>
        <Text fontSize="xl">Filtros de remitos</Text>

        <HStack py={3}>
          <Select
            variant="flushed"
            placeholder={'Filtrar por cliente'}
            {...register(`clientSelected`)}
          >
            <option value="all">Todos</option>
            {clients?.map((client) => (
              <option value={client._id}>{client.name}</option>
            ))}
          </Select>
          <Select
            variant="flushed"
            placeholder={'Filtrar por estado'}
            {...register(`stateSelected`)}
          >
            <option value="all">Todos</option>
            <option value="pending">Pendiente</option>
            <option value="processed">Procesada</option>
          </Select>
        </HStack>
        <Text fontSize="xl">Periodo de remitos</Text>
        <FilterByCalendar
          from={from}
          to={to}
          handleDayClick={handleNewRangeFilters}
        />
        <Button
          spacing={10}
          color="green.500"
          fontSize="md"
          onClick={downloadAllRemitos}
        >
          Imprimir periodio seleccionado
        </Button>
        {remitosPDF}
      </Stack>
      <Drawer activationMessage="Cargar remitos" defaultOpen size="xl">
        <RemitosForm renderData={renderData} />
      </Drawer>
      <Table tableContent={tableContent} />
    </div>
  );

  function handleSales() {
    useEffect(() => {
      (async () => {
        const sales = await request.getRecords();
        setRemitos(sales);
        setRemitosFiltered(sales);
      })();
    }, [render]);
  }

  function handleClients() {
    useEffect(async () => {
      const clients = await clientRequest.getRecords();
      setClients(clients);
    }, []);
  }

  function handleClientsSelected() {
    useEffect(async () => {
      if (clientSelected === 'all') {
        if (stateSelected === 'processed' || stateSelected === 'pending') {
          const filterByStateSelected = remitosFiltered.filter(
            (sale) => sale.status === stateSelected,
          );
          return setRemitos(filterByStateSelected);
        }
        return setRemitos(remitosFiltered);
      } else if (clientSelected) {
        const filterByClientSelected = remitosFiltered.filter(
          (sale) => sale.client_id._id === clientSelected,
        );
        return setRemitos(filterByClientSelected);
      } else if (stateSelected === 'all' && clientSelected === 'all') {
        return setRemitos(remitosFiltered);
      }
    }, [clientSelected]);
  }

  function handleStateSelected() {
    useEffect(async () => {
      if (stateSelected === 'processed' || stateSelected === 'pending') {
        if (clientSelected && clientSelected !== 'all') {
          const filterByStateAndClientSelected = remitosFiltered.filter(
            (sale) =>
              sale.status === stateSelected &&
              sale.client_id._id === clientSelected,
          );
          return setRemitos(filterByStateAndClientSelected);
        }
        const filterByStateSelected = remitosFiltered.filter(
          (sale) => sale.status === stateSelected,
        );
        return setRemitos(filterByStateSelected);
      } else if (stateSelected === 'all') {
        if (clientSelected && clientSelected !== 'all') {
          const filterByClientSelected = remitosFiltered.filter(
            (sale) => sale.client_id._id === clientSelected,
          );
          return setRemitos(filterByClientSelected);
        }
        return setRemitos(remitosFiltered);
      } else if (stateSelected === 'all' && clientSelected === 'all') {
        return setRemitos(remitosFiltered);
      }
    }, [stateSelected]);
  }

  function handleFilterByDate() {
    useEffect(() => {
      const startUnixtime = from?.getTime() / 1000;
      const endUnixtime = to?.getTime() / 1000;
      const filteredRemitos =
        remitosFiltered &&
        remitosFiltered.filter(
          (sale) =>
            new Date(sale.date).getTime() / 1000 < endUnixtime &&
            new Date(sale.date).getTime() / 1000 > startUnixtime,
        );
      return setRemitos(filteredRemitos);
    }, [from, to]);
  }
};

export default Remitos;
