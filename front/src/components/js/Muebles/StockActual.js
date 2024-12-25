import React, { useState, useEffect } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import api from '../../../services/api'; // Asegúrate de que la ruta sea correcta
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import EditarMueble from './EditarMueble'; // Importar el componente EditarMueble

function StockActualModal({ show, handleClose }) {
  const [stock, setStock] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showEditarMueble, setShowEditarMueble] = useState(false);
  const [muebleSeleccionado, setMuebleSeleccionado] = useState(null);

  useEffect(() => {
    if (show) {
      fetchStock();
    }
  }, [show]);

  const fetchStock = async () => {
    try {
      const response = await api.get('/muebles/stock/actual'); // Ajusta la ruta si es necesario
      setStock(response.data);
    } catch (error) {
      console.error('Error al obtener el stock actual:', error);
    }
  };

  const handleSort = () => {
    const sortedStock = [...stock].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.stock - b.stock;
      } else {
        return b.stock - a.stock;
      }
    });
    setStock(sortedStock);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleEditarClick = (mueble) => {
    setMuebleSeleccionado(mueble);
    setShowEditarMueble(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Stock Actual', 14, 16);
    doc.autoTable({
      head: [['Mueble', 'Stock']],
      body: stock.map(mueble => [mueble.nombre, mueble.stock]),
    });
    doc.save('reporte_stock_actual.pdf');
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
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
                    <Button variant="secondary" size="sm">Detalles</Button>
                    <Button variant="primary" size="sm" className="ms-2" onClick={() => handleEditarClick(mueble)}>Editar</Button>
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
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
      <EditarMueble
        show={showEditarMueble}
        handleClose={() => setShowEditarMueble(false)}
        mueble={muebleSeleccionado}
        onMuebleUpdated={fetchStock}
      />
    </>
  );
}

export default StockActualModal;
