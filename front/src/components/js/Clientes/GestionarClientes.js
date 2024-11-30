import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import '../../css/Gestionar.css';  // Asegúrate de importar el archivo CSS

function GestionarClientes() {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 titulo-blanco">Gestionar Clientes</h2>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Registrar Cliente</Card.Title>
              <Card.Text>
                Agrega nuevos clientes al sistema.
              </Card.Text>
              <Link to="/clientes/registrar">
                <Button variant="success" className="w-100"> {/* Botón verde */}
                  Registrar Cliente
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Listar Clientes</Card.Title>
              <Card.Text>
                Consulta todos los clientes registrados.
              </Card.Text>
              <Link to="/clientes/listar">
                <Button variant="primary" className="w-100"> {/* Botón azul */}
                  Ver Clientes
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default GestionarClientes;
