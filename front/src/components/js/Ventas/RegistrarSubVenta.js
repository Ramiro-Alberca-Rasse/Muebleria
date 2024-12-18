import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import api from '../../../services/api';  // Importa el servicio de la API

function RegistrarSubVenta({ show, handleClose, agregarVentaParcial }) {
  const [muebles, setMuebles] = useState([]);  // Estado para almacenar los muebles
  const [selectedMueble, setSelectedMueble] = useState('');  // Mueble seleccionado
  const [cantidad, setCantidad] = useState('');  // Cantidad vacía por defecto
  const [subtotal, setSubtotal] = useState(0);  // Subtotal calculado

  // Cargar los muebles desde la API cuando se abre el modal
  useEffect(() => {
    if (show) {
      api.get('/muebles')  // Llamada a la API para obtener los muebles
        .then(response => {
          setMuebles(response.data);  // Guardamos los muebles en el estado
        })
        .catch(error => {
          console.error('Error al cargar los muebles:', error);  // Manejamos el error
        });

      setSelectedMueble('');
      setCantidad('');  // Aseguramos que la cantidad esté vacía
      setSubtotal(0);  // El subtotal también debe ser 0 al inicio
    }
  }, [show]);  // Se ejecuta cada vez que el modal se abre

  // Calcula el subtotal cuando se selecciona el mueble o se cambia la cantidad
  useEffect(() => {
    const muebleSeleccionado = muebles.find((mueble) => mueble.id === Number(selectedMueble));
    const cantidadNumero = cantidad ? Number(cantidad) : 0; // Aseguramos que la cantidad sea un número

    if (muebleSeleccionado && cantidadNumero > 0) {
      setSubtotal(muebleSeleccionado.precio * cantidadNumero);
    } else {
      setSubtotal(0); // Si no hay mueble seleccionado o cantidad es 0 o inválida
    }
  }, [selectedMueble, cantidad, muebles]);

  // Maneja la adición de la subventa
  const handleAddSubventa = () => {
    const muebleSeleccionado = muebles.find((mueble) => mueble.id === Number(selectedMueble));
    const cantidadNumero = cantidad ? Number(cantidad) : 0;

    if (muebleSeleccionado && cantidadNumero > 0) {
      agregarVentaParcial(muebleSeleccionado, cantidadNumero, subtotal);
      handleClose();  // Cierra el modal después de agregar la subventa
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Subventa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="Mueble">
            <Form.Label>Mueble</Form.Label>
            <Form.Control
              as="select"
              value={selectedMueble}
              onChange={(e) => setSelectedMueble(e.target.value)}
              required
              style={{ borderColor: '#343a40' }}
            >
              <option value="">Selecciona un mueble</option>
              {muebles.map((mueble) => (
                <option key={mueble.id} value={mueble.id}>
                  {mueble.nombre} - ${mueble.precio}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Row>
            <Col xs={6}>
              <Form.Group controlId="Cantidad" className="mt-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)} // Guardamos el valor como cadena
                  min="1"
                  placeholder="Ingresar cantidad"  // Aquí agregamos el texto de fondo
                  required
                  style={{ borderColor: '#343a40' }}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="Subtotal" className="mt-3">
                <Form.Label>Subtotal</Form.Label>
                <Form.Control type="number" value={subtotal} readOnly disabled style={{ borderColor: '#343a40' }} />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="success" onClick={handleAddSubventa} className="mt-3 w-100">
            Agregar Subventa
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegistrarSubVenta;
