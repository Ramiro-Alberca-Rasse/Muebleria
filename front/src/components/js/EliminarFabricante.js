import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import api from '../../services/api';

const EliminarFabricante = ({ show, cerrarModal }) => {
  const [fabricantes, setFabricantes] = useState([]);
  const [fabricante, setFabricante] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (show) {
      api.get("/fabricantes")
        .then(response => setFabricantes(response.data))
        .catch(error => console.error("Error al obtener fabricantes:", error));
    }
  }, [show]);

  const handleEliminar = () => {
    api.delete(`/fabricantes/${fabricante}`)
      .then(() => {
        console.log(`Fabricante eliminado: ${fabricante}`);
        setShowSuccess(true);
        setTimeout(() => {
          cerrarModal();
        }, 0);
        setTimeout(() => {
          setShowSuccess(false);

        }, 3000);
      })
      .catch(error => console.error("Error al eliminar fabricante:", error));
  };

  return (
    <>
      <Modal show={show} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Eliminar Fabricante</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFabricante">
              <Form.Label><strong>Seleccionar Fabricante</strong></Form.Label>
              <Form.Control 
                as="select" 
                value={fabricante} 
                onChange={(e) => setFabricante(e.target.value)}
                style={{ borderColor: 'black' }}
              >
                <option value="">Seleccione un fabricante</option>
                {fabricantes.map(fab => (
                  <option key={fab.id} value={fab.id}>{fab.nombre}</option>
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
          <Toast.Body style={{ fontSize: '1.2em' }}>Fabricante eliminado con éxito!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default EliminarFabricante;
