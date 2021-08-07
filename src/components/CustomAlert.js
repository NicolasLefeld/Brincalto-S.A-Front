import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

import React from 'react';

export const CustomAlert = ({ text, message }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{text}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
