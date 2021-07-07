import Landing from '../views/Landing';
import Client from '../views/Client';
import Provider from '../views/Provider';

const navLinks = [
  { label: 'Home', link: '/', component: <Landing /> },
  { label: 'Clientes', link: '/client', component: <Client /> },
  { label: 'Proveedores', link: '/provider', component: <Provider /> },
];

export default navLinks;
