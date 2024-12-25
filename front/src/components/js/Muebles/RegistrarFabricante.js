import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap'; // Importar Alert
import api from '../../../services/api'; // Ruta del backend


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
      setErrorMessage('');
      if (error.response && error.response.status === 409) {
        setErrorMessage('El fabricante ya existe.');
      } else {
        setErrorMessage('Ocurrió un error al registrar el fabricante. Intente nuevamente.'); 
      }
    }
  }


  useEffect(() => {
    if (!show) {
      setErrorMessage('');
    }
  }, [show]);


  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ borderColor: 'darkgray', borderWidth: '2px' }}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title><strong>Registrar Fabricante</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formNombre">
              <Form.Label><strong>Nombre del Fabricante</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del fabricante"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
        <div className="notification-container" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <Alert variant="success" className="notification">
            Fabricante registrado con éxito!
          </Alert>
        </div>
      )}
    </>
  );
}

export default RegistrarFabricante;