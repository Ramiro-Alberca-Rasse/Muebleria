import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

function MuebleForm({ muebleData, onSuccess }) {
  const [nombre, setNombre] = useState(muebleData?.nombre || '');
  const [tipoMadera, setTipoMadera] = useState(muebleData?.tipoMadera || '');
  const [fabricante, setFabricante] = useState(muebleData?.fabricante || '');
  const [precio, setPrecio] = useState(muebleData?.precio || '');
  const [stock, setStock] = useState(muebleData?.stock || 0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mueble = { nombre, tipoMadera, fabricante, precio, stock };

    try {
      if (muebleData) {
        await api.put(`/muebles/${muebleData.id}`, mueble);
      } else {
        await api.post('/muebles', mueble);
      }
      onSuccess();
      navigate('/');
    } catch (error) {
      console.error('Error al guardar el mueble:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>{muebleData ? 'Editar Mueble' : 'Agregar Mueble'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del mueble"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="tipoMadera" className="mt-3">
          <Form.Label>Tipo de Madera</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tipo de madera"
            value={tipoMadera}
            onChange={(e) => setTipoMadera(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="fabricante" className="mt-3">
          <Form.Label>Fabricante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Fabricante del mueble"
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="precio" className="mt-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group controlId="stock" className="mt-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Cantidad en stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </Container>
  );
}

export default MuebleForm;
