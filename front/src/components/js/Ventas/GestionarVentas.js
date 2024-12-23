import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import RegistrarVentaModal from './RegistrarVenta'; // Importa el componente modal de registrar ventas
import ListarVentasModal from './ListarVentas'; // Importa el componente modal de listar ventas
import RegistrarClienteModal from './RegistrarCliente'; // Importa el componente modal de registrar clientes
import ListarClientesModal from './ListarClientes'; // Importa el componente modal de listar clientes
import '../../../components/css/Gestionar.css'; // Asegúrate de importar el archivo CSS

function GestionVentas() {
  const [showRegistrarModal, setShowRegistrarModal] = useState(false); // Estado para abrir el modal de registrar ventas
  const [showListarModal, setShowListarModal] = useState(false); // Estado para abrir el modal de listar ventas
  const [showRegistrarClienteModal, setShowRegistrarClienteModal] = useState(false); // Estado para abrir el modal de registrar clientes
  const [showListarClientesModal, setShowListarClientesModal] = useState(false); // Estado para abrir el modal de listar clientes

  // Función para abrir el modal de registrar ventas
  const handleShowRegistrar = () => setShowRegistrarModal(true);

  // Función para cerrar el modal de registrar ventas
  const handleCloseRegistrar = () => setShowRegistrarModal(false);

  // Función para abrir el modal de listar ventas
  const handleShowListar = () => setShowListarModal(true);

  // Función para cerrar el modal de listar ventas
  const handleCloseListar = () => setShowListarModal(false);

  // Función para abrir el modal de registrar clientes
  const handleShowRegistrarCliente = () => setShowRegistrarClienteModal(true);

  // Función para cerrar el modal de registrar clientes
  const handleCloseRegistrarCliente = () => setShowRegistrarClienteModal(false);

  // Función para abrir el modal de listar clientes
  const handleShowListarClientes = () => setShowListarClientesModal(true);

  // Función para cerrar el modal de listar clientes
  const handleCloseListarClientes = () => setShowListarClientesModal(false);

  return (
    <div className="container my-4 gestionar-modales">
      <h2 className="text-center mb-4 titulo-blanco">Gestionar Ventas</h2>
      <Row className="justify-content-center mt-5">
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Registrar Venta</Card.Title>
              <Card.Text>Registra una nueva venta en el sistema.</Card.Text>
              <Button variant="success" className="w-100" onClick={handleShowRegistrar}>
                Registrar Venta
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Listar Ventas</Card.Title>
              <Card.Text>Consulta todas las ventas realizadas en el sistema.</Card.Text>
              <Button variant="primary" className="w-100" onClick={handleShowListar}>
                Ver Ventas
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Registrar Cliente</Card.Title>
              <Card.Text>Agrega nuevos clientes al sistema.</Card.Text>
              <Button variant="success" className="w-100" onClick={handleShowRegistrarCliente}>
                Registrar Cliente
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Listar Clientes</Card.Title>
              <Card.Text>Consulta todos los clientes registrados.</Card.Text>
              <Button variant="primary" className="w-100" onClick={handleShowListarClientes}>
                Ver Clientes
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

      {/* Aquí se renderiza el modal de registrar clientes */}
      <RegistrarClienteModal
        show={showRegistrarClienteModal}
        handleClose={handleCloseRegistrarCliente}
      />

      {/* Aquí se renderiza el modal de listar clientes */}
      <ListarClientesModal
        show={showListarClientesModal}
        handleClose={handleCloseListarClientes}
      />
    </div>
  );
}

export default GestionVentas;