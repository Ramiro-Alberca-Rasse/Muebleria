import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ListarVentas from './ListarVentas';
import ListarClientes from './ListarClientes';

const Listar = ({ isOpen, onClose }) => {
    const [showVentasModal, setShowVentasModal] = useState(false);
    const [showClientesModal, setShowClientesModal] = useState(false);

    const handleOptionChange = (option) => {
        if (option === 'ventas') {
            setShowVentasModal(true);
        } else if (option === 'clientes') {
            setShowClientesModal(true);
        }
    };

    return (
        <>
            <Modal show={isOpen} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Menú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column">
                        <Button variant="primary" className="mb-2" onClick={() => handleOptionChange('ventas')}>
                            Listar Ventas
                        </Button>
                        <Button variant="primary" className="mb-2" onClick={() => handleOptionChange('clientes')}>
                            Listar Clientes
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <ListarVentas show={showVentasModal} handleClose={() => setShowVentasModal(false)} />
            <ListarClientes show={showClientesModal} handleClose={() => setShowClientesModal(false)} />
        </>
    );
};

export default Listar;