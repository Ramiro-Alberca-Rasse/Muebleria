import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Spinner } from 'react-bootstrap';
import api from '../../../services/api';
import '../../css/AgregarStock.css'; // Asegúrate de que este archivo CSS esté importado

function AgregarStockModal({ show, handleClose, fetchMuebles }) {
    const [muebles, setMuebles] = useState([]);
    const [cantidad, setCantidad] = useState(0);
    const [selectedMuebleId, setSelectedMuebleId] = useState('');
    const [loading, setLoading] = useState(false);  // Para manejar el estado de carga

    useEffect(() => {
        if (show) {
            setLoading(true);  // Inicia la carga
            fetchMuebles().then((data) => {
                setMuebles(data);
                setLoading(false);  // Finaliza la carga
            }).catch((error) => {
                console.error('Error al obtener los muebles:', error);
                setLoading(false);  // Finaliza la carga en caso de error
            });
        }
    }, [show, fetchMuebles]);

    const agregarStock = async () => {
        if (!selectedMuebleId || cantidad <= 0) {
            alert("Por favor, selecciona un mueble y especifica una cantidad válida.");
            return;
        }

        try {
            setLoading(true); // Inicia la carga al hacer clic en el botón
            await api.post('/stock/agregar', {
                muebleId: selectedMuebleId,
                cantidad: cantidad,
            });
            alert('Stock actualizado');
            handleClose(); // Cierra el modal
        } catch (error) {
            console.error('Error al actualizar el stock:', error);
            alert('Ocurrió un error al actualizar el stock. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false); // Finaliza la carga
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Actualizar Stock de Mueble</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '500px' }}> {/* Aumentamos la altura del modal */}
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formMueble">
                            <Form.Label>Selecciona un Mueble</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={selectedMuebleId}
                                onChange={(e) => setSelectedMuebleId(e.target.value)}
                                required
                                disabled={loading} // Deshabilitar mientras se carga
                            >
                                <option value="">Selecciona un mueble</option>
                                {loading ? (
                                    <option> Cargando muebles... </option>  // Opcional, si se desea indicar la carga
                                ) : (
                                    muebles.map(mueble => (
                                        <option key={mueble.id} value={mueble.id}>
                                            {mueble.nombre}
                                        </option>
                                    ))
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formCantidad">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Cantidad a agregar"
                                value={cantidad}
                                onChange={(e) => setCantidad(parseInt(e.target.value))}
                                required
                                disabled={loading} // Deshabilitar mientras se carga
                            />
                        </Form.Group>
                    </Row>

                    <Button 
                        className="update-stock-btn"  // Usamos la clase personalizada
                        onClick={agregarStock}
                        disabled={loading} // Deshabilitar el botón mientras se carga
                    >
                        {loading ? (
                            <Spinner animation="border" size="sm" />  // Spinner mientras carga
                        ) : (
                            'Actualizar Stock'
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AgregarStockModal;
