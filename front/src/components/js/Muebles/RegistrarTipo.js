import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import api from '../../../services/api';

function RegistrarTipo({ show, handleClose }) {
  const [categoryName, setCategoryName] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!show) {
      setCategoryName('');
      setErrorMessage('');
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert('Por favor, ingresa el nombre de la categoría.');
      return;
    }

    try {
      const response = await api.post('/tipos/registrar', categoryName, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      if (response.status === 201) {
        setShowSuccessToast(true);
        setMensajeExito('Tipo de mueble registrado con éxito');
        setTimeout(() => {
          setShowSuccessToast(false);

        }, 3000);

        setTimeout(() =>{
          handleClose();
        }, 0);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('El tipo de mueble ya existe.');
      } else {
        setErrorMessage('Ocurrió un error al registrar el tipo de mueble. Intente nuevamente.');
      }
    }
  };

  const ElementoNoOscurecido = ({ children }) => {
    return createPortal(children, document.body);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ borderColor: 'darkgray', borderWidth: '2px', marginTop: '20px' }} className="custom-modal">
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

export default RegistrarTipo;