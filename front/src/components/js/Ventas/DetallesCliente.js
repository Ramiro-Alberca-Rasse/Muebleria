import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

function DetallesCliente({ show, handleClose, cliente }) {
  if (!cliente) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <h5>Nombre Completo:</h5>
          <p>{cliente.nombre} {cliente.apellido}</p>
        </div>
        <div className="mb-3">
          <h5>Email:</h5>
          <p>{cliente.email}</p>
        </div>
        <div className="mb-3">
          <h5>Teléfono:</h5>
          <p>{cliente.telefono}</p>
        </div>
        <div className="mb-3">
          <h5>Dirección:</h5>
          <p>{cliente.direccion}</p>
        </div>
        <div className="mb-3">
          <h5>DNI:</h5>
          <p>{cliente.dni}</p>
        </div>
        <div className="mb-3">
          <h5>Historial de Ventas:</h5>
          {cliente.ventas && cliente.ventas.length > 0 ? (
            <Table striped bordered hover style={{ borderColor: '#343a40' }}>
              <thead>
                <tr>
                  <th style={{ borderColor: '#343a40' }}>ID Venta</th>
                  <th style={{ borderColor: '#343a40' }}>Fecha</th>
                  <th style={{ borderColor: '#343a40' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cliente.ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td style={{ borderColor: '#343a40' }}>{venta.id}</td>
                    <td style={{ borderColor: '#343a40' }}>
                      {new Date(venta.fecha).toLocaleDateString()}
                    </td>
                    <td style={{ borderColor: '#343a40' }}>
                      ${venta.precioTotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No hay ventas registradas para este cliente.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetallesCliente;