import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/js/Layout';
import MueblesList from './components/js/MuebleList';
import MuebleForm from './components/js/MuebleForm';
import MuebleDetails from './components/js/MuebleDetails';
import StockManagement from './components/js/StockManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MueblesList />} />
          <Route path="/mueble/nuevo" element={<MuebleForm />} />
          <Route path="/mueble/:id" element={<MuebleDetails />} />
          <Route path="/stock" element={<StockManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
