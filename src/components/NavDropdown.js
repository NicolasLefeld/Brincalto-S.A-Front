import React from 'react';
import {
  Link,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

export default function NavDropdown({ navDropdown }) {
  const bg = useColorModeValue('gray.200', 'gray.700');

  return navDropdown.map(({ link, label, child }, index) => (
    <Menu
      key={index}
      _hover={{
        textDecoration: 'none',
        bg,
      }}
    >
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {label}
      </MenuButton>
      <MenuList>
        <MenuItem
          as={RouterLink}
          to={link + child[0].sublink}
          _hover={{
            textDecoration: 'none',
            bg,
          }}
        >
          {child[0].sublabel}
        </MenuItem>
        <MenuItem
          as={RouterLink}
          to={link + child[1].sublink}
          _hover={{
            textDecoration: 'none',
            bg,
          }}
        >
          {child[1].sublabel}
        </MenuItem>
      </MenuList>
    </Menu>
  ));
}
