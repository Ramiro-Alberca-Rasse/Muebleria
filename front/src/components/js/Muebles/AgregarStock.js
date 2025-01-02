import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert, Toast, ToastContainer } from 'react-bootstrap';
import api from '../../../services/api';

function AgregarStockModal({ show, handleClose }) {
    const [muebles, setMuebles] = useState([]);
    const [cantidad, setCantidad] = useState(0);
    const [selectedMuebleId, setSelectedMuebleId] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [muebleBusqueda, setMuebleBusqueda] = useState(''); // Estado para el término de búsqueda

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

    const mueblesFiltrados = muebles.filter((mueble) =>
        mueble.nombre.toLowerCase().startsWith(muebleBusqueda.toLowerCase())
    );

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
                                type="text"
                                placeholder="Buscar mueble"
                                value={muebleBusqueda}
                                onChange={(e) => {
                                    setMuebleBusqueda(e.target.value);
                                    setSelectedMuebleId('');
                                    if (e.target.value === '') {
                                        setSelectedMuebleId('');
                                    }
                                }}
                                style={{ borderColor: '#343a40' }}
                            />
                            {!selectedMuebleId && (
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
                                                setSelectedMuebleId(mueble.id);
                                                setMuebleBusqueda(mueble.nombre);
                                            }}
                                            style={{
                                                padding: '5px',
                                                cursor: 'pointer',
                                                backgroundColor: selectedMuebleId === mueble.id ? '#f0f0f0' : 'white',
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
            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    onClose={() => setShowSuccess(false)}
                    show={showSuccess}
                    delay={3000}
                    autohide
                    bg="success"
                >
                    <Toast.Body style={{ fontSize: '1.2em' }}>Stock agregado con éxito!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default AgregarStockModal;
