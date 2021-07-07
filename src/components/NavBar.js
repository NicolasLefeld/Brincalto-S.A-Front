import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavDropdown from './NavDropdown';
import NavLink from './NavLink';
import navLinks from '../config/navLinks';
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

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <NavLink navLinks={navLinks} />
              <NavDropdown navDropdown={navDropdown} />
            </HStack>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4}>
            <Stack as={'nav'} spacing={4}>
              <NavLink navLinks={navLinks} />
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box p={20}>
        <Routes />
      </Box>
    </>
  );
}
