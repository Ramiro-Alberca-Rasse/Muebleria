import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Form, Row, Col, Toast, ToastContainer, Alert } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import api from '../../../services/api';
import DetallesVenta from './DetallesVenta';

function ListarVentas({ show, handleClose }) {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [muebles, setMuebles] = useState([]);
  const [showDetalles, setShowDetalles] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [muebleSeleccionado, setMuebleSeleccionado] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [ventaToDelete, setVentaToDelete] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [clienteBusqueda, setClienteBusqueda] = useState(''); // Estado para el término de búsqueda de cliente
  const [muebleBusqueda, setMuebleBusqueda] = useState(''); // Estado para el término de búsqueda de mueble

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await api.get('/ventas', {
          params: {
            fechaInicio,
            fechaFin,
            cliente: clienteSeleccionado,
            mueble: muebleSeleccionado,
          },
        });
        setVentas(response.data);
      } catch (error) {
        console.error('Error al cargar las ventas:', error);
      }
    };

    const fetchClientes = async () => {
      try {
        const response = await api.get('/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al cargar los clientes:', error);
      }
    };

    const fetchMuebles = async () => {
      try {
        const response = await api.get('/muebles');
        setMuebles(response.data);
      } catch (error) {
        console.error('Error al cargar los muebles:', error);
      }
    };

    fetchVentas();
    fetchClientes();
    fetchMuebles();
  }, [fechaInicio, fechaFin, clienteSeleccionado, muebleSeleccionado]);

  const handleDelete = async () => {
    if (ventaToDelete) {
      try {
        await api.delete(`/ventas/${ventaToDelete.id}`);
        setVentas(ventas.filter((venta) => venta.id !== ventaToDelete.id));
        setShowDeleteConfirm(false);
        setVentaToDelete(null);
        setShowSuccessToast(true);
        setMensajeExito('Venta eliminada con éxito');
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 3000);
      } catch (error) {
        console.error('Error al eliminar la venta:', error);
        setErrorMessage('Error al eliminar la venta');
      }
    }
  };

  const handleShowDeleteConfirm = (venta) => {
    setVentaToDelete(venta);
    setShowDeleteConfirm(true);
  };

  const handleShowDetalles = (venta) => {
    setVentaSeleccionada(venta);
    setShowDetalles(true);
  };

  const handleCloseDetalles = () => {
    setShowDetalles(false);
    setVentaSeleccionada(null);
  };

  const handleCloseAndReset = () => {
    setFechaInicio(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]);
    setFechaFin(new Date().toISOString().split('T')[0]);
    setClienteSeleccionado('');
    setMuebleSeleccionado('');
    setClienteBusqueda('');
    setMuebleBusqueda('');
    handleClose();
  };

  const styles = {
    filterRow: { marginBottom: '20px' },
    formControlCustom: {
      border: '2px solid #343a40',
      borderRadius: '5px',
      padding: '8px',
      fontSize: '1rem',
      transition: 'box-shadow 0.3s ease',
    },
    formControlFocus: {
      borderColor: '#007bff',
      boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
    },
    formLabelCustom: { fontWeight: 'bold', color: '#343a40' },
    tableCustom: { border: '2px solid #343a40' },
    tableCell: { borderColor: '#343a40' },
    tableRowHover: { backgroundColor: '#f8f9fa' },
  };

  const ElementoNoOscurecido = ({ children }) => {
    return createPortal(children, document.body);
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    `${cliente.nombre} ${cliente.apellido}`.toLowerCase().startsWith(clienteBusqueda.toLowerCase())
  );

  const mueblesFiltrados = muebles.filter((mueble) =>
    mueble.nombre.toLowerCase().startsWith(muebleBusqueda.toLowerCase())
  );

  return (
    <>
      <Modal show={show} onHide={handleCloseAndReset} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Lista de Ventas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row style={styles.filterRow}>
              <Col md={6}>
                <Form.Group controlId="fechaInicio">
                  <Form.Label style={styles.formLabelCustom}>Fecha Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    style={styles.formControlCustom}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fechaFin">
                  <Form.Label style={styles.formLabelCustom}>Fecha Fin</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    style={styles.formControlCustom}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={styles.filterRow}>
              <Col md={6}>
                <Form.Group controlId="cliente">
                  <Form.Label style={styles.formLabelCustom}>Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Buscar cliente"
                    value={clienteBusqueda}
                    onChange={(e) => {
                      setClienteBusqueda(e.target.value);
                      setClienteSeleccionado('');
                      if (e.target.value === '') {
                        setClienteSeleccionado('');
                      }
                    }}
                    style={styles.formControlCustom}
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
                          onClick={() => {
                            setClienteSeleccionado(cliente.id);
                            setClienteBusqueda(`${cliente.nombre} ${cliente.apellido}`);
                          }}
                          style={{
                            padding: '5px',
                            cursor: 'pointer',
                            backgroundColor: clienteSeleccionado === cliente.id ? '#f0f0f0' : 'white',
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
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="mueble">
                  <Form.Label style={styles.formLabelCustom}>Mueble</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Buscar mueble"
                    value={muebleBusqueda}
                    onChange={(e) => {
                      setMuebleBusqueda(e.target.value);
                      setMuebleSeleccionado('');
                      if (e.target.value === '') {
                        setMuebleSeleccionado('');
                      }
                    }}
                    style={styles.formControlCustom}
                  />
                  {!muebleSeleccionado && (
                    <div
                      style={{
                        maxHeight: '150px',
                        overflowY: 'auto',
                        border: '1px solid #343a40',
                        marginTop: '5px',
                      }}
                    >
                      {mueblesFiltrados.map((mueble) => (
                        <div
                          key={mueble.id}
                          onClick={() => {
                            setMuebleSeleccionado(mueble.id);
                            setMuebleBusqueda(mueble.nombre);
                          }}
                          style={{
                            padding: '5px',
                            cursor: 'pointer',
                            backgroundColor: muebleSeleccionado === mueble.id ? '#f0f0f0' : 'white',
                          }}
                        >
                          {mueble.nombre}
                        </div>
                      ))}
                      {mueblesFiltrados.length === 0 && (
                        <div style={{ padding: '5px', color: '#888' }}>No hay coincidencias</div>
                      )}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Table striped bordered hover style={styles.tableCustom}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.id} style={styles.tableRowHover}>
                  <td>{venta.id}</td>
                  <td>{venta.nombreCliente + ' ' + venta.apellidoCliente}</td>
                  <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                  <td>{venta.precioTotal}</td>
                  <td>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleShowDetalles(venta)}
                    >
                      Detalles
                    </Button>{' '}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleShowDeleteConfirm(venta)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAndReset}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} dialogClassName="custom-modal" style={{ marginTop: '20px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar la venta "{ventaToDelete?.id}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {ventaSeleccionada && (
        <DetallesVenta
          show={showDetalles}
          handleClose={handleCloseDetalles}
          venta={ventaSeleccionada}
        />
      )}

      <ElementoNoOscurecido>
        <ToastContainer position="bottom-end" className="p-3">
          <Toast
            onClose={() => setShowSuccessToast(false)}
            show={showSuccessToast}
            delay={3000}
            autohide
            bg="success"
          >
            <Toast.Body style={{ fontSize: '1.2em' }}>{mensajeExito}</Toast.Body>
          </Toast>
        </ToastContainer>

        {errorMessage && (
          <div className="notification-container-bottom-right">
            <Alert variant="danger" className="notification" style={{ fontSize: '1.2em' }}>
              {errorMessage}
            </Alert>
          </div>
        )}
      </ElementoNoOscurecido>

      <style jsx>{`
              .custom-modal .modal-content {
          border: 2px solid black;
        }
        .notification-container-bottom-right {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1050;
        }
      `}</style>
    </>
  );
}

export default ListarVentas;