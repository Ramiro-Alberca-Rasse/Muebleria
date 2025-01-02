import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import api from '../../services/api';

const EliminarTipoDeMueble = ({ show, cerrarModal }) => {
  const [tiposDeMueble, setTiposDeMueble] = useState([]);
  const [tipoDeMueble, setTipoDeMueble] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (show) {
      api.get("/tipos")
        .then(response => setTiposDeMueble(response.data))
        .catch(error => console.error("Error al obtener tipos de mueble:", error));
    }
  }, [show]);

  const handleEliminar = () => {
    api.delete(`/api/tipos/${tipoDeMueble}`)
      .then(() => {
        console.log(`Tipo de mueble eliminado: ${tipoDeMueble}`);
        setShowSuccess(true);
        setTimeout(() => {
          cerrarModal();
        }, 0);
        setTimeout(() => {
          setShowSuccess(false);

        }, 3000);
      })
      .catch(error => console.error("Error al eliminar tipo de mueble:", error));
  };

  return (
    <Modal show={show} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title><strong>Eliminar Tipo de Mueble</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTipoDeMueble">
            <Form.Label><strong>Seleccionar Tipo de Mueble</strong></Form.Label>
            <Form.Control 
              as="select" 
              value={tipoDeMueble} 
              onChange={(e) => setTipoDeMueble(e.target.value)}
              style={{ borderColor: 'black' }}
            >
              <option value="">Seleccione un tipo de mueble</option>
              {tiposDeMueble.map(tipo => (
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
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowSuccess(false)}
          show={showSuccess}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body style={{ fontSize: '1.2em' }}>Tipo de mueble eliminado con éxito!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Modal>
  );
};

export default EliminarTipoDeMueble;
