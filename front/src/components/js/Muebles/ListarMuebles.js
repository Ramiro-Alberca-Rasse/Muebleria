import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import api from '../../../services/api'; // Asegúrate de que la API está correctamente configurada

function ListarMueblesModal({ show, handleClose }) {
  const [muebles, setMuebles] = useState([]);

  useEffect(() => {
    if (show) {
      fetchMuebles();
    }
  }, [show]);

  const fetchMuebles = async () => {
    try {
      const response = await api.get('/muebles');
      setMuebles(response.data);
    } catch (error) {
      console.error('Error al obtener los muebles:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Lista de Muebles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo de Madera</th>
              <th>Fabricante</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {muebles.length > 0 ? (
              muebles.map((mueble) => (
                <tr key={mueble.id}>
                  <td>{mueble.nombre}</td>
                  <td>{mueble.tipoMadera}</td>
                  <td>{mueble.fabricante}</td>
                  <td>${mueble.precio}</td>
                  <td>{mueble.stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay muebles disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ListarMueblesModal;
