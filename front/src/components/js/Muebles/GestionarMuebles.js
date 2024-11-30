import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';

function GestionarMuebles() {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Gestionar Muebles</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Listar Muebles</Card.Title>
              <Card.Text>
                Consulta todos los muebles disponibles en el sistema.
              </Card.Text>
              <Link to="/muebles/listar">
                <Button variant="primary" className="w-100">
                  Ver Muebles
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Agregar Mueble</Card.Title>
              <Card.Text>
                Añadir un nuevo mueble al inventario.
              </Card.Text>
              <Link to="/muebles/agregar">
                <Button variant="success" className="w-100">
                  Agregar Mueble
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Eliminar Mueble</Card.Title>
              <Card.Text>
                Elimina un mueble del inventario.
              </Card.Text>
              <Link to="/muebles/eliminar">
                <Button variant="danger" className="w-100">
                  Eliminar Mueble
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default GestionarMuebles;
