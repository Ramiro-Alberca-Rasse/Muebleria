import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import api from '../../../services/api';  // Asegúrate de que la ruta sea correcta
import '../../css/Gestionar.css';  // Asegúrate de importar el archivo CSS
import AgregarStock from './AgregarStock';  // Importar el componente AgregarStock

function GestionarStock() {
  const [showModal, setShowModal] = useState(false);  // Estado para manejar la visibilidad del modal
  const [muebles, setMuebles] = useState([]);  // Lista de muebles

  // Fetch muebles cuando se carga el componente
  useEffect(() => {
    fetchMuebles();
  }, []);

  const fetchMuebles = async () => {
    try {
      const response = await api.get('/muebles');  // Ajusta la ruta si es necesario
      setMuebles(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de muebles:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 titulo-blanco">Gestionar Stocks</h2>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="stock-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Agregar Stock</Card.Title>
              <Card.Text>
                Añade más stock a los muebles existentes.
              </Card.Text>
              <Button variant="success" className="w-100" onClick={() => setShowModal(true)}>
                Agregar Stock
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="stock-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Generar Reporte</Card.Title>
              <Card.Text>
                Genera un reporte de stock actual o cambios de stock.
              </Card.Text>
              <Button variant="primary" className="w-100">
                Ver Reportes
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <AgregarStock show={showModal} handleClose={() => setShowModal(false)} fetchMuebles={fetchMuebles} />
    </div>
  );
}

export default GestionarStock;
