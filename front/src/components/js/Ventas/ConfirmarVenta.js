import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { initMercadoPago } from '@mercadopago/sdk-react';

// Inicializar Mercado Pago
initMercadoPago('APP_USR-ab129e56-65b1-46d3-8d3f-a3568a053db0');

const ConfirmarVenta = ({ show, handleClose, handleConfirm, cliente, precioTotal = 0, idCliente, fecha, ventasMuebles }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        taxId: ''
    });
    const [mensajeExito, setMensajeExito] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [paidAmount, setPaidAmount] = useState(0);
    const [change, setChange] = useState(0);
    const [isInvoice, setIsInvoice] = useState(false);

    useEffect(() => {
        if (show && cliente) {
            setBillingInfo({
                name: cliente.nombreCompleto || '',
                address: cliente.direccion || '',
                taxId: cliente.cuit || ''
            });
            setPaymentProcessed(false);
        }
    }, [show, cliente]);

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
        setErrorMessage({});
    };

    const handlePaidAmountChange = (e) => {
        const amount = parseFloat(e.target.value) || 0;
        setPaidAmount(amount);
        setChange(amount > precioTotal ? amount - precioTotal : 0);
    };

    const handlePaidAmountKeyDown = (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            setPaidAmount(precioTotal);
            setChange(0);
        }
    };

    const handleInvoiceChange = (e) => {
        setIsInvoice(e.target.checked);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!paymentMethod) {
            newErrors.paymentMethod = 'El método de pago es obligatorio';
        }

       /*  if (isInvoice) {
            if (!billingInfo.address) {
                newErrors.address = 'La dirección de facturación es obligatoria';
            }
            if (!billingInfo.taxId) {
                newErrors.taxId = 'El CUIT es obligatorio';
            }
        }

        if ((paymentMethod === 'Crédito' || paymentMethod === 'Débito') && !paymentProcessed) {
            newErrors.paymentProcessed = 'Debe procesar el pago en la máquina de cobros de Mercado Pago antes de confirmar.';
        }

        if (paymentMethod === 'Efectivo' && paidAmount < precioTotal) {
            newErrors.paidAmount = 'El monto pagado debe ser mayor o igual al total.';
        } */

        setErrorMessage(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const nuevaVenta = {
            idCliente,
            fecha,
            precioTotal,
            ventasMuebles,
            metodoPago: paymentMethod,
        };

        try {
            const response = await api.post('/ventas', nuevaVenta, {
                headers: { 'Content-Type': 'application/json' },
            });

            setMensajeExito('Venta registrada con éxito');
            setTimeout(() => setMensajeExito(''), 3000);

            setTimeout(() => {
                handleClose();
                const closeBtn = document.querySelector('.registrar-venta-modal .btn-close');
                if (closeBtn) closeBtn.click();
            }, 0);
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            setErrorMessage({ general: error.response?.data || 'Error al registrar la venta' });
            setTimeout(() => setErrorMessage({}), 3000);
        }
    };

    const handleModalClose = () => {
        setPaymentMethod('');
        setBillingInfo({ name: '', address: '', taxId: '' });
        setMensajeExito('');
        setPaidAmount(0);
        setChange(0);
        setErrorMessage({});
        setPaymentProcessed(false);
        setIsInvoice(false);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleModalClose} dialogClassName="custom-modal">
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
                            <option value="Crédito">Tarjeta de Crédito</option>
                            <option value="Débito">Tarjeta de Débito</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia</option>
                            <option value="QR">QR</option>
                        </Form.Control>
                        {errorMessage.paymentMethod && <div className="text-danger">{errorMessage.paymentMethod}</div>}
                    </Form.Group>

                    {/* {paymentMethod === 'Efectivo' && (
                        <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
                            <Form.Group controlId="paidAmount" className="mt-3">
                                <Form.Label>
                                    <strong>Monto Pagado</strong> (presione tab para autocompletar con el total)
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={paidAmount === 0 ? '' : paidAmount}
                                    onChange={handlePaidAmountChange}
                                    onKeyDown={handlePaidAmountKeyDown}
                                    placeholder={precioTotal}
                                    style={{ borderColor: '#343a40' }}
                                />
                                {errorMessage.paidAmount && <div className="text-danger">{errorMessage.paidAmount}</div>}
                            </Form.Group>

                            <Form.Group controlId="change" className="mt-3">
                                <Form.Label><strong>Vuelto</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={change}
                                    readOnly
                                    style={{ borderColor: '#343a40', backgroundColor: '#e9ecef' }}
                                />
                            </Form.Group>
                        </div>
                    )} */}

                    <Form.Group controlId="Total" className="mt-3">
                        <Form.Label><strong>Total a pagar</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="precioTotal"
                            value={precioTotal}
                            readOnly
                            style={{ borderColor: '#343a40', backgroundColor: '#e9ecef' }}
                        />
                    </Form.Group>

                    {errorMessage.general && (
                        <div className="text-danger mt-3">
                            {errorMessage.general}
                        </div>
                    )}

                    {mensajeExito && (
                        <div className="text-success mt-3">
                            {mensajeExito}
                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmarVenta;
