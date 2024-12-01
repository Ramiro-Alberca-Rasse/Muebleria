// ListarVentas.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ListarVentas = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lista de Ventas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Contenido de la lista */}
        <p>Aquí va la lista de ventas.</p>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ListarVentas;
