import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import api from '../../../services/api';

const ConfirmarVenta = ({ show, handleClose, handleConfirm, cliente, precioTotal = 0, idCliente, fecha,  ventasMuebles }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        taxId: ''
    });
    const [mensajeExito, setMensajeExito] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentProcessed, setPaymentProcessed] = useState(false); // Estado para saber si el pago fue procesado
    const [paidAmount, setPaidAmount] = useState(0);
    const [change, setChange] = useState(0);

    useEffect(() => {
        if (show && cliente) {
            setBillingInfo({
                name: cliente.nombreCompleto || '',
                address: cliente.direccion || '',
                taxId: cliente.cuit || ''
            });
            setPaymentProcessed(false); // Reiniciar el estado al abrir el modal
        }
    }, [show, cliente]);

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
        setErrorMessage({}); // Limpiar errores al cambiar el método de pago
    };

    const handlePaidAmountChange = (e) => {
        const amount = parseFloat(e.target.value) || 0;
        setPaidAmount(amount);
        if (amount > precioTotal) {
            setChange(amount - precioTotal);
        } else {
            setChange(0); // Asegurar que el vuelto sea 0 si no se supera el monto precioTotal
        }
    }

    const handlePaidAmountKeyDown = (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            setPaidAmount(precioTotal);
            setChange(0);
        }
    }

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
        if ((paymentMethod === 'Crédito' || paymentMethod === 'Débito') && !paymentProcessed) {
            newErrors.paymentProcessed = 'Debe procesar el pago en la máquina de cobros de Mercado Pago antes de confirmar.';
        }
        if (paymentMethod === 'Efectivo' && paidAmount < precioTotal) {
            newErrors.paidAmount = 'El monto pagado debe ser mayor o igual al total.';
        }
        setErrorMessage(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const verificarPago = async (paymentId) => {
        try {
            const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer YOUR_ACCESS_TOKEN`
                }
            });

            const payment = response.data;

            if (payment.status === 'approved') {
                return true; // Pago aprobado
            } else if (payment.status === 'pending') {
                return false; // Pago pendiente
            } else {
                return false; // Pago fallido o rechazado
            }
        } catch (error) {
            console.error('Error al verificar el pago', error);
            return false;
        }
    };

    const handlePaymentProcessedChange = async (e) => {
        const { checked } = e.target;
        setPaymentProcessed(checked);

        if (checked) {
            const paymentId = "el_id_del_pago"; // Este ID debe ser proporcionado por la transacción de Mercado Pago
            const isPaymentSuccessful = await verificarPago(paymentId);

            if (isPaymentSuccessful) {
                alert('El pago fue procesado correctamente.');
            } else {
                alert('No se pudo verificar el pago.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const nuevaVenta = {
            idCliente,
            fecha,
            precioTotal,
            ventasMuebles,
            metodoPago: paymentMethod,
        };

        console.log('Nueva Venta:', nuevaVenta); // Agregar este log

        try {
            const response = await api.post('/ventas', nuevaVenta, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
      
            setMensajeExito('Venta registrada con éxito');
            setTimeout(() => {
              setMensajeExito('');
            }, 3000);
            setTimeout(() => {
                handleClose();
                // Cerrar el modal de RegistrarVenta solo cuando se realiza la venta
                document.querySelector('.registrar-venta-modal .btn-close').click();
            }, 0);
          } catch (error) {
            console.error('Error al registrar la venta:', error);
            setErrorMessage(error.response?.data || 'Error al registrar la venta');
            setTimeout(() => {
              setErrorMessage('');
            }, 3000);
          }
    };

    const handleModalClose = () => {
        setPaymentMethod('');
        setBillingInfo({
            name: '',
            address: '',
            taxId: ''
        });
        setMensajeExito('');
        setPaidAmount(0);
        setErrorMessage({});
        setPaymentProcessed(false);
        handleClose();
    };

    return (
        <Modal 
            show={show} 
            onHide={handleModalClose} 
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
                            <option value="Crédito">Tarjeta de Crédito</option>
                            <option value="Débito">Tarjeta de Débito</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia Bancaria</option>
                        </Form.Control>
                        {errorMessage.paymentMethod && <div className="text-danger">{errorMessage.paymentMethod}</div>}
                    </Form.Group>

                    {paymentMethod === 'Efectivo' && (
                        <>
                            <Form.Group controlId="paidAmount" className="mt-3">
                                <Form.Label>
                                    <strong>Monto Pagado</strong> (presione tab para autocompletar con el total)
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={paidAmount === 0 ? '' : paidAmount}
                                    onChange={handlePaidAmountChange}
                                    onKeyDown={handlePaidAmountKeyDown} // Añadir el evento onKeyDown
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
                        </>
                    )}

                    {(paymentMethod === 'Crédito' || paymentMethod === 'Débito') && (
                        <Alert variant="info" className="mt-3">
                            <strong>Procesar el pago en la maquinita de Mercado Pago.</strong> Una vez realizado, marque como procesado.
                        </Alert>
                    )}

                    {(paymentMethod === 'Crédito' || paymentMethod === 'Débito') && (
                        <Form.Group controlId="paymentProcessed" className="mt-3">
                            <Form.Check 
                                type="checkbox" 
                                label="El pago fue procesado correctamente en la maquinita."
                                checked={paymentProcessed}
                                onChange={handlePaymentProcessedChange}
                                style={{ borderColor: '#343a40' }}
                            />
                            {errorMessage.paymentProcessed && <div className="text-danger">{errorMessage.paymentProcessed}</div>}
                        </Form.Group>
                    )}

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
                    <Form.Group controlId="billingName" className="mt-3">
                        <Form.Label><strong>Nombre del Cliente</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={billingInfo.name}
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
                            readOnly={cliente && cliente.direccion}
                            style={{ borderColor: '#343a40', backgroundColor: cliente && cliente.direccion ? '#e9ecef' : 'white' }}
                        />
                        {errorMessage.address && <div className="text-danger">{errorMessage.address}</div>}
                    </Form.Group>
                    <Form.Group controlId="billingTaxId" className="mt-3">
                        <Form.Label><strong>CUIT</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="taxId"
                            value={billingInfo.taxId}
                            readOnly={cliente && cliente.cuit}
                            style={{ borderColor: '#343a40', backgroundColor: cliente && cliente.cuit ? '#e9ecef' : 'white' }}
                        />
                        {errorMessage.taxId && <div className="text-danger">{errorMessage.taxId}</div>}
                    </Form.Group>
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
