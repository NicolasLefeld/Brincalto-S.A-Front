import React from "react";
import { Link, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function NavLink({ navLinks }) {
  const bg = useColorModeValue("gray.200", "gray.700");

  return navLinks.map(({ link, label }, index) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg,
      }}
      as={RouterLink}
      to={link}
      key={index}
    >
      {label}
    </Link>
  ));
}
