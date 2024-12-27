import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import api from '../../../services/api';

function RegistrarTipoDeMadera({ show, handleClose }) {
  const [nombreTipo, setNombreTipo] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!show) {
      setNombreTipo('');
      setErrorMessage('');
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreTipo.trim()) {
      setErrorMessage('El nombre del tipo de madera no puede estar vacío.');
      return;
    }

    try {
      const response = await api.post('/tiposdemadera/registrar', nombreTipo, {
        headers: { 'Content-Type': 'text/plain' }
      });

      if (response.status === 201) {
        setShowSuccessToast(true);
        setMensajeExito('Tipo de madera registrado con éxito');
        setTimeout(() => {
          setShowSuccessToast(false);

        }, 3000);

        setTimeout(() =>{
          handleClose();
        }, 0);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('El tipo de madera ya existe.');
      } else {
        setErrorMessage('Ocurrió un error al registrar el tipo de madera. Intente nuevamente.');
      }
    }
  };

  const ElementoNoOscurecido = ({ children }) => {
    return createPortal(children, document.body);
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
                isInvalid={!!errorMessage}
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

export default RegistrarTipoDeMadera;