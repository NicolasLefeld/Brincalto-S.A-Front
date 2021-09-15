import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavDropdown from './NavDropdown';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';

import Routes from '../config/Routes';
import { useLocation } from 'react-router-dom';
import { isAdmin, isLogin, logout } from '../util/authHelper';
import Link from './Link';
import adminDropdown from '../config/Navbar/adminDropdown';
import operatorDropdown from '../config/Navbar/operatorDropwdown';

export default function Navbar() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => logout();

  const logoutButton = isLogin() && (
    <HStack as={'nav'} justify={'flex-end'} direction={'column'}>
      <Link label="Salir" link="/" onClick={handleLogout} />
    </HStack>
  );

  if (location.pathname === '/') {
    return (
      <Box>
        <Routes />
      </Box>
    );
  }

  return (
    <>
      <Box px={4} borderBottom={'1px'} borderColor="gray.200">
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
              {isAdmin() ? (
                <NavDropdown navDropdown={adminDropdown} />
              ) : (
                <NavDropdown navDropdown={operatorDropdown} />
              )}
            </HStack>
          </HStack>

          {logoutButton}
        </Flex>
        {isOpen ? (
          <Box pb={4}>
            <Stack as={'nav'} spacing={4}>
              <Link label="Inicio" link="/home" />
              {isAdmin() ? (
                <NavDropdown navDropdown={adminDropdown} />
              ) : (
                <NavDropdown navDropdown={operatorDropdown} />
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box p={4}>
        <Routes />
      </Box>
    </>
  );
}
