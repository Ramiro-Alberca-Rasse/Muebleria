import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import RegistrarCliente from '../../js/Clientes/RegistrarCliente'; // Importar el modal para Registrar cliente

function RegistrarVenta({ show, handleClose }) {
  const [clientes, setClientes] = useState([]); // Lista de clientes desde la API
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState(0); // Total es calculado, no modificable
  const [showRegistrarCliente, setShowRegistrarCliente] = useState(false); // Estado para el modal RegistrarCliente

  // Establecer fecha actual y cargar clientes desde la API
  useEffect(() => {
    if (show) {
      const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      setFecha(fechaActual);

      // Obtener clientes desde la API
      fetch('/api/clientes')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener los clientes');
          }
          return response.json();
        })
        .then((data) => {
          setClientes(data); // Asumimos que `data` es un array de clientes
        })
        .catch((error) => {
          console.error('Error al cargar clientes:', error);
          setClientes([]); // Vaciar clientes en caso de error
        });
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Venta registrada:', { cliente: clienteSeleccionado, fecha, total });
    handleClose(); // Cierra el modal después de registrar la venta
  };

  // Función para abrir el modal RegistrarCliente
  const handleShowRegistrarCliente = () => setShowRegistrarCliente(true);

  // Función para cerrar el modal RegistrarCliente
  const handleCloseRegistrarCliente = () => {
    setShowRegistrarCliente(false);
    // Refrescar la lista de clientes después de agregar uno nuevo
    fetch('/api/clientes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los clientes');
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => console.error('Error al refrescar clientes:', error));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Selección de cliente */}
            <Form.Group controlId="Cliente">
              <Form.Label>Cliente</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    as="select"
                    value={clienteSeleccionado}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un cliente</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre} {/* Asumimos que cada cliente tiene `id` y `nombre` */}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col xs={3}>
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={handleShowRegistrarCliente}
                  >
                    Registrar
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            {/* Fecha actual */}
            <Form.Group controlId="Fecha" className="mt-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" value={fecha} readOnly disabled />
            </Form.Group>

            {/* Total */}
            <Form.Group controlId="Total" className="mt-3">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" value={total} readOnly disabled />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-4 w-100">
              Registrar Venta
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Registrar un nuevo cliente */}
      <RegistrarCliente show={showRegistrarCliente} handleClose={handleCloseRegistrarCliente} />
    </>
  );
}

export default RegistrarVenta;
