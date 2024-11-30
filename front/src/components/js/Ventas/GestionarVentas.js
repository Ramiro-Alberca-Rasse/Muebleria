import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import '../../css/Gestionar.css';  // Asegúrate de importar el archivo CSS

function GestionarVentas() {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 titulo-blanco">Gestionar Ventas</h2>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Registrar Venta</Card.Title>
              <Card.Text>
                Registra nuevas ventas en el sistema.
              </Card.Text>
              <Link to="/ventas/registrar">
                <Button variant="success" className="w-100">
                  Registrar Venta
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Listar Ventas</Card.Title>
              <Card.Text>
                Consulta todas las ventas realizadas.
              </Card.Text>
              <Link to="/ventas/listar">
                <Button variant="primary" className="w-100">
                  Ver Ventas
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default GestionarVentas;
