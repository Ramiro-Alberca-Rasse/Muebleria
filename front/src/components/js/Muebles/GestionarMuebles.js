import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Asegúrate de importar Link aquí
import AgregarMuebleModal from './AgregarMueble';  // Importa tu componente modal
import ListarMueblesModal from './ListarMuebles'; // Importamos el nuevo modal

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

  // Función para manejar el evento cuando un mueble es agregado
  const handleMuebleAdded = () => {
    console.log("Nuevo mueble agregado.");
    // Aquí puedes realizar acciones adicionales, como actualizar una lista de muebles
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 titulo-blanco">Gestionar Muebles</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
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
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
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

      {/* Aquí se renderiza el modal de agregar mueble */}
      <AgregarMuebleModal
        show={showAgregarModal}
        handleClose={handleCloseAgregar}
        onMuebleAdded={handleMuebleAdded}
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
