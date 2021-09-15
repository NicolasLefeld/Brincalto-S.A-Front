import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './NavBar';

const App = () => {
  return (
    <Router>
      <Navbar />
    </Router>
  );
};

export default App;
