import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import api from '../../../services/api';

const EliminarTipoDeMadera = ({ show, cerrarModal }) => {
  const [tiposDeMadera, setTiposDeMadera] = useState([]);
  const [tipoDeMadera, setTipoDeMadera] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (show) {
      api.get("/tiposdemadera")
        .then(response => setTiposDeMadera(response.data))
        .catch(error => console.error("Error al obtener tipos de madera:", error));
    }
  }, [show]);

  const handleEliminar = () => {
    api.delete(`/tiposdemadera/${tipoDeMadera}`)
      .then(() => {
        console.log(`Tipo de madera eliminado: ${tipoDeMadera}`);
        setShowSuccess(true);
        setTimeout(() => {
          cerrarModal();
        }, 0);
        setTimeout(() => {
          setShowSuccess(false);

        }, 3000);
      })
      .catch(error => console.error("Error al eliminar tipo de madera:", error));
  };

  return (
    <>
      <Modal show={show} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Eliminar Tipo de Madera</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTipoDeMadera">
              <Form.Label><strong>Seleccionar Tipo de Madera</strong></Form.Label>
              <Form.Control 
                as="select" 
                value={tipoDeMadera} 
                onChange={(e) => setTipoDeMadera(e.target.value)}
                style={{ borderColor: 'black' }}
              >
                <option value="">Seleccione un tipo de madera</option>
                {tiposDeMadera.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowSuccess(false)}
          show={showSuccess}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body style={{ fontSize: '1.2em' }}>Tipo de madera eliminado con éxito!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default EliminarTipoDeMadera;
