import React from 'react';
import Link from './Link';

export default function NavLink({ navLinks }) {
  return navLinks.map(({ link, label }, index) => (
    <Link link={link} label={label} index={index} />
  ));
}
