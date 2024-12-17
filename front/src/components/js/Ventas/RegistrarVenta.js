import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Table } from 'react-bootstrap';
import RegistrarCliente from '../../js/Clientes/RegistrarCliente'; // Importar el modal para Registrar cliente
import RegistrarSubVenta from './RegistrarSubVenta'; // Importar el modal para Registrar Subventa
import api from '../../../services/api';

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

      // Obtener clientes y muebles desde la API usando api.get
      const fetchData = async () => {
        try {
          const [clientesResponse, mueblesResponse] = await Promise.all([
            api.get('/clientes'),
            api.get('/muebles')
          ]);
          setClientes(clientesResponse.data);
          setMuebles(mueblesResponse.data);
        } catch (error) {
          console.error('Error al cargar los datos:', error);
          setClientes([]);
          setMuebles([]);
        }
      };

      fetchData();
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

  // Función para eliminar una venta parcial
  const eliminarVentaParcial = (index) => {
    const nuevasVentasParciales = ventaParcial.filter((_, i) => i !== index);
    setVentaParcial(nuevasVentasParciales);

    const totalCalculado = nuevasVentasParciales.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(totalCalculado); // Actualizar el total
  };

  // Función de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const nuevaVenta = {
      cliente: clienteSeleccionado,
      fecha,
      total,
      ventaParcial
    };
  
    console.log('Datos de nuevaVenta:', nuevaVenta); // Log para revisar el objeto enviado
  
    try {
      // Enviar la venta principal
      console.log('Enviando POST a /ventas...');
      const response = await api.post('/ventas', nuevaVenta, {
        headers: {
          'Content-Type': 'application/json', // Asegura que se envía como JSON
        },
      });
      console.log('Venta registrada:', response.data); // Log para revisar la respuesta del servidor
  
      // Enviar cada subventa al backend
      for (const subVenta of ventaParcial) {
        console.log('Enviando subventa:', {
          ventaId: response.data.id,
          muebleId: subVenta.mueble.id,
          cantidad: subVenta.cantidad,
          subtotal: subVenta.subtotal,
        });
  
        const subVentaResponse = await api.post('/ventaMuebles', {
          ventaId: response.data.id, // Asumiendo que la respuesta contiene el ID de la venta
          muebleId: subVenta.mueble.id,
          cantidad: subVenta.cantidad,
          subtotal: subVenta.subtotal,
        });
  
        console.log('Subventa registrada:', subVentaResponse.data);
      }
  
      console.log('Todas las ventas y subventas fueron registradas correctamente.');
      handleClose(); // Cierra el modal después de registrar la venta y subventas
    } catch (error) {
      console.error('Error al registrar la venta:', error);
  
      if (error.response) {
        console.error('Detalles del error (response):', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor (request):', error.request);
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  };
  

  // Función para abrir el modal RegistrarCliente
  const handleShowRegistrarCliente = () => setShowRegistrarCliente(true);

  // Función para cerrar el modal RegistrarCliente
  const handleCloseRegistrarCliente = () => {
    setShowRegistrarCliente(false);
    // Refrescar la lista de clientes después de agregar uno nuevo
    api.fetch('/clientes')
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
                    <th>Acciones</th> {/* Nueva columna para acciones */}
                  </tr>
                </thead>
                <tbody>
                  {ventaParcial.map((item, index) => (
                    <tr key={index}>
                      <td>{item.mueble.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.subtotal}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => eliminarVentaParcial(index)}>
                          Eliminar
                        </Button>
                      </td>
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
