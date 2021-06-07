import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavLink from "./NavLink";
import navLinks from "../config/navLinks";
import { Switch, Route } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: !isOpen ? "none" : "inherit" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink navLinks={navLinks} />
            </HStack>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4}>
            <Stack as={"nav"} spacing={4}>
              <NavLink navLinks={navLinks} />
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box p={4}>
        <Switch>
          {navLinks.map(({ link, component }, index) => (
            <Route key={index} path={link}>
            {component}
            </Route>
          ))}
        </Switch>
      </Box>
    </>
  );
}