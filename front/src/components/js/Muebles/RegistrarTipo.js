import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import '../../css/Modal.css';

function RegistrarTipo({ show, handleClose, handleCreateCategory }) {
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
      // Llamar a la API para Registrar la nueva categoría
      const response = await api.post('/Tipos', { nombre: categoryName });

      // Agregar la nueva categoría al estado de ListarMuebles
      handleCreateCategory(response.data);

      // Cerrar el modal
      handleClose();
    } catch (error) {
      console.error('Error al Registrar la categoría:', error);
      alert('No se pudo Registrar la categoría. Intenta nuevamente.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nuevo Tipo de Mueble</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del tipo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del tipo"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Registrar Tipo de Mueble
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegistrarTipo;
