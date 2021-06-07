import React from "react";
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const Drawer = ({ children, activationMessage, triggerButton }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const button = triggerButton ? (
    React.cloneElement(triggerButton, { onClick: onOpen, ref: btnRef })
  ) : (
    <Button
      ref={btnRef}
      colorScheme="teal"
      onClick={onOpen}
      width="100%"
      size="sm"
      mb={4}
    >
      {activationMessage}
    </Button>
  );

  return (
    <>
      {button}
      <ChakraDrawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
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
