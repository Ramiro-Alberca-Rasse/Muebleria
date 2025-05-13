import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../../services/api";

const ConfigurarNotificaciones = ({ show, cerrarModal }) => {
  const [notificacion, setNotificacion] = useState('');

  const handleGuardarCambios = async () => {
    try {
      await api.put("/ventaMuebles/notificacion", null, {
        params: { notificacion }
      });
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar la notificación:", error);
    }
  };

  return (
    <Modal show={show} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Configurar Notificaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-info" role="alert">
            Aquí puedes configurar la cantidad de stock mínima para recibir notificaciones de faltantes de stock.
        </div>
        <Form.Group>
           <Form.Label><strong>Cantidad</strong></Form.Label>
          <Form.Control
            type="number"
            value={notificacion}
            onChange={(e) => setNotificacion(parseInt(e.target.value))}
            style={{ borderColor: 'black' }}
            placeholder="Ingrese la cantidad"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleGuardarCambios}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfigurarNotificaciones;
