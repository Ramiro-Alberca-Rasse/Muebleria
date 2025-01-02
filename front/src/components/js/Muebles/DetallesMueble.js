import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DetallesMueble({ show, handleClose, mueble }) {
  if (!mueble) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose} style={{ marginTop: '20px' }} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Mueble</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <h5>Nombre:</h5>
          <p>{mueble.nombre}</p>
        </div>
        <div className="mb-3">
          <h5>Tipo de Mueble:</h5>
          <p>{mueble.tipo ? mueble.tipo : 'Sin Tipo'}</p>
        </div>
        <div className="mb-3">
          <h5>Tipo de Madera:</h5>
          <p>{mueble.tipoMadera ? mueble.tipoMadera : 'Sin Tipo de Madera'}</p>
        </div>
        <div className="mb-3">
          <h5>Fabricante:</h5>
          <p>{mueble.fabricante ? mueble.fabricante : 'Sin Fabricante'}</p>
        </div>
        <div className="mb-3">
          <h5>Stock:</h5>
          <p>{mueble.stock}</p>
        </div>
        <div className="mb-3">
          <h5>Precio:</h5>
          <p>${mueble.precio.toFixed(2)}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
      <style jsx>{`
        .custom-modal .modal-content {
            border: 2px solid black;
        }
      `}</style>
    </Modal>
  );
}

export { DetallesMueble };
