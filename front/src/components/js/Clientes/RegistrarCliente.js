import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function RegistrarCliente({ show, handleClose, handleSave }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Llamamos a la función handleSave para enviar los datos al componente principal
    handleSave({ nombre, email });

    // Limpiar los campos después de guardar
    setNombre('');
    setEmail('');

    // Cerrar el modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombreCliente">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del cliente"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="emailCliente" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email del cliente"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" className="mt-4 w-100" type="submit">
            Registrar Cliente
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegistrarCliente;
