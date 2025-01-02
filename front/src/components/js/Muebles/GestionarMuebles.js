import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import api from '../../../services/api'; // Asegúrate de que la ruta sea correcta
import '../../../components/css/Gestionar.css'; // Asegúrate de importar el archivo CSS
import AgregarStock from './AgregarStock'; // Importar el componente AgregarStock
import AgregarMuebleModal from './AgregarMueble'; // Importa el componente modal de agregar
import ListarMueblesModal from './ListarMuebles'; // Importa el componente modal de listar
import GenerarReportesModal from './GenerarReportes'; // Importar el componente modal de generar reportes

function GestionarMuebles() {
  const [showAgregarModal, setShowAgregarModal] = useState(false); // Estado para abrir el modal de agregar mueble
  const [showListarModal, setShowListarModal] = useState(false); // Estado para abrir el modal de listar muebles
  const [showStockModal, setShowStockModal] = useState(false); // Estado para manejar la visibilidad del modal de stock
  const [showReportesModal, setShowReportesModal] = useState(false); // Estado para abrir el modal de generar reportes


  // Fetch muebles cuando se carga el componente
  useEffect(() => {
    fetchMuebles();
  }, []);

  
  const fetchMuebles = async () => {
    try {
      await api.get('/muebles'); // Ajusta la ruta si es necesario

    } catch (error) {
      console.error('Error al obtener la lista de muebles:', error);
    }
  };

  // Función para abrir el modal de agregar mueble
  const handleShowAgregar = () => setShowAgregarModal(true);

  // Función para cerrar el modal de agregar mueble
  const handleCloseAgregar = () => setShowAgregarModal(false);

  // Función para abrir el modal de listar muebles
  const handleShowListar = () => setShowListarModal(true);

  // Función para cerrar el modal de listar muebles
  const handleCloseListar = () => setShowListarModal(false);

  // Función para abrir el modal de generar reportes
  const handleShowReportes = () => setShowReportesModal(true);

  // Función para cerrar el modal de generar reportes
  const handleCloseReportes = () => setShowReportesModal(false);

  return (
    <div className="container my-4 gestionar-modales">
      <h2 className="text-center mb-4 titulo-blanco">Gestionar Muebles</h2>
      <Row className="justify-content-center mt-5">
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Agregar Mueble</Card.Title>
              <Card.Text>Añadir un nuevo mueble al inventario.</Card.Text>
              <Button variant="success" className="w-100" onClick={handleShowAgregar}>
                Agregar Mueble
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Listar Muebles</Card.Title>
              <Card.Text>Consulta todos los muebles disponibles en el sistema.</Card.Text>
              <Button variant="primary" className="w-100" onClick={handleShowListar}>
                Ver Muebles
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="stock-card h-100 shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Agregar Stock</Card.Title>
              <Card.Text>Añade más stock a los muebles existentes.</Card.Text>
              <Button variant="success" className="w-100" onClick={() => setShowStockModal(true)}>
                Agregar Stock
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="stock-card h-100 shadow-sm w-100">
            <Card.Body className="text-center">
              <Card.Title>Generar Reporte</Card.Title>
              <Card.Text>Genera un reporte de stock actual o cambios de stock.</Card.Text>
              <Button variant="primary" className="w-100" onClick={handleShowReportes}>Ver Reportes</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Aquí se renderiza el modal de agregar mueble */}
      <AgregarMuebleModal show={showAgregarModal} handleClose={handleCloseAgregar} />

      {/* Aquí se renderiza el modal de listar muebles */}
      <ListarMueblesModal show={showListarModal} handleClose={handleCloseListar} />

      {/* Aquí se renderiza el modal de agregar stock */}
      <AgregarStock
        show={showStockModal}
        handleClose={() => setShowStockModal(false)}
        fetchMuebles={fetchMuebles}
      />

      {/* Aquí se renderiza el modal de generar reportes */}
      <GenerarReportesModal show={showReportesModal} handleClose={handleCloseReportes} />
    </div>
  );
}

export default GestionarMuebles;