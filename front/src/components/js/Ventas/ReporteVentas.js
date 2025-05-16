import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Form, Row, Col, Toast, ToastContainer, Alert } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import api from '../../../services/api';
import DetallesVenta from './DetallesVenta';
import jsPDF from 'jspdf';

function ListarVentas({ show, handleClose }) {
  const [ventas, setVentas] = useState([]);
  const [showDetalles, setShowDetalles] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]
  );
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(0); // Por defecto, todos los clientes
  const [muebleSeleccionado, setMuebleSeleccionado] = useState(0); // Por defecto, todos los muebles

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const params = {
          idCliente: clienteSeleccionado,
          idMueble: muebleSeleccionado,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        };
        console.log('Parámetros enviados:', params);
        const response = await api.get('/ventas', { params });
        setVentas(response.data);
      } catch (error) {
        console.error('Error al cargar las ventas:', error);
      }
    };

    if (show) {
      fetchVentas();
    }
  }, [show, fechaInicio, fechaFin, clienteSeleccionado, muebleSeleccionado]);

  const handleShowDetalles = (venta) => {
    setVentaSeleccionada(venta);
    setShowDetalles(true);
  };

  const handleCloseDetalles = () => {
    setShowDetalles(false);
    setVentaSeleccionada(null);
  };

  const handleCloseAndReset = () => {
    setFechaInicio(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]);
    setFechaFin(new Date().toISOString().split('T')[0]);
    handleClose();
  };

  const handleClienteSeleccionado = (clienteId) => {
    setClienteSeleccionado(clienteId);
  };

  const handleMuebleSeleccionado = (muebleId) => {
    setMuebleSeleccionado(muebleId);
  };

  const styles = {
    filterRow: { marginBottom: '20px' },
    formControlCustom: {
      border: '2px solid #343a40',
      borderRadius: '5px',
      padding: '8px',
      fontSize: '1rem',
      transition: 'box-shadow 0.3s ease',
    },
    formControlFocus: {
      borderColor: '#007bff',
      boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
    },
    formLabelCustom: { fontWeight: 'bold', color: '#343a40' },
    tableCustom: { border: '2px solid #343a40' },
    tableCell: { borderColor: '#343a40' },
    tableRowHover: { backgroundColor: '#f8f9fa' },
  };

  const ElementoNoOscurecido = ({ children }) => {
    return createPortal(children, document.body);
  };

  const calcularTotalesPorMetodoPago = () => {
    const totales = { efectivo: 0, crédito: 0, debito: 0, transferencia: 0, QR: 0 };
    ventas.forEach((venta) => {
      switch (venta.metodoPago.toLowerCase()) {
        case 'efectivo':
          totales.efectivo += venta.precioTotal;
          break;
        case 'crédito':
          totales.crédito += venta.precioTotal;
          break;
        case 'debito':
          totales.debito += venta.precioTotal;
          break;
        case 'transferencia':
          totales.transferencia += venta.precioTotal;
          break;
        case 'qr':
          totales.qr += venta.precioTotal;
          break;
        default:
          break;
      }
    });
    return totales;
  };

  const calcularTotalesPorMueble = () => {
    const totales = {};
    ventas.forEach((venta) => {
      venta.ventasMuebles.forEach((subventa) => {
        const nombreMueble = subventa.nombreMueble || 'Sin nombre';
        if (!totales[nombreMueble]) {
          totales[nombreMueble] = 0;
        }
        totales[nombreMueble] += subventa.cantidad || 1; // Asume cantidad 1 si no está definida
      });
    });
    return totales;
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reporte de Ventas', 10, 10);
  
    let y = 20;
  
    // Dibujar encabezados de la tabla con bordes y dividir columnas
    doc.setFontSize(12);
    doc.rect(10, y - 5, 190, 10); // Borde del encabezado
    doc.line(50, y - 5, 50, y + 5); // Línea entre Cliente y Fecha
    doc.line(90, y - 5, 90, y + 5); // Línea entre Fecha y Total
    doc.line(120, y - 5, 120, y + 5); // Línea entre Total y Método de Pago
    doc.line(160, y - 5, 160, y + 5); // Línea entre Método de Pago y Muebles Vendidos
    doc.text('Cliente', 12, y);
    doc.text('Fecha', 52, y);
    doc.text('Total', 92, y);
    doc.text('Método de Pago', 122, y);
    doc.text('Muebles Vendidos', 162, y);
    y += 10;
  
    // Dibujar contenido de la tabla con bordes y dividir columnas
    ventas.forEach((venta) => {
      doc.rect(10, y - 5, 190, 10); // Borde de la fila
      doc.line(50, y - 5, 50, y + 5); // Línea entre Cliente y Fecha
      doc.line(90, y - 5, 90, y + 5); // Línea entre Fecha y Total
      doc.line(120, y - 5, 120, y + 5); // Línea entre Total y Método de Pago
      doc.line(160, y - 5, 160, y + 5); // Línea entre Método de Pago y Muebles Vendidos
  
      doc.text(doc.splitTextToSize(`${venta.nombreCliente} ${venta.apellidoCliente}`, 38), 12, y);
      doc.text(doc.splitTextToSize(new Date(venta.fecha).toLocaleDateString(), 38), 52, y);
      doc.text(doc.splitTextToSize(`$${venta.precioTotal}`, 28), 92, y);
      doc.text(doc.splitTextToSize(venta.metodoPago, 38), 122, y);
      const muebles = venta.ventasMuebles.map((subventa) => subventa.nombreMueble || 'Sin nombre').join(', ');
      doc.text(doc.splitTextToSize(muebles, 30), 162, y);
      y += 10;
    });
  
    // Totales por método de pago y totales por mueble en columnas
    y += 10;
    doc.setFontSize(14);
    doc.text('Totales por Método de Pago:', 10, y);
    doc.text('Totales por Mueble:', 110, y);
    y += 6;
  
    const totalesMetodoPago = calcularTotalesPorMetodoPago();
    const totalesMueble = calcularTotalesPorMueble();
  
    const maxRows = Math.max(
      Object.entries(totalesMetodoPago).filter(([_, total]) => total > 0).length,
      Object.entries(totalesMueble).length
    );
  
    let metodoPagoY = y;
    let muebleY = y;
  
    Object.entries(totalesMetodoPago)
      .filter(([_, total]) => total > 0)
      .forEach(([metodo, total]) => {
        doc.text(`${metodo.charAt(0).toUpperCase() + metodo.slice(1)}: $${total.toFixed(2)}`, 10, metodoPagoY);
        metodoPagoY += 6;
      });
  
    Object.entries(totalesMueble).forEach(([mueble, total]) => {
      doc.text(`${mueble}: ${total} vendidos`, 110, muebleY);
      muebleY += 6;
    });
  
    doc.save('ReporteVentas.pdf');
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseAndReset} size="lg">
        <Modal.Header closeButton className="justify-content-center">
          <Modal.Title className="text-center w-100">Reporte de Ventas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="justify-content-center" style={styles.filterRow}>
              <Col md={6}>
                <Form.Group controlId="fechaInicio">
                  <Form.Label style={styles.formLabelCustom}>Fecha Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    style={styles.formControlCustom}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fechaFin">
                  <Form.Label style={styles.formLabelCustom}>Fecha Fin</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    style={styles.formControlCustom}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Los filtros de cliente y mueble están ocultos */}
            <Form.Control
              type="hidden"
              value={clienteSeleccionado}
              onChange={(e) => setClienteSeleccionado(Number(e.target.value))}
            />
            <Form.Control
              type="hidden"
              value={muebleSeleccionado}
              onChange={(e) => setMuebleSeleccionado(Number(e.target.value))}
            />
          </Form>
          <Table striped bordered hover style={styles.tableCustom}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Método de Pago</th>
                <th>Muebles Vendidos</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.id} style={styles.tableRowHover}>
                  <td>{venta.nombreCliente + ' ' + venta.apellidoCliente}</td>
                  <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                  <td>{venta.precioTotal}</td>
                  <td>{venta.metodoPago}</td>
                  <td>
  {venta.ventasMuebles.map((subventa, index) => (
    <span key={index}>
      {subventa.nombreMueble || 'Sin nombre'}
      <br />
    </span>
  ))}
</td>

                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-start mt-3">
  <div className="totales-metodo-pago me-5">
    <h5>Totales por Método de Pago:</h5>
    {Object.entries(calcularTotalesPorMetodoPago())
      .filter(([_, total]) => total > 0) // Filtrar métodos de pago con ventas
      .map(([metodo, total]) => (
        <p key={metodo} style={{ fontWeight: 'bold' }}>
          {metodo.charAt(0).toUpperCase() + metodo.slice(1)}: ${total.toFixed(2)}
        </p>
      ))}
  </div>
  <div className="totales-mueble">
    <h5>Totales por Mueble:</h5>
    {Object.entries(calcularTotalesPorMueble()).map(([mueble, total]) => (
      <p key={mueble} style={{ fontWeight: 'bold' }}>
        {mueble}: {total} vendidos
      </p>
    ))}
  </div>
</div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={generarPDF}>
            Generar PDF
          </Button>
          <Button variant="secondary" onClick={handleCloseAndReset}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {ventaSeleccionada && (
        <DetallesVenta
          show={showDetalles}
          handleClose={handleCloseDetalles}
          venta={ventaSeleccionada}
        />
      )}

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

        {errorMessage && (
          <div className="notification-container-bottom-right">
            <Alert variant="danger" className="notification" style={{ fontSize: '1.2em' }}>
              {errorMessage}
            </Alert>
          </div>
        )}
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

export default ListarVentas;