import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./NavBar";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
      </Router>
    </ChakraProvider>
  );
};

export default App;
