import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import RegistrarVentaModal from './RegistrarVenta';
import RegistrarClienteModal from './RegistrarCliente';
import Listar from './Listar';
import ReporteVentas from './ReporteVentas';
import '../../../components/css/Gestionar.css';

function GestionVentas() {
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);
  const [showRegistrarClienteModal, setShowRegistrarClienteModal] = useState(false);
  const [showListarModal, setShowListarModal] = useState(false);
  const [showReporteVentasModal, setShowReporteVentasModal] = useState(false);

  const handleShowRegistrar = () => setShowRegistrarModal(true);
  const handleCloseRegistrar = () => setShowRegistrarModal(false);

  const handleShowRegistrarCliente = () => setShowRegistrarClienteModal(true);
  const handleCloseRegistrarCliente = () => setShowRegistrarClienteModal(false);

  const handleShowListar = () => setShowListarModal(true);
  const handleCloseListar = () => setShowListarModal(false);

  const handleShowReporteVentas = () => setShowReporteVentasModal(true);
  const handleCloseReporteVentas = () => setShowReporteVentasModal(false);

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
              <Card.Title>Listar</Card.Title>
              <Card.Text>Consulta ventas y clientes registrados en el sistema.</Card.Text>
              <Button variant="primary" className="w-100" onClick={handleShowListar}>
                Ver Listados
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Reporte de Ventas</Card.Title>
              <Card.Text>Genera reportes detallados de las ventas realizadas.</Card.Text>
              <Button variant="primary" className="w-100" onClick={handleShowReporteVentas}>
                Ver Reporte
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para registrar ventas */}
      <RegistrarVentaModal show={showRegistrarModal} handleClose={handleCloseRegistrar} />

      {/* Modal para registrar clientes */}
      <RegistrarClienteModal show={showRegistrarClienteModal} handleClose={handleCloseRegistrarCliente} />

      {/* Modal para listar ventas y clientes */}
      <Listar isOpen={showListarModal} onClose={handleCloseListar} />

      {/* Modal para reporte de ventas */}
      <ReporteVentas show={showReporteVentasModal} handleClose={handleCloseReporteVentas} />
    </div>
  );
}

export default GestionVentas;