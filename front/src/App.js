import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import MueblesList from './components/MuebleList';
import MuebleForm from './components/MuebleForm';
import MuebleDetails from './components/MuebleDetails';
import StockManagement from './components/StockManagement';

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
