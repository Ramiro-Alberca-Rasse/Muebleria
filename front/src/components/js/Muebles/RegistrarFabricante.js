import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Draggable from 'react-draggable'; // Importar Draggable
import api from '../../../services/api'; // Ruta del backend
import '../../css/Modal.css';

function RegistrarFabricante({ show, handleClose, handleCreateFabricante }) {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/fabricantes/crear', { nombre }); // Ruta del backend
      if (response.status === 200) {
        handleCreateFabricante(response.data);
        handleClose();
      }
    } catch (error) {
      console.error('Error al registrar el fabricante:', error);
    }
  };

  return (
    // Wrapping the entire Modal in Draggable to make the whole Modal draggable
    <Draggable handle=".modal-header">
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          className="custom-modal"
          size="lg"
          dialogClassName="modal-90w" // Ensures modal is large enough
        >
          <Modal.Header closeButton className="modal-header">
            <Modal.Title>Registrar Fabricante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre del fabricante"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 w-100">
                Registrar Fabricante
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Draggable>
  );
}

export default RegistrarFabricante;
