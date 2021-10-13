import React from "react";
import { Flex, Box, Stack, Link, Heading, Text, Grid } from "@chakra-ui/react";
import AuthForm from "../components/Auth/AuthForm";

function Auth() {
  return (
    <>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Flex align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Brincalto S.A</Heading>
                <Text fontSize={"lg"}>
                  Gestión de
                  <Link color={"blue.400"}> Ripera</Link> ✌️
                </Text>
              </Stack>
              <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                <AuthForm />
              </Box>
            </Stack>
          </Flex>
        </Grid>
      </Box>
    </>
  );
}

export default Auth;
