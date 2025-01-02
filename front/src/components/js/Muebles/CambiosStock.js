import React, { useState, useEffect } from 'react';
import { Modal, Table, Form, Button } from 'react-bootstrap';
import api from '../../../services/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CambiosStock = ({ show, handleClose }) => {
    const [cambios, setCambios] = useState([]);
    const [muebles, setMuebles] = useState([]);
    const [selectedMueble, setSelectedMueble] = useState('');
    const [muebleBusqueda, setMuebleBusqueda] = useState(''); // Estado para el término de búsqueda

    useEffect(() => {
        if (show) {
            // Obtener la lista de muebles
            api.get('/muebles')
                .then(response => setMuebles(response.data))
                .catch(error => console.error('Error fetching muebles:', error));
        }
    }, [show]);

    const handleMuebleChange = (muebleId) => {
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

    const handleModalCloseAndReset = () => {
        setSelectedMueble('');
        setMuebleBusqueda('');
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

    const mueblesFiltrados = muebleBusqueda.length > 0 
        ? muebles.filter((mueble) =>
            mueble.nombre.toLowerCase().startsWith(muebleBusqueda.toLowerCase())
        )
        : muebles;

    return (
        <>
            <Modal show={show} onHide={handleModalCloseAndReset} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Cambios de Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="muebleSelect" className="mb-4">
                        <Form.Label><strong>Mueble</strong></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Buscar mueble"
                            value={muebleBusqueda}
                            onChange={(e) => {
                                setMuebleBusqueda(e.target.value);
                                setSelectedMueble('');
                                if (e.target.value === '') {
                                    setSelectedMueble('');
                                    setCambios([]);
                                }
                            }}
                            style={{ borderColor: '#343a40' }}
                        />
                        {!selectedMueble && (
                            <div
                                style={{
                                    maxHeight: '150px',
                                    overflowY: 'auto',
                                    border: '1px solid #343a40',
                                    marginTop: '5px',
                                }}
                            >
                                {mueblesFiltrados.map((mueble) => (
                                    <div
                                        key={mueble.id}
                                        onClick={() => {
                                            handleMuebleChange(mueble.id);
                                            setMuebleBusqueda(mueble.nombre);
                                            setSelectedMueble(mueble.id);
                                        }}
                                        style={{
                                            padding: '5px',
                                            cursor: 'pointer',
                                            backgroundColor: selectedMueble === mueble.id ? '#f0f0f0' : 'white',
                                        }}
                                    >
                                        {mueble.nombre}
                                    </div>
                                ))}
                                {mueblesFiltrados.length === 0 && (
                                    <div style={{ padding: '5px', color: '#888' }}>No hay coincidencias</div>
                                )}
                            </div>
                        )}
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
                    <Button variant="secondary" onClick={handleModalCloseAndReset} style={{ float: 'right' }}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CambiosStock;