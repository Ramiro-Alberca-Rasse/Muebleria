import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Form, Row, Col } from 'react-bootstrap';
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
      } catch (error) {
        console.error('Error al eliminar la venta:', error);
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

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
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
                    as="select"
                    value={clienteSeleccionado}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                    style={styles.formControlCustom}
                  >
                    <option value="">Todos</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre} {cliente.apellido}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="mueble">
                  <Form.Label style={styles.formLabelCustom}>Mueble</Form.Label>
                  <Form.Control
                    as="select"
                    value={muebleSeleccionado}
                    onChange={(e) => setMuebleSeleccionado(e.target.value)}
                    style={styles.formControlCustom}
                  >
                    <option value="">Todos</option>
                    {muebles.map((mueble) => (
                      <option key={mueble.id} value={mueble.id}>
                        {mueble.nombre}
                      </option>
                    ))}
                  </Form.Control>
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
                      variant="primary"
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
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
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
    </>
  );
}

export default ListarVentas;
