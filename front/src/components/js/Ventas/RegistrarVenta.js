import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Table } from 'react-bootstrap';
import RegistrarCliente from '../../js/Clientes/RegistrarCliente'; // Importar el modal para Registrar cliente
import RegistrarSubVenta from './RegistrarSubVenta'; // Importar el modal para Registrar Subventa
import api from '../../../services/api';

function RegistrarVenta({ show, handleClose }) {
  const [clientes, setClientes] = useState([]);
  const [muebles, setMuebles] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState(0);
  const [showRegistrarCliente, setShowRegistrarCliente] = useState(false);
  const [ventaParcial, setVentaParcial] = useState([]);
  const [showRegistrarSubVenta, setShowRegistrarSubVenta] = useState(false);

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
    setClienteSeleccionado('');
    setTotal(0);
    setVentaParcial([]);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaVenta = {
      idCliente: clienteSeleccionado,
      fecha,
      precioTotal: total,
      ventasMuebles: ventaParcial.map((subVenta) => ({
        idMueble: subVenta.mueble.id,
        cantidad: subVenta.cantidad,
        subTotal: subVenta.subtotal,
      })),
    };

    try {
      const response = await api.post('/ventas', nuevaVenta, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      for (const subVenta of ventaParcial) {
        const subVentaData = {
          idVenta: response.data.id,
          idMueble: subVenta.mueble.id,
          cantidad: subVenta.cantidad,
          subTotal: subVenta.subtotal,
        };

        try {
          await api.post('/ventaMuebles', subVentaData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (subVentaError) {
          console.error('Error al registrar subventa:', subVentaError);
        }
      }

      handleClose();
    } catch (error) {
      console.error('Error al registrar la venta principal:', error);
    }
  };

  const handleShowRegistrarCliente = () => setShowRegistrarCliente(true);
  const handleCloseRegistrarCliente = () => {
    setShowRegistrarCliente(false);
    api.get('/clientes')
      .then((response) => {
        if (response.status === 200) {
          setClientes(response.data);
        } else {
          console.error('Error al refrescar clientes:', response.status);
        }
      })
      .catch((error) => console.error('Error al refrescar clientes:', error));
  };

  const handleShowRegistrarSubVenta = () => setShowRegistrarSubVenta(true);
  const handleCloseRegistrarSubVenta = () => setShowRegistrarSubVenta(false);

  return (
    <>
      <div className={show ? 'modal-backdrop show' : ''}></div> {/* Añadir div para oscurecer el fondo */}
      <Modal show={show} onHide={handleClose} style={{ marginTop: '100px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
            {/* Selección de cliente */}
            <Form.Group controlId="Cliente">
              <Form.Label><strong>Cliente</strong></Form.Label>
              <Row className="align-items-center">
                <Col xs={10}> {/* Cambiado de xs={8} a xs={10} */}
                  <Form.Control
                    as="select"
                    value={clienteSeleccionado}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                    required
                    style={{ borderColor: '#343a40' }}
                  >
                    <option value="">Selecciona un cliente</option>
                    {clientes.length > 0 ? (
                      clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre} {cliente.apellido}
                        </option>
                      ))
                    ) : (
                      <option disabled>Cargando clientes...</option>
                    )}
                  </Form.Control>
                </Col>
                <Col xs={2} className="ps-1"> {/* Cambiado de xs={4} a xs={2} */}
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-100 custom-button-size"
                    onClick={handleShowRegistrarCliente}
                    style={{ marginLeft: '-2px' }}
                  >
                    Registrar
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            {/* Fecha actual */}
            <Form.Group controlId="Fecha" className="mt-3">
              <Form.Label><strong>Fecha</strong></Form.Label>
              <Form.Control type="date" value={fecha} readOnly disabled style={{ borderColor: '#343a40' }} />
            </Form.Group>

            {/* Botón Registrar Subventa */}
            <Button variant="primary" type="button" onClick={handleShowRegistrarSubVenta} className="mt-3 w-100">
              Registrar Subventa
            </Button>

            {/* Tabla de ventas parciales */}
            {ventaParcial.length > 0 && (
              <Table striped bordered hover className="mt-4" style={{ borderColor: '#343a40' }}>
                <thead className="thead-dark">
                  <tr>
                    <th style={{ borderColor: '#343a40' }}>Mueble</th>
                    <th style={{ borderColor: '#343a40' }}>Cantidad</th>
                    <th style={{ borderColor: '#343a40' }}>Subtotal</th>
                    <th style={{ borderColor: '#343a40' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ventaParcial.map((item, index) => (
                    <tr key={index}>
                      <td style={{ borderColor: '#343a40' }}>{item.mueble.nombre}</td>
                      <td style={{ borderColor: '#343a40' }}>{item.cantidad}</td>
                      <td style={{ borderColor: '#343a40' }}>{item.subtotal}</td>
                      <td style={{ borderColor: '#343a40' }}>
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
              <Form.Label><strong>Total</strong></Form.Label>
              <Form.Control type="number" value={total} readOnly disabled style={{ borderColor: '#343a40' }} />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-4 w-100">
              Registrar Venta
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <RegistrarCliente show={showRegistrarCliente} handleClose={handleCloseRegistrarCliente} />
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
