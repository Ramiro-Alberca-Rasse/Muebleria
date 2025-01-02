import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ConfirmarVenta = ({ show, handleClose, handleConfirm, cliente }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        taxId: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (cliente) {
            setBillingInfo({
                name: cliente.nombreCompleto || '',
                address: cliente.direccion || '',
                taxId: cliente.CUIT || ''
            });
        }
    }, [cliente]);

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({
            ...billingInfo,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!paymentMethod) {
            newErrors.paymentMethod = 'El método de pago es obligatorio';
        }
        if (!billingInfo.address) {
            newErrors.address = 'La dirección de facturación es obligatoria';
        }
        if (!billingInfo.taxId) {
            newErrors.taxId = 'El CUIT es obligatorio';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleConfirm(paymentMethod, billingInfo);
            handleClose();
        }
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            dialogClassName="custom-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Confirmar Venta</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="paymentMethod" className="mt-3">
                        <Form.Label><strong>Método de Pago</strong></Form.Label>
                        <Form.Control 
                            as="select" 
                            value={paymentMethod} 
                            onChange={handlePaymentChange}
                            style={{ borderColor: '#343a40' }}
                        >
                            <option value="">Seleccione un método de pago</option>
                            <option value="creditCard">Tarjeta de Crédito</option>
                            <option value="debitCard">Tarjeta de Débito</option>
                            <option value="cash">Efectivo</option>
                            <option value="bankTransfer">Transferencia Bancaria</option>
                        </Form.Control>
                        {errors.paymentMethod && <div className="text-danger">{errors.paymentMethod}</div>}
                    </Form.Group>
                    <Form.Group controlId="billingName" className="mt-3">
                        <Form.Label><strong>Nombre del Cliente</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={billingInfo.name}
                            onChange={handleBillingChange}
                            readOnly={cliente && cliente.nombreCompleto}
                            style={{ borderColor: '#343a40', backgroundColor: cliente && cliente.nombreCompleto ? '#e9ecef' : 'white' }}
                        />
                    </Form.Group>
                    <Form.Group controlId="billingAddress" className="mt-3">
                        <Form.Label><strong>Dirección de Facturación</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={billingInfo.address}
                            onChange={handleBillingChange}
                            readOnly={cliente && cliente.direccion}
                            style={{ borderColor: '#343a40', backgroundColor: cliente && cliente.direccion ? '#e9ecef' : 'white' }}
                        />
                        {errors.address && <div className="text-danger">{errors.address}</div>}
                    </Form.Group>
                    <Form.Group controlId="billingTaxId" className="mt-3">
                        <Form.Label><strong>CUIT</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="taxId"
                            value={billingInfo.taxId}
                            onChange={handleBillingChange}
                            readOnly={cliente && cliente.CUIT}
                            style={{ borderColor: '#343a40', backgroundColor: cliente && cliente.CUIT ? '#e9ecef' : 'white' }}
                        />
                        {errors.taxId && <div className="text-danger">{errors.taxId}</div>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

// Estilos personalizados
const styles = `
.custom-modal .modal-dialog {
    margin: 50px auto 0 10%;
    max-width: 600px;
    border: 1px solid black;
}
.custom-modal .modal-content {
    border: 1px solid black;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ConfirmarVenta;