import React, { useState, useEffect } from 'react';
import { Modal, Table, Form, Button } from 'react-bootstrap';
import api from '../../../services/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CambiosStock = ({ show, handleClose }) => {
    const [cambios, setCambios] = useState([]);
    const [muebles, setMuebles] = useState([]);
    const [selectedMueble, setSelectedMueble] = useState('');

    useEffect(() => {
        if (show) {
            // Obtener la lista de muebles
            api.get('/muebles')
                .then(response => setMuebles(response.data))
                .catch(error => console.error('Error fetching muebles:', error));
        }
    }, [show]);

    const handleMuebleChange = (event) => {
        const muebleId = event.target.value;
        setSelectedMueble(muebleId);

        if (muebleId === '') {
            setCambios([]);
            return;
        }

        // Obtener los cambios de stock del mueble seleccionado
        api.get(`/cambioStock/mueble/${muebleId}`)
            .then(response => setCambios(response.data))
            .catch(error => console.error('Error fetching cambios de stock:', error));
    };

    const handleModalClose = () => {
        setSelectedMueble('');
        setCambios([]);
        handleClose();
    };

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Cambios de Stock', 14, 16);
        doc.autoTable({
            head: [['Nombre Mueble', 'Tipo de Cambio', 'Cantidad', 'Nuevo Stock']],
            body: cambios.map(cambio => [
                cambio.nombreMueble,
                cambio.tipoCambio,
                cambio.cantidad,
                cambio.nuevoStock
            ]),
            startY: 20,
            styles: { cellPadding: 2, fontSize: 10 }
        });
        doc.save('reporte_cambios_stock.pdf');
    };

    return (
        <>
            <Modal show={show} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Cambios de Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="muebleSelect" className="mb-4">
                        <Form.Label><strong>Mueble</strong></Form.Label>
                        <Form.Control 
                            as="select" 
                            value={selectedMueble} 
                            onChange={handleMuebleChange} 
                            style={{ borderColor: '#343a40' }}
                        >
                            <option value="">Seleccione un mueble</option>
                            {muebles.map(mueble => (
                                <option key={mueble.id} value={mueble.id}>{mueble.nombre}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Table striped bordered hover style={{ borderColor: '#343a40' }}>
                        <thead>
                            <tr>
                                <th style={{ borderColor: '#343a40' }}>Nombre Mueble</th>
                                <th style={{ borderColor: '#343a40' }}>Tipo de Cambio</th>
                                <th style={{ borderColor: '#343a40' }}>Cantidad</th>
                                <th style={{ borderColor: '#343a40' }}>Nuevo Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cambios.map((cambio, index) => (
                                <tr key={index}>
                                    <td style={{ borderColor: '#343a40' }}>{cambio.nombreMueble}</td>
                                    <td style={{ borderColor: '#343a40' }}>{cambio.tipoCambio}</td>
                                    <td style={{ borderColor: '#343a40' }}>{cambio.cantidad}</td>
                                    <td style={{ borderColor: '#343a40' }}>{cambio.nuevoStock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleGeneratePDF} style={{ float: 'right', marginLeft: '10px' }}>
                        Generar PDF
                    </Button>
                    <Button variant="secondary" onClick={handleModalClose} style={{ float: 'right' }}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CambiosStock;