import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavDropdown from './NavDropdown';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import navDropdown from '../config/navDropdown';
import Routes from '../config/Routes';
import { useLocation } from 'react-router-dom';
import { isAdmin, isLogin, logout } from '../util/authHelper';
import Link from './Link';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <Box>
        <Routes />
      </Box>
    );
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: !isOpen ? 'none' : 'inherit' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link label="Inicio" link="/home" />
              <Link label="Proveedores" link="/provider" />
              {isAdmin() && <Link label="Usuarios" link="/user" />}
              <NavDropdown navDropdown={navDropdown} />
            </HStack>
          </HStack>
          {isLogin() && (
            <HStack as={'nav'} justify={'flex-end'} direction={'column'}>
              <Link label="Cerrar Sesión" link="/" onClick={() => logout()} />
            </HStack>
          )}
        </Flex>
        {isOpen ? (
          <Box pb={4}>
            <Stack as={'nav'} spacing={4}>
              <Link label="Inicio" link="/home" />
              <Link label="Proveedores" link="/provider" />
              {isAdmin() && <Link label="Usuarios" link="/user" />}
              <NavDropdown navDropdown={navDropdown} />
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box p={5}>
        <Routes />
      </Box>
    </>
  );
}
