import React, { useEffect, useRef } from 'react';
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const Drawer = ({
  children,
  activationMessage,
  triggerButton,
  defaultOpen,
  size,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    console.log(defaultOpen);
    defaultOpen && onOpen();
  }, [defaultOpen]);

  const defaultTrigger = (
    <Flex justifyContent="center">
      <Stack>
        <Button
          ref={btnRef}
          rightIcon={<AddIcon />}
          colorScheme="teal"
          variant="outline"
          onClick={onOpen}
        >
          {activationMessage}
        </Button>
      </Stack>
    </Flex>
  );

  const actionButton = triggerButton
    ? React.cloneElement(triggerButton, { onClick: onOpen, ref: btnRef })
    : defaultTrigger;

  return (
    <>
      {actionButton}
      <ChakraDrawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={size || 'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{activationMessage}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};

export default Drawer;
