import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import AgregarMuebleModal from './AgregarMueble';  // Importa el componente modal de agregar
import ListarMueblesModal from './ListarMuebles'; // Importa el componente modal de listar

import '../../css/Gestionar.css';  // Asegúrate de importar el archivo CSS

function GestionarMuebles() {
  const [showAgregarModal, setShowAgregarModal] = useState(false);  // Estado para abrir el modal de agregar
  const [showListarModal, setShowListarModal] = useState(false);  // Estado para abrir el modal de listar

  // Función para abrir el modal de agregar
  const handleShowAgregar = () => setShowAgregarModal(true);

  // Función para cerrar el modal de agregar
  const handleCloseAgregar = () => setShowAgregarModal(false);

  // Función para abrir el modal de listar
  const handleShowListar = () => setShowListarModal(true);

  // Función para cerrar el modal de listar
  const handleCloseListar = () => setShowListarModal(false);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 titulo-blanco">Gestionar Muebles</h2>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Listar Muebles</Card.Title>
              <Card.Text>
                Consulta todos los muebles disponibles en el sistema.
              </Card.Text>
              {/* Botón para abrir el modal de listar muebles */}
              <Button variant="primary" className="w-100" onClick={handleShowListar}>
                Ver Muebles
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Agregar Mueble</Card.Title>
              <Card.Text>
                Añadir un nuevo mueble al inventario.
              </Card.Text>
              {/* Botón para abrir el modal de agregar mueble */}
              <Button variant="success" className="w-100" onClick={handleShowAgregar}>
                Agregar Mueble
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Aquí se renderiza el modal de agregar mueble */}
      <AgregarMuebleModal
        show={showAgregarModal}
        handleClose={handleCloseAgregar}
      />

      {/* Aquí se renderiza el modal de listar muebles */}
      <ListarMueblesModal
        show={showListarModal}
        handleClose={handleCloseListar}
      />
    </div>
  );
}

export default GestionarMuebles;
