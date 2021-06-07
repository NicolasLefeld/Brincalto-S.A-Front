import Landing from "../views/Landing";
import Client from "../views/Client";
import Stock from "../views/Stock";
import Provider from "../views/Provider";

const navLinks = [
  { label: "Clientes", link: "/client", component: <Client /> },
  { label: "Stock", link: "/stock", component: <Stock /> },
  { label: "Proveedores", link: "/provider", component: <Provider /> },
  { label: "Home", link: "/", component: <Landing /> },
];

export default navLinks;
