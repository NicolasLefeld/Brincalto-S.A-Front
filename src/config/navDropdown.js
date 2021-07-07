import Spare from '../views/Spare';
import Oil from '../views/Oil';

const navDropdown = [
  {
    label: 'Stock',
    link: '/stock',
    child: [
      { sublabel: 'Repuestos', sublink: '/spare', component: <Spare /> },
      { sublabel: 'Aceites', sublink: '/oil', component: <Oil /> },
    ],
  },
];

export default navDropdown;
