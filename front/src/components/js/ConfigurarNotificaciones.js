import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfigurarNotificaciones = ({ show, cerrarModal }) => {
  return (
    <Modal show={show} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Configurar Notificaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Contenido para configurar notificaciones */}
        <p>Aquí puedes configurar tus notificaciones.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={cerrarModal}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfigurarNotificaciones;
