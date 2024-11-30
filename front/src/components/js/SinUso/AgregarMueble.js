import React, { useState } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import api from '../../../services/api'; // Asegúrate de que esta ruta sea correcta

function AgregarMuebleModal({ show, handleClose, onMuebleAdded }) {
  const [nombre, setNombre] = useState('');
  const [tipoMadera, setTipoMadera] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoMueble = {
      nombre,
      tipoMadera,
      fabricante,
      precio: parseFloat(precio),
      stock: parseInt(stock, 10),
      categoria,
    };

    try {
      const response = await api.post('/muebles', nuevoMueble);
      if (response.status === 201) {
        onMuebleAdded(); // Notifica al padre que se agregó un mueble
        handleClose(); // Cierra el modal
      }
    } catch (error) {
      console.error('Error al agregar el mueble:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Mueble</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del mueble"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formTipoMadera">
              <Form.Label>Tipo de Madera</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el tipo de madera"
                value={tipoMadera}
                onChange={(e) => setTipoMadera(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFabricante">
              <Form.Label>Fabricante</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el fabricante"
                value={fabricante}
                onChange={(e) => setFabricante(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa el precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa el stock disponible"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la categoría del mueble"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Button variant="success" type="submit">
            Agregar Mueble
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AgregarMuebleModal;
