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
import { isAdmin } from '../util/authHelper';

export default function NavDropdown({ navDropdown }) {
  return navDropdown.map(({ link, label, child }, index) => {
    return (
      <Menu key={index}>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: 'gray.400' }}
          _expanded={{ bg: 'blue.400' }}
          _focus={{ boxShadow: 'outline' }}
          as={Button}
          variant="outline"
          rightIcon={<ChevronDownIcon />}
        >
          {label}
        </MenuButton>
        <MenuList>
          {child &&
            child.map((item) => (
              <MenuItem as={RouterLink} to={link + item.sublink}>
                {item.sublabel}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    );
  });
}
