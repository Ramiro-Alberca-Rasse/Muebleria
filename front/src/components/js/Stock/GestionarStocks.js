import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import '../../css/Gestionar.css';  // Asegúrate de importar el archivo CSS

function GestionarStock() {
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
              <Link to="/stock/agregar">
              <Button variant="success" className="w-100"> {/* Botón verde */}
                  Agregar Stock
                </Button>
              </Link>
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
              <Link to="/stock/reportes">
              <Button variant="primary" className="w-100"> {/* Botón azul */}
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
