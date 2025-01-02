import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import EliminarPartesMueble from "./EliminarFabricante";
import EliminarTipoDeMueble from "./EliminarTipoDeMueble";
import EliminarTipoDeMadera from "./EliminarTipoDeMadera";
import ConfigurarNotificaciones from "./ConfigurarNotificaciones"; // Importar el nuevo componente

const Ajustes = ({ cerrarAjustes }) => {
  const [showEliminarPartes, setShowEliminarPartes] = useState(false);
  const [showEliminarTipoDeMueble, setShowEliminarTipoDeMueble] = useState(false);
  const [showEliminarTipoDeMadera, setShowEliminarTipoDeMadera] = useState(false);
  const [showConfigurarNotificaciones, setShowConfigurarNotificaciones] = useState(false);

  const handleShowEliminarPartes = () => setShowEliminarPartes(true);
  const handleCloseEliminarPartes = () => setShowEliminarPartes(false);

  const handleShowEliminarTipoDeMueble = () => setShowEliminarTipoDeMueble(true);
  const handleCloseEliminarTipoDeMueble = () => setShowEliminarTipoDeMueble(false);

  const handleShowEliminarTipoDeMadera = () => setShowEliminarTipoDeMadera(true);
  const handleCloseEliminarTipoDeMadera = () => setShowEliminarTipoDeMadera(false);

  const handleShowConfigurarNotificaciones = () => setShowConfigurarNotificaciones(true);
  const handleCloseConfigurarNotificaciones = () => setShowConfigurarNotificaciones(false);

  return (
    <>
      <Modal show onHide={cerrarAjustes}>
        <Modal.Header closeButton>
          <Modal.Title>Ajustes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Contenido de los ajustes */}
          <div className="d-grid gap-2">
            <Button variant="danger" onClick={handleShowEliminarPartes}>
              Eliminar Fabricante
            </Button>
            <Button variant="danger" onClick={handleShowEliminarTipoDeMueble}>
              Eliminar Tipo de Mueble
            </Button>
            <Button variant="danger" onClick={handleShowEliminarTipoDeMadera}>
              Eliminar Tipo de Madera
            </Button>
            <Button variant="primary" onClick={handleShowConfigurarNotificaciones}>
              Configurar Notificaciones
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarAjustes}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <EliminarPartesMueble show={showEliminarPartes} cerrarModal={handleCloseEliminarPartes} />
      <EliminarTipoDeMueble show={showEliminarTipoDeMueble} cerrarModal={handleCloseEliminarTipoDeMueble} />
      <EliminarTipoDeMadera show={showEliminarTipoDeMadera} cerrarModal={handleCloseEliminarTipoDeMadera} />
      <ConfigurarNotificaciones show={showConfigurarNotificaciones} cerrarModal={handleCloseConfigurarNotificaciones} />
    </>
  );
};

export default Ajustes;
