import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import api from '../../../services/api';


function RegistrarTipo({ show, handleClose}) {
  const [categoryName, setCategoryName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Reseteamos el formulario al cerrar el modal
  useEffect(() => {
    if (!show) {
      setCategoryName(''); // Resetea el valor del formulario
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert('Por favor, ingresa el nombre de la categoría.');
      return;
    }

    try {
      // Llamar a la API para Registrar la nueva categoría
      const response = await api.post('/tipos/registrar', categoryName, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      if (response.status === 201) {
      // Agregar la nueva categoría al estado de ListarMuebles
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        handleClose();
      }, 7000);
    }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('El tipo de mueble ya existe.');
      } else {
        setErrorMessage(
          'Ocurrió un error al registrar el tipo de mueble. Intente nuevamente.'
        );
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ borderColor: 'darkgray', borderWidth: '2px' }}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title><strong>Registrar Nuevo Tipo de Mueble</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label><strong>Nombre del tipo de Mueble</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del tipo"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                isInvalid={!!errorMessage} // Muestra el feedback de error
                style={{ borderColor: errorMessage ? 'darkred' : 'black' }}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
      </Modal>
      {showSuccess && (
        <div className="notification-container">
          <Alert variant="success" className="notification">
            Tipo de mueble registrado con éxito!
          </Alert>
        </div>
      )}
    </>
  );
}

export default RegistrarTipo;
