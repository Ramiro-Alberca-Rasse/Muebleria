import React, { useState } from 'react';
import { Modal, Form, Button, Toast, ToastContainer, Alert } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import api from '../../../services/api';

function RegistrarCliente({ show, handleClose, handleSave }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [cuit, setCuit] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleReset = () => {
    setNombre('');
    setApellido('');
    setDireccion('');
    setTelefono('');
    setEmail('');
    setCuit('');
  };

  const handleCloseAndReset = () => {
    handleReset();
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoCliente = { nombre, apellido, direccion, telefono, email, cuit };

    try {
      const response = await api.post('/clientes', nuevoCliente);
        handleReset();
        setShowSuccessToast(true);
        setMensajeExito('Cliente registrado con éxito');
        setTimeout(() => {
          setShowSuccessToast(false);
          handleClose();
        }, 3000);
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
      setErrorMessage('Error al registrar el cliente');
    }

    // Limpiar los campos después de guardar
    setNombre('');
    setApellido('');
    setDireccion('');
    setTelefono('');
    setEmail('');
    setCuit('');

    // Cerrar el modal
    handleClose();
  };

  const ElementoNoOscurecido = ({ children }) => {
    return createPortal(children, document.body);
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseAndReset}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombreCliente">
              <Form.Label><strong>Nombre*</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del cliente"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="apellidoCliente" className="mt-3">
              <Form.Label><strong>Apellido*</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido del cliente"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="direccionCliente" className="mt-3">
              <Form.Label><strong>Dirección</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección del cliente"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="telefonoCliente" className="mt-3">
              <Form.Label><strong>Teléfono</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Teléfono del cliente"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="emailCliente" className="mt-3">
              <Form.Label><strong>Email</strong></Form.Label>
              <Form.Control
                type="email"
                placeholder="Email del cliente"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="uitCliente" className="mt-3">
              <Form.Label><strong>CUIT</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="cuit del cliente"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Button variant="success" className="mt-4 w-100" type="submit">
              Registrar Cliente
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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

export default RegistrarCliente;
