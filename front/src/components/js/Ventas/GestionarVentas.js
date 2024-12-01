import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import RegistrarVentaModal from './RegistrarVenta'; // Importa el componente modal de registrar ventas
import ListarVentasModal from './ListarVentas'; // Importa el componente modal de listar ventas

import '../../css/Gestionar.css'; // Asegúrate de importar el archivo CSS

function GestionarVentas() {
  const [showRegistrarModal, setShowRegistrarModal] = useState(false); // Estado para abrir el modal de registrar
  const [showListarModal, setShowListarModal] = useState(false); // Estado para abrir el modal de listar

  // Función para abrir el modal de registrar ventas
  const handleShowRegistrar = () => setShowRegistrarModal(true);

  // Función para cerrar el modal de registrar ventas
  const handleCloseRegistrar = () => setShowRegistrarModal(false);

  // Función para abrir el modal de listar ventas
  const handleShowListar = () => setShowListarModal(true);

  // Función para cerrar el modal de listar ventas
  const handleCloseListar = () => setShowListarModal(false);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 titulo-blanco">Gestionar Ventas</h2>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Listar Ventas</Card.Title>
              <Card.Text>
                Consulta todas las ventas realizadas en el sistema.
              </Card.Text>
              {/* Botón para abrir el modal de listar ventas */}
              <Button variant="primary" className="w-100" onClick={handleShowListar}>
                Ver Ventas
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Registrar Venta</Card.Title>
              <Card.Text>
                Registra una nueva venta en el sistema.
              </Card.Text>
              {/* Botón para abrir el modal de registrar ventas */}
              <Button variant="success" className="w-100" onClick={handleShowRegistrar}>
                Registrar Venta
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Aquí se renderiza el modal de registrar ventas */}
      <RegistrarVentaModal
        show={showRegistrarModal}
        handleClose={handleCloseRegistrar}
      />

      {/* Aquí se renderiza el modal de listar ventas */}
      <ListarVentasModal
        show={showListarModal}
        handleClose={handleCloseListar}
      />
    </div>
  );
}

export default GestionarVentas;
