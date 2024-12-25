import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import api from '../../../services/api';


function RegistrarTipoDeMadera({ show, handleClose}) {
  const [nombreTipo, setNombreTipo] = useState(''); // Estado para el nombre del tipo de madera
  const [showSuccess, setShowSuccess] = useState(false); // Estado para el mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error

  useEffect(() => {
    if (!show) {
      setNombreTipo(''); // Resetea el valor del formulario al cerrar el modal
      setErrorMessage(''); // Limpia mensajes de error al cerrar
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreTipo.trim()) {
      setErrorMessage('El nombre del tipo de madera no puede estar vacío.');
      return;
    }

    try {
      // Llama a la API para registrar el nuevo tipo de madera
      const response = await api.post(
        '/tiposdemadera/registrar',
        nombreTipo,
        {
          headers: { 'Content-Type': 'text/plain' },
        }
      );

      // Verifica que la respuesta sea exitosa
      if (response.status === 201) {
        setShowSuccess(true); // Mostrar mensaje de éxito
        setTimeout(() => {
          setShowSuccess(false);
          handleClose(); // Cierra el modal después de agregar
        }, 7000); // Ocultar mensaje después de 3 segundos
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('El tipo de madera ya existe.');
      } else {
        setErrorMessage(
          'Ocurrió un error al registrar el tipo de madera. Intente nuevamente.'
        );
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ borderColor: 'darkgray', borderWidth: '2px' }}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title><strong>Registrar Tipo de Madera</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="nombreTipoMadera">
              <Form.Label><strong>Nombre de la Madera</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la madera"
                value={nombreTipo}
                onChange={(e) => setNombreTipo(e.target.value)}
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
            <Button variant="primary" onClick={handleSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {showSuccess && (
        <div className="notification-container" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <Alert variant="success" className="notification">
            Tipo de madera registrado con éxito!
          </Alert>
        </div>
      )}
    </>
  );
}

export default RegistrarTipoDeMadera;
