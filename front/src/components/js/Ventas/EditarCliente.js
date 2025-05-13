import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Toast, ToastContainer, Alert } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import api from '../../../services/api';

function EditarCliente({ show, handleClose, cliente, onClienteUpdated }) {
  const [initialFormData, setInitialFormData] = useState({
    id: cliente.id,
    nombre: cliente.nombre || '',
    apellido: cliente.apellido || '',
    direccion: cliente.direccion || '',
    telefono: cliente.telefono || '',
    email: cliente.email || '',
    cuit: cliente.cuit || '',
  });

  const [formData, setFormData] = useState(initialFormData);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setInitialFormData({
      id: cliente.id,
      nombre: cliente.nombre || '',
      apellido: cliente.apellido || '',
      direccion: cliente.direccion || '',
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      cuit: cliente.cuit || '',
    });
    setFormData({
      id: cliente.id,
      nombre: cliente.nombre || '',
      apellido: cliente.apellido || '',
      direccion: cliente.direccion || '',
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      cuit: cliente.cuit || '',
    });
  }, [cliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosAEnviar = {
      ...formData,
      nombre: formData.nombre || null,
      apellido: formData.apellido || null,
      direccion: formData.direccion || '',
      telefono: formData.telefono || '',
      email: formData.email || '',
      cuit: formData.cuit || '',
    };

    console.log('Datos a enviar:', datosAEnviar.cuit); // Mostrar los datos que se envían

    try {
      const response = await api.put(`/clientes/update/${formData.id}/${formData.cuit}`, datosAEnviar);
      onClienteUpdated();
      setShowSuccessToast(true);
      setMensajeExito('Cliente actualizado con éxito');
      setTimeout(() => {
        setShowSuccessToast(false);
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      setErrorMessage('Error al actualizar el cliente');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleCloseWithReset = () => {
    resetForm();
    handleClose();
  };

  const ElementoNoOscurecido = ({ children }) => {
    return createPortal(children, document.body);
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseWithReset} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombreCliente">
              <Form.Label><strong>Nombre*</strong></Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Nombre del cliente"
                value={formData.nombre}
                onChange={handleChange}
                required
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="apellidoCliente" className="mt-3">
              <Form.Label><strong>Apellido*</strong></Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                placeholder="Apellido del cliente"
                value={formData.apellido}
                onChange={handleChange}
                required
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="direccionCliente" className="mt-3">
              <Form.Label><strong>Dirección</strong></Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                placeholder="Dirección del cliente"
                value={formData.direccion}
                onChange={handleChange}
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="telefonoCliente" className="mt-3">
              <Form.Label><strong>Teléfono</strong></Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                placeholder="Teléfono del cliente"
                value={formData.telefono}
                onChange={handleChange}
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="emailCliente" className="mt-3">
              <Form.Label><strong>Email</strong></Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email del cliente"
                value={formData.email}
                onChange={handleChange}
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Form.Group controlId="cuitCliente" className="mt-3">
              <Form.Label><strong>CUIT</strong></Form.Label>
              <Form.Control
                type="text"
                name="cuit"
                placeholder="cuit del cliente"
                value={formData.cuit}
                onChange={handleChange}
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
            <Button variant="success" className="mt-4 w-100" type="submit">
              Guardar Cambios
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
                    .custom-modal .modal-content {
          border: 2px solid black;
        }
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

export default EditarCliente;