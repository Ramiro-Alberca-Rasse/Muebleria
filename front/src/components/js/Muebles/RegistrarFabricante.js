import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap'; // Importar Alert
import api from '../../../services/api'; // Ruta del backend
import '../../css/Modal.css';
import '../../css/Notification.css'; // Importar estilos para la notificación

function RegistrarFabricante({ show, handleClose }) {
  const [nombre, setNombre] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // Estado para el mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error

  useEffect(() => {
      if (!show) {
        setNombre(''); // Resetea el valor del formulario
      }
    }, [show]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/fabricantes/registrar', nombre, {
        headers: {
          'Content-Type': 'text/plain'
        }
      }); // Ruta del backend
      if (response.status === 201) {
        setShowSuccess(true); // Mostrar mensaje de éxito
        setTimeout(() => {
          setShowSuccess(false);
          handleClose();
        }, 7000); // Ocultar mensaje después de 3 segundos
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('El fabricante ya existe.');
      } else {
        setErrorMessage(
          'Ocurrió un error al registrar el fabricante. Intente nuevamente.'
        );
      }
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Fabricante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del fabricante"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                isInvalid={!!errorMessage} // Muestra el feedback de error
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
            Fabricante registrado con éxito!
          </Alert>
        </div>
      )}
    </>
  );
}

export default RegistrarFabricante;