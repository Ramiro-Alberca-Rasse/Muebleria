import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import api from '../../../services/api';
import ConfirmarVenta from './ConfirmarVenta';
import RegistrarCliente from './RegistrarCliente';
import RegistrarSubVenta from './RegistrarSubVenta';

function RegistrarVenta({ show, handleClose }) {
  const [clientes, setClientes] = useState([]);
  const [muebles, setMuebles] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clienteBusqueda, setClienteBusqueda] = useState(''); // Estado para el término de búsqueda
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState(0);
  const [ventaParcial, setVentaParcial] = useState([]);
  const [showRegistrarCliente, setShowRegistrarCliente] = useState(false);
  const [showRegistrarSubVenta, setShowRegistrarSubVenta] = useState(false);
  const [showConfirmarVenta, setShowConfirmarVenta] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [moveLeft, setMoveLeft] = useState(false);

  useEffect(() => {
    if (show) {
      const fechaActual = new Date().toISOString().split('T')[0];
      setFecha(fechaActual);

      const fetchData = async () => {
        try {
          const [clientesResponse, mueblesResponse] = await Promise.all([
            api.get('/clientes'),
            api.get('/muebles'),
          ]);

          setClientes(Array.isArray(clientesResponse.data) ? clientesResponse.data : []);
          setMuebles(Array.isArray(mueblesResponse.data) ? mueblesResponse.data : []);
        } catch (error) {
          console.error('Error al cargar los datos:', error);
          setClientes([]);
          setMuebles([]);
        }
      };

      fetchData();
    } else {
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setClienteSeleccionado(null);
    setClienteBusqueda('');
    setTotal(0);
    setVentaParcial([]);
  };

  const handleClienteSeleccion = (cliente) => {
    setClienteSeleccionado(cliente);
    setClienteBusqueda(`${cliente.nombre} ${cliente.apellido}`); // Actualizamos el texto en el input
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    `${cliente.nombre} ${cliente.apellido}`.toLowerCase().startsWith(clienteBusqueda.toLowerCase())
  );

  const agregarVentaParcial = (muebleSeleccionado, cantidad, subtotal) => {
    const nuevaVenta = { mueble: muebleSeleccionado, cantidad, subtotal };
    const nuevaVentaParcial = [...ventaParcial, nuevaVenta];
    setVentaParcial(nuevaVentaParcial);

    const totalCalculado = nuevaVentaParcial.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(totalCalculado);
  };

  const eliminarVentaParcial = (index) => {
    const nuevasVentasParciales = ventaParcial.filter((_, i) => i !== index);
    setVentaParcial(nuevasVentasParciales);

    const totalCalculado = nuevasVentasParciales.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(totalCalculado);
  };

  const handleConfirmarVenta = (paymentMethod, billingInfo) => {
    console.log('Método de pago:', paymentMethod);
    console.log('Información de facturación:', billingInfo);
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const nuevaVenta = {
      idCliente: clienteSeleccionado.id,
      fecha,
      precioTotal: total,
      ventasMuebles: ventaParcial.map((subVenta) => ({
        id: 1,
        idVenta: 1,
        idMueble: subVenta.mueble.id,
        cantidad: subVenta.cantidad,
        subTotal: subVenta.subtotal,
        nombreMueble: subVenta.mueble.nombre,
      })),
    };

    try {
      const response = await api.post('/ventas', nuevaVenta, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMensajeExito('Venta registrada con éxito');
      setTimeout(() => {
        setMensajeExito('');
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      setErrorMessage(error.response?.data || 'Error al registrar la venta');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleShowRegistrarCliente = () => setShowRegistrarCliente(true);
  const handleCloseRegistrarCliente = () => {
    setShowRegistrarCliente(false);
    api.get('/clientes')
      .then((response) => {
        setClientes(response.data || []);
      })
      .catch((error) => console.error('Error al refrescar clientes:', error));
  };

  const handleShowRegistrarSubVenta = () => setShowRegistrarSubVenta(true);
  const handleCloseRegistrarSubVenta = () => setShowRegistrarSubVenta(false);

  const handleShowConfirmarVenta = () => {
    setMoveLeft(true);
    setShowConfirmarVenta(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Cliente">
              <Form.Label><strong>Cliente</strong></Form.Label>
              <Row className="align-items-center">
                <Col xs={8}>
                  <Form.Control
                    type="text"
                    placeholder="Buscar cliente"
                    value={clienteBusqueda}
                    onChange={(e) => {
                      setClienteBusqueda(e.target.value);
                      setClienteSeleccionado(null);
                      if (e.target.value === '') {
                          setClienteSeleccionado(null);
                      }
                    }}
                    style={{ borderColor: '#343a40' }}
                  />
                  {!clienteSeleccionado && (
                    <div
                      style={{
                        maxHeight: '150px',
                        overflowY: 'auto',
                        border: '1px solid #343a40',
                        marginTop: '5px',
                      }}
                    >
                      {clientesFiltrados.map((cliente) => (
                        <div
                          key={cliente.id}
                          onClick={() => handleClienteSeleccion(cliente)}
                          style={{
                            padding: '5px',
                            cursor: 'pointer',
                            backgroundColor: clienteSeleccionado?.id === cliente.id ? '#f0f0f0' : 'white',
                          }}
                        >
                          {cliente.nombre} {cliente.apellido}
                        </div>
                      ))}
                      {clientesFiltrados.length === 0 && (
                        <div style={{ padding: '5px', color: '#888' }}>No hay coincidencias</div>
                      )}
                    </div>
                  )}
                </Col>
                <Col xs={3}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-100"
                    onClick={handleShowRegistrarCliente}
                  >
                    Registrar
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="Fecha" className="mt-3">
              <Form.Label><strong>Fecha</strong></Form.Label>
              <Form.Control type="date" value={fecha} readOnly disabled style={{ borderColor: '#343a40' }} />
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              onClick={handleShowRegistrarSubVenta}
              className="mt-3 w-100"
            >
              Registrar Subventa
            </Button>

            {ventaParcial.length > 0 && (
              <Table striped bordered hover className="mt-4" style={{ borderColor: '#343a40' }}>
                <thead>
                  <tr>
                    <th>Mueble</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ventaParcial.map((item, index) => (
                    <tr key={index}>
                      <td>{item.mueble.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.subtotal}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => eliminarVentaParcial(index)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Form.Group controlId="Total" className="mt-3">
              <Form.Label><strong>Total</strong></Form.Label>
              <Form.Control type="text" value={total} readOnly disabled style={{ borderColor: '#343a40' }} />
            </Form.Group>

            <Button
              variant="success"
              type="button"
              onClick={handleShowConfirmarVenta}
              className="mt-3 w-100"
            >
              Confirmar Venta
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ConfirmarVenta
        show={showConfirmarVenta}
        handleClose={() => setShowConfirmarVenta(false)}
        handleConfirm={handleConfirmarVenta}
        cliente={clienteSeleccionado}
      />

      <RegistrarCliente show={showRegistrarCliente} handleClose={handleCloseRegistrarCliente} />

      <RegistrarSubVenta show={showRegistrarSubVenta} handleClose={handleCloseRegistrarSubVenta} />
    </>
  );
}

export default RegistrarVenta;
