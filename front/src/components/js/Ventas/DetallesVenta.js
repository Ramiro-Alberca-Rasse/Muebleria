import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../../../services/api';

const DetallesVenta = ({ show, handleClose, venta }) => {
    const [detallesVenta, setDetallesVenta] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetallesVenta = async () => {
            try {
                const response = await api.get(`/ventas/${venta.id}`);
                setDetallesVenta(response.data);
            } catch (error) {
                console.error('Error al cargar los detalles de la venta:', error);
                setError('Error al cargar los detalles de la venta');
            }
        };

        if (venta) {
            fetchDetallesVenta();
        }
    }, [venta]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!detallesVenta) {
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose} style={{ marginTop: '20px' }} dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Detalles de la Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <h5>Fecha:</h5>
                    <p>{new Date(detallesVenta.fecha).toLocaleDateString()}</p>
                </div>
                <div className="mb-3">
                    <h5>Cliente:</h5>
                    <p>{detallesVenta.nombreCliente + " " + detallesVenta.apellidoCliente}</p>
                </div>
                <div className="mb-3">
                    <h5>Precio Total:</h5>
                    <p>${detallesVenta.precioTotal.toFixed(2)}</p>
                </div>
                <div className="mb-3">
                    <h5>Subventas:</h5>
                    <table className="table table-striped table-bordered" style={{ borderColor: '#343a40' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th style={{ borderColor: '#343a40' }}>Mueble</th>
                                <th style={{ borderColor: '#343a40' }}>Cantidad</th>
                                <th style={{ borderColor: '#343a40' }}>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detallesVenta.ventasMuebles.map((ventaMueble, index) => (
                                <tr key={index}>
                                    <td style={{ borderColor: '#343a40' }}>{ventaMueble.nombreMueble}</td>
                                    <td style={{ borderColor: '#343a40' }}>{ventaMueble.cantidad}</td>
                                    <td style={{ borderColor: '#343a40' }}>${ventaMueble.subTotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
            <style jsx>{`
                .custom-modal .modal-content {
                    border: 2px solid black;
                }
            `}</style>
        </Modal>
    );
};

export default DetallesVenta;
