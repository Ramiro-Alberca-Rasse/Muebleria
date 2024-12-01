import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../../services/api';

function CrearCategoria({ show, handleClose, handleCreateCategory }) {
  const [categoryName, setCategoryName] = useState('');

  // Reseteamos el formulario al cerrar el modal
  useEffect(() => {
    if (!show) {
      setCategoryName(''); // Resetea el valor del formulario
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert('Por favor, ingresa el nombre de la categoría.');
      return;
    }

    try {
      // Llamar a la API para crear la nueva categoría
      const response = await api.post('/categorias', { nombre: categoryName });

      // Agregar la nueva categoría al estado de ListarMuebles
      handleCreateCategory(response.data);

      // Cerrar el modal
      handleClose();
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      alert('No se pudo crear la categoría. Intenta nuevamente.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nueva Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la categoría"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Crear
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CrearCategoria;
