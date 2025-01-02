import React, { useState, useEffect } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import api from '../../../services/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import  EditarMueble  from './EditarMueble'; // Importar como exportación nombrada
import { DetallesMueble } from './DetallesMueble'; // Importar como exportación nombrada

function StockActualModal({ show, handleClose }) {
  const [stock, setStock] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showEditarMueble, setShowEditarMueble] = useState(false);
  const [muebleSeleccionado, setMuebleSeleccionado] = useState(null);
  const [showDetallesMueble, setShowDetallesMueble] = useState(false);

  useEffect(() => {
    if (show) {
      fetchStock();
    }
  }, [show]);

  const fetchStock = async () => {
    try {
      const response = await api.get('/muebles/stock/actual');
      setStock(response.data);
    } catch (error) {
      console.error('Error al obtener el stock actual:', error);
    }
  };

  const handleSort = () => {
    const sortedStock = [...stock].sort((a, b) =>
      sortOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock
    );
    setStock(sortedStock);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleEditarClick = (mueble) => {
    setMuebleSeleccionado(mueble);
    setShowEditarMueble(true);
  };

  const handleDetallesClick = (mueble) => {
    setMuebleSeleccionado(mueble);
    setShowDetallesMueble(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Stock Actual', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['Mueble', 'Stock']],
      body: stock.map((mueble) => [mueble.nombre, mueble.stock]),
      theme: 'grid',
      headStyles: { fillColor: [52, 58, 64] },
      styles: { cellPadding: 3, fontSize: 10 },
    });
    doc.save('reporte_stock_actual.pdf');
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Reporte de Stock Actual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" className="mb-3" onClick={handleSort}>
            Stock ({sortOrder === 'asc' ? 'Ascendente' : 'Descendente'})
          </Button>
          <Table striped bordered hover style={{ borderColor: '#343a40' }}>
            <thead>
              <tr>
                <th style={{ borderColor: '#343a40' }}>Mueble</th>
                <th style={{ borderColor: '#343a40' }}>Stock</th>
                <th style={{ borderColor: '#343a40' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((mueble) => (
                <tr key={mueble.id}>
                  <td style={{ borderColor: '#343a40' }}>{mueble.nombre}</td>
                  <td style={{ borderColor: '#343a40' }}>{mueble.stock}</td>
                  <td style={{ borderColor: '#343a40' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDetallesClick(mueble)}
                    >
                      Detalles
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleEditarClick(mueble)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={generatePDF}>
            Generar PDF
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <EditarMueble
        show={showEditarMueble}
        handleClose={() => setShowEditarMueble(false)}
        mueble={muebleSeleccionado}
        onMuebleUpdated={fetchStock}
      />
      <DetallesMueble
        show={showDetallesMueble}
        handleClose={() => setShowDetallesMueble(false)}
        mueble={muebleSeleccionado}
      />
    </>
  );
}

export default StockActualModal;
