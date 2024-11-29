import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';

function GestionarStock() {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Gestionar Stock</h2>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="stock-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Agregar Stock</Card.Title>
              <Card.Text>
                Añade más stock a los muebles existentes.
              </Card.Text>
              <Link to="/stock/agregar">
                <Button variant="primary" className="w-100">
                  Agregar Stock
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="stock-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Generar Reportes</Card.Title>
              <Card.Text>
                Genera un reporte de stock disponible.
              </Card.Text>
              <Link to="/stock/reportes">
                <Button variant="info" className="w-100">
                  Ver Reportes
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default GestionarStock;
