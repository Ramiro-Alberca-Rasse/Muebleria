import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../../../services/api';

function RegistrarCliente({ show, handleClose, handleSave }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoCliente = { nombre, apellido, direccion, telefono, email, dni };

    try {
      const response = await api.post('/clientes', nuevoCliente);
      /* if (response.status === 201) {
        setShowSuccess(true);
        handleReset();
        setTimeout(() => {
          setShowSuccess(false);
          handleClose();
        }, 4000);
      } */
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
    }

    // Limpiar los campos después de guardar
    setNombre('');
    setApellido('');
    setDireccion('');
    setTelefono('');
    setEmail('');
    setDni('');

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
          <Form.Group controlId="apellidoCliente" className="mt-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido del cliente"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="direccionCliente" className="mt-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección del cliente"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="telefonoCliente" className="mt-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono del cliente"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="emailCliente" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email del cliente"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="dniCliente" className="mt-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="DNI del cliente"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
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
