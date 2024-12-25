import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import StockActualModal from './StockActual'; // Importar el componente modal de stock actual
import CambiosStock from './CambiosStock'; // Importar el componente modal de cambios de stock

function GenerarReportesModal({ show, handleClose, cambios }) {
  const [showStockActualModal, setShowStockActualModal] = useState(false);
  const [showCambiosStockModal, setShowCambiosStockModal] = useState(false);

  const handleStockActual = () => {
    setShowStockActualModal(true);
  };

  const handleCloseStockActual = () => setShowStockActualModal(false);

  const handleCambiosStock = () => {
    setShowCambiosStockModal(true);
  };

  const handleCloseCambiosStock = () => setShowCambiosStockModal(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generar Reportes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" className="w-100 mb-2" onClick={handleStockActual}>Reporte de Stock Actual</Button>
          <Button variant="success" className="w-100" onClick={handleCambiosStock}>Reporte de Cambios en el Stock</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* Aquí se renderiza el modal de stock actual */}
      <StockActualModal show={showStockActualModal} handleClose={handleCloseStockActual} />

      {/* Aquí se renderiza el modal de cambios de stock */}
      <CambiosStock show={showCambiosStockModal} handleClose={handleCloseCambiosStock} cambios={cambios} />
    </>
  );
}

export default GenerarReportesModal;
