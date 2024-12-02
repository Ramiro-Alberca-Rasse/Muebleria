import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../../../services/api'; // Importa el servicio de API para realizar solicitudes
import '../../css/Modal.css';

function RegistrarTipoDeMadera({ show, handleClose, agregarTipoMadera }) {
  const [nombreTipo, setNombreTipo] = useState(''); // Estado para el nombre del tipo de madera
  const [descripcion, setDescripcion] = useState(''); // Estado para la descripción

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombreTipo.trim() === '') {
      alert('Por favor, ingrese el nombre del tipo de madera.');
      return;
    }

    try {
      // Llama a la API para registrar el nuevo tipo de madera
      const response = await api.post('/tiposdemadera', {
        nombre: nombreTipo,
        descripcion,
      });

      // Llama a la función para agregar el nuevo tipo al estado principal
      if (response.status === 201) {
        agregarTipoMadera(response.data); // Agregar el nuevo tipo al estado principal
        handleClose(); // Cierra el modal después de agregar
        setNombreTipo(''); // Resetea los campos
        setDescripcion('');
      }
    } catch (error) {
      console.error('Error al registrar el tipo de madera:', error);
      alert('No se pudo registrar el tipo de madera. Intente nuevamente.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Tipo de Madera</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombreTipoMadera">
            <Form.Label>Nombre del Tipo de Madera</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del tipo de madera"
              value={nombreTipo}
              onChange={(e) => setNombreTipo(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Registrar Tipo de Madera
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegistrarTipoDeMadera;
