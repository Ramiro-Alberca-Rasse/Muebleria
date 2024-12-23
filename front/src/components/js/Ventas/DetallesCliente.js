import React from 'react';
import { Modal, Button } from 'react-bootstrap';

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
          <h5>Ciudad:</h5>
          <p>{cliente.ciudad}</p>
        </div>
        <div className="mb-3">
          <h5>País:</h5>
          <p>{cliente.pais}</p>
        </div>
        {/* Agrega más campos según sea necesario */}
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
