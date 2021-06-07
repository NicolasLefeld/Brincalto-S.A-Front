import { useRef } from "react";

import {
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Portal,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

const Popover = ({ trigger, body, message }) => {
  return (
    <ChakraPopover closeOnBlur={false} placement="left" closeOnBlur={true}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>{trigger}</PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>{message}</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <ButtonGroup>
                  <>
                    {body}
                    <Button colorScheme="blue" onClick={onClose}>
                      {" "}
                      Close
                    </Button>
                  </>
                </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </ChakraPopover>
  );
};

export default Popover;
