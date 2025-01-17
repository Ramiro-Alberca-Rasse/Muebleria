import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap'; // Importar Alert
import api from '../../../services/api';  // Importa el servicio de la API

function RegistrarSubVenta({ show, handleClose, agregarVentaParcial, ventasParciales }) { // Añadir ventasParciales como prop
  const [muebles, setMuebles] = useState([]);  // Estado para almacenar los muebles
  const [selectedMueble, setSelectedMueble] = useState('');  // Mueble seleccionado
  const [cantidad, setCantidad] = useState('');  // Cantidad vacía por defecto
  const [subtotal, setSubtotal] = useState(0);  // Subtotal calculado
  const [muebleBusqueda, setMuebleBusqueda] = useState(''); // Estado para el término de búsqueda
  const [error, setError] = useState(''); // Estado para el mensaje de error

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
      setMuebleBusqueda('');  // Limpiar el término de búsqueda
      setError('');  // Restablecer el mensaje de error
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

  const mueblesFiltrados = muebles.filter((mueble) =>
    mueble.nombre.toLowerCase().startsWith(muebleBusqueda.toLowerCase())
  );

  // Maneja la adición de la subventa
  const handleAddSubventa = () => {
    const muebleSeleccionado = muebles.find((mueble) => mueble.id === Number(selectedMueble));
    const cantidadNumero = cantidad ? Number(cantidad) : 0;

    if (muebleSeleccionado && cantidadNumero > 0) {
      if (ventasParciales && ventasParciales.some((venta) => venta.mueble.id === muebleSeleccionado.id)) {
        console.log('El mueble ya está en la venta.');
        setError('El mueble ya está en la venta.');
      } else {
        agregarVentaParcial(muebleSeleccionado, cantidadNumero, subtotal);
        handleClose();  // Cierra el modal después de agregar la subventa
      }
    } else {
      setError('Debe seleccionar un mueble y una cantidad válida.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} style={{ marginTop: '140px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Subventa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="Mueble">
            <Form.Label><strong>Mueble</strong></Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar mueble"
              value={muebleBusqueda}
              onChange={(e) => {
                setMuebleBusqueda(e.target.value);
                setSelectedMueble('');
                setError('');  // Restablecer el mensaje de error al cambiar el mueble
                if (e.target.value === '') {
                    setSelectedMueble('');
                }
              }}
              style={{ borderColor: '#343a40' }}
            />
            {!selectedMueble && (
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
                      setSelectedMueble(mueble.id);
                      setMuebleBusqueda(mueble.nombre + " " + "- Stock: " + mueble.stock);
                    }}
                    style={{
                      padding: '5px',
                      cursor: 'pointer',
                      backgroundColor: selectedMueble === mueble.id ? '#f0f0f0' : 'white',
                    }}
                  >
                    {mueble.nombre} - Stock: {mueble.stock}
                  </div>
                ))}
                {mueblesFiltrados.length === 0 && (
                  <div style={{ padding: '5px', color: '#888' }}>No hay coincidencias</div>
                )}
              </div>
            )}
          </Form.Group>

          <Row>
            <Col xs={6}>
              <Form.Group controlId="Cantidad" className="mt-3">
                <Form.Label><strong>Cantidad</strong></Form.Label>
                <Form.Control
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)} // Guardamos el valor como cadena
                    onBlur={() => {
                    const muebleSeleccionado = muebles.find((mueble) => mueble.id === Number(selectedMueble));
                    if (muebleSeleccionado && Number(cantidad) > muebleSeleccionado.stock) {
                      setError('La cantidad no puede ser mayor al stock disponible.');
                      setCantidad('');
                    } else {
                      setError('');
                    }
                    }}
                  min="1"
                  placeholder="Ingresar cantidad"  // Aquí agregamos el texto de fondo
                  required
                  style={{ borderColor: '#343a40' }}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="Subtotal" className="mt-3">
                <Form.Label><strong>Subtotal</strong></Form.Label>
                <Form.Control type="number" value={subtotal} readOnly disabled style={{ borderColor: '#343a40' }} />
              </Form.Group>
            </Col>
          </Row>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>} {/* Mostrar mensaje de error */}
          <Button variant="success" onClick={handleAddSubventa} className="mt-3 w-100">
            Agregar Subventa
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegistrarSubVenta;
