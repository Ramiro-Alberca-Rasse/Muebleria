import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Table } from 'react-bootstrap';
import RegistrarCliente from '../../js/Clientes/RegistrarCliente'; // Importar el modal para Registrar cliente
import RegistrarSubVenta from './RegistrarSubVenta'; // Importar el modal para Registrar Subventa

function RegistrarVenta({ show, handleClose }) {
  const [clientes, setClientes] = useState([]); // Lista de clientes desde la API
  const [muebles, setMuebles] = useState([]); // Lista de muebles desde la API
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState(0); // Total es calculado, no modificable
  const [showRegistrarCliente, setShowRegistrarCliente] = useState(false); // Estado para el modal RegistrarCliente
  const [ventaParcial, setVentaParcial] = useState([]); // Array de ventas parciales
  const [showRegistrarSubVenta, setShowRegistrarSubVenta] = useState(false); // Estado para el modal RegistrarSubVenta

  // Establecer fecha actual y cargar clientes y muebles desde la API
  useEffect(() => {
    if (show) {
      const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      setFecha(fechaActual);

      // Obtener clientes y muebles desde la API de manera más eficiente
      Promise.all([
        fetch('/api/clientes').then((response) => response.json()),
        fetch('/api/muebles').then((response) => response.json())
      ])
        .then(([clientesData, mueblesData]) => {
          setClientes(clientesData);
          setMuebles(mueblesData);
        })
        .catch((error) => {
          console.error('Error al cargar los datos:', error);
          setClientes([]);
          setMuebles([]);
        });
    } else {
      // Resetear valores cuando el modal se cierra
      resetForm();
    }
  }, [show]);

  // Función para resetear todos los valores
  const resetForm = () => {
    setClienteSeleccionado('');
    setTotal(0);
    setVentaParcial([]);
  };

  // Maneja la adición de una venta parcial
  const agregarVentaParcial = (muebleSeleccionado, cantidad, subtotal) => {
    const nuevaVenta = { mueble: muebleSeleccionado, cantidad, subtotal };
    setVentaParcial([...ventaParcial, nuevaVenta]);

    const totalCalculado = ventaParcial.reduce((acc, item) => acc + item.subtotal, 0) + subtotal;
    setTotal(totalCalculado); // Actualizar el total
  };

  // Función de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Venta registrada:', { cliente: clienteSeleccionado, fecha, total, ventaParcial });
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

  // Función para abrir el modal RegistrarSubVenta
  const handleShowRegistrarSubVenta = () => setShowRegistrarSubVenta(true);

  // Función para cerrar el modal RegistrarSubVenta
  const handleCloseRegistrarSubVenta = () => {
    setShowRegistrarSubVenta(false);
    // Después de cerrar el modal de Subventa, se podría realizar alguna acción como refrescar la lista de ventas parciales
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

            {/* Botón Registrar Subventa */}
            <Button variant="success" type="button" onClick={handleShowRegistrarSubVenta} className="mt-3 w-100">
              Registrar Subventa
            </Button>

            {/* Tabla de ventas parciales */}
            {ventaParcial.length > 0 && (
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Mueble</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {ventaParcial.map((item, index) => (
                    <tr key={index}>
                      <td>{item.mueble.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

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

      {/* Modal para Registrar Subventa */}
      <RegistrarSubVenta
        show={showRegistrarSubVenta}
        handleClose={handleCloseRegistrarSubVenta}
        muebles={muebles}
        agregarVentaParcial={agregarVentaParcial}
      />
    </>
  );
}

export default RegistrarVenta;
