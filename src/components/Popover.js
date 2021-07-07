import { useRef } from 'react';

import {
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  Portal,
  Button,
  ButtonGroup,
  Box,
} from '@chakra-ui/react';

const Popover = ({ trigger, body, footer, message }) => {
  return (
    <ChakraPopover closeOnBlur={false} placement="left" closeOnBlur={true}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>{trigger}</PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>{message}</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>{body}</PopoverBody>
              <PopoverFooter
                border="0"
                d="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
              >
                {footer}
                <ButtonGroup size="sm">
                  <Button colorScheme="red" variant="outline" onClick={onClose}>
                    Cerrar
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </ChakraPopover>
  );
};

export default Popover;
