import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import api from '../../../services/api';  // Asegúrate de que la ruta sea correcta

function GestionarStock() {
  const [showModal, setShowModal] = useState(false);  // Estado para manejar la visibilidad del modal
  const [muebles, setMuebles] = useState([]);  // Lista de muebles
  const [cantidad, setCantidad] = useState(0);  // Cantidad de stock a agregar
  const [selectedMuebleId, setSelectedMuebleId] = useState('');  // Mueble seleccionado

  // Fetch muebles cuando se carga el componente
  useEffect(() => {
    fetchMuebles();
  }, []);

  const fetchMuebles = async () => {
    try {
      const response = await api.get('/muebles');  // Ajusta la ruta si es necesario
      setMuebles(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de muebles:', error);
    }
  };

  const agregarStock = async () => {
    try {
      await api.post('/stock/agregar', {
        muebleId: selectedMuebleId,
        cantidad: cantidad,
      });
      alert('Stock actualizado');
      fetchMuebles();  // Refresca la lista de muebles
      setShowModal(false);  // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 titulo-blanco">Gestionar Stocks</h2>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="stock-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Actualizar Stock</Card.Title>
              <Card.Text>
                Añade más stock a los muebles existentes.
              </Card.Text>
              <Button variant="success" className="w-100" onClick={() => setShowModal(true)}>
                Actualizar Stock
              </Button>
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
              <Button variant="primary" className="w-100">
                Ver Reportes
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para agregar stock */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Stock de Mueble</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMueble">
              <Form.Label>Selecciona un Mueble</Form.Label>
              <Form.Control 
                as="select" 
                value={selectedMuebleId} 
                onChange={(e) => setSelectedMuebleId(e.target.value)}
                required
              >
                <option value="">Selecciona un mueble</option>
                {muebles.map(mueble => (
                  <option key={mueble.id} value={mueble.id}>
                    {mueble.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad a agregar"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                required
              />
            </Form.Group>

            <Button variant="primary" onClick={agregarStock} className="w-100">
              Actualizar Stock
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default GestionarStock;
