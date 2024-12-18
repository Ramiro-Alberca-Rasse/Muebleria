import React, { useState, useEffect } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import api from '../../../services/api';
import DetallesVenta from './DetallesVenta'; // Importar el componente DetallesVenta

function ListarVentas({ show, handleClose }) {
  const [ventas, setVentas] = useState([]);
  const [showDetalles, setShowDetalles] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await api.get('/ventas');
        
        // Log para inspeccionar la respuesta completa
        console.log('Respuesta de la API:', response); // Ver la respuesta completa de la API
        console.log('Datos de la respuesta:', response.data); // Verificar qué contiene 'data'

        // Verificar si 'precioTotal' está disponible en los datos
        if (Array.isArray(response.data)) {
          response.data.forEach(venta => {
            console.log('Venta:', venta);
            console.log('Precio Total:', venta.precioTotal); // Verifica si 'precioTotal' está presente
          });
        }

        // Actualizar el estado con los datos de la respuesta
        setVentas(response.data);
      } catch (error) {
        console.error('Error al cargar las ventas:', error);
      }
    };

    fetchVentas();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta venta?');
    if (confirmDelete) {
      try {
        await api.delete(`/ventas/${id}`);
        setVentas(ventas.filter((venta) => venta.id !== id));
      } catch (error) {
        console.error('Error al eliminar la venta:', error);
      }
    }
  };

  const handleShowDetalles = (venta) => {
    setVentaSeleccionada(venta);
    setShowDetalles(true);
  };

  const handleCloseDetalles = () => {
    setShowDetalles(false);
    setVentaSeleccionada(null);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Lista de Ventas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
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
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.nombreCliente + " " + venta.apellidoCliente}</td>
                  <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                  <td>{venta.precioTotal}</td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => handleShowDetalles(venta)}>Detalles</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(venta.id)}>Eliminar</Button>
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
