import React from 'react';
import { Link as ChakraLink, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ link, label, index }) => {
  const bg = useColorModeValue('gray.200', 'gray.700');
  return (
    <ChakraLink
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg,
      }}
      as={RouterLink}
      to={link}
      key={index}
    >
      {label}
    </ChakraLink>
  );
};

export default Link;
