import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../../services/api';

function AgregarStockModal({ show, handleClose }) {
    const [muebles, setMuebles] = useState([]);
    const [cantidad, setCantidad] = useState(0);
    const [selectedMuebleId, setSelectedMuebleId] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (show) {
            const obtenerMuebles = async () => {
                try {
                    const response = await api.get('/muebles/todos');
                    setMuebles(response.data);
                    setSelectedMuebleId('');
                    setCantidad('');
                    setErrorMessage('');
                } catch (error) {
                    console.error('Error al obtener los muebles:', error);
                }
            };
            obtenerMuebles();
        } else {
            setSelectedMuebleId('');
            setCantidad('');
            setErrorMessage('');
        }
    }, [show]);

    const agregarStock = async (e) => {
        e.preventDefault();
        if (!selectedMuebleId || cantidad <= 0) {
            setErrorMessage("Por favor, selecciona un mueble y especifica una cantidad válida.");
            return;
        }

        try {
            await api.put(`/muebles/stock/${selectedMuebleId}`, cantidad, {
                headers: { 'Content-Type': 'application/json' },
            });
            
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                handleClose();
            }, 3000);
        } catch (error) {
            console.error('Error al actualizar el stock:', error);
            setErrorMessage('Ocurrió un error al actualizar el stock. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={agregarStock}>
                    <Modal.Header closeButton>
                        <Modal.Title><strong>Agregar Stock</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-4">
                            <Form.Label><strong>Selecciona un Mueble</strong></Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedMuebleId}
                                onChange={(e) => setSelectedMuebleId(e.target.value)}
                                isInvalid={!!errorMessage}
                                style={{ borderColor: errorMessage ? 'darkred' : 'black' }}
                            >
                                <option value="">Selecciona un mueble</option>
                                {Array.isArray(muebles) && muebles.map((mueble) => (
                                    <option key={mueble.id} value={mueble.id}>
                                        {mueble.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errorMessage}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label><strong>Cantidad</strong></Form.Label>
                            <Form.Control
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                isInvalid={!!errorMessage}
                                placeholder="Ingrese la cantidad" // Agrega el placeholder
                                style={{ borderColor: errorMessage ? 'darkred' : 'black' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errorMessage}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* Espaciado extra entre el formulario y los botones */}
                    </Modal.Body>
                    <Modal.Footer style={{ paddingTop: '30px' }}>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" type="submit">
                            Actualizar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {showSuccess && (
                <div className="notification-container" style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
                    <Alert variant="success" className="notification">
                        Stock agregado con éxito!
                    </Alert>
                </div>
            )}
        </>
    );
}

export default AgregarStockModal;
