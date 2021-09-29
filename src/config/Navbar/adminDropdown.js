const adminDropdown = [
  {
    label: 'Compras',
    link: '/purchases',
    child: [
      { sublabel: 'Ingreso compra', sublink: '/new' },
      { sublabel: 'Consultar C/C Cliente', sublink: '/cc' },
    ],
  },
  {
    label: 'Ventas',
    link: '/sales',
    child: [
      { sublabel: 'Ingreso Factura', sublink: '/invoices' },
      { sublabel: 'Ingreso Remito', sublink: '/remitos' },
      { sublabel: 'Remitos por Cliente', sublink: '' },
      { sublabel: 'Facturas por Cliente', sublink: '' },
    ],
  },
  {
    label: 'Libros IVA',
    link: '/booksIVA',
    child: [
      { sublabel: 'Ingreso Factura', sublink: '' },
      { sublabel: 'Ingreso Remito', sublink: '' },
      { sublabel: 'Remitos por Cliente', sublink: '' },
      { sublabel: 'Facturas por Cliente', sublink: '' },
    ],
  },
  {
    label: 'Tesoreria',
    link: '/treasury',
    child: [
      { sublabel: 'Cobros', sublink: '' },
      { sublabel: 'Pagos', sublink: '' },
      { sublabel: 'Cartera', sublink: '' },
    ],
  },
  {
    label: 'Deposito',
    link: '/stock',
    child: [
      { sublabel: 'Repuestos', sublink: '/spare' },
      { sublabel: 'Aceites', sublink: '/oil' },
    ],
  },
  {
    label: 'Ajustes',
    link: '',
    child: [
      { sublabel: 'Proveedores', sublink: '/provider' },
      { sublabel: 'Usuarios', sublink: '/user' },
      { sublabel: 'Productos', sublink: '/products' },
      { sublabel: 'Clientes', sublink: '/clients' },
    ],
  },
];

export default adminDropdown;
