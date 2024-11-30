import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Col, Row } from 'react-bootstrap';
import api from '../../../services/api';
import '../../css/AgregarStock.css';

function AgregarStock() {
    const [muebles, setMuebles] = useState([]);
    const [cantidad, setCantidad] = useState(0);
    const [selectedMuebleId, setSelectedMuebleId] = useState('');

    useEffect(() => {
        fetchMuebles();
    }, []);

    const fetchMuebles = async () => {
        try {
            const response = await api.get('/muebles');
            setMuebles(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de muebles:', error);
        }
    };

    const agregarStock = async () => {
        try {
            await api.post('/stock/agregar', {
                muebleId: selectedMuebleId,
                cantidad: cantidad,
            });
            alert('Stock actualizado');
            fetchMuebles(); // Actualiza la lista de muebles con el stock actualizado
        } catch (error) {
            console.error('Error al actualizar el stock:', error);
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4 titulo-blanco">Administración de Stock</h2>

            <Card className="shadow-sm">
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formMueble">
                                <Form.Label>Selecciona un Mueble</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    value={selectedMuebleId}
                                    onChange={(e) => setSelectedMuebleId(e.target.value)}
                                    required
                                >
                                    <option value="">Selecciona un mueble</option>
                                    {muebles.map(mueble => (
                                        <option key={mueble.id} value={mueble.id}>
                                            {mueble.nombre}
                                        </option>
                                    ))}
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
                                />
                            </Form.Group>
                        </Row>

                        <Button 
                            variant="primary" 
                            className="w-100" 
                            onClick={agregarStock}
                        >
                            Actualizar Stock
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AgregarStock;
