import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import api from '../../../services/api';
import RegistrarTipo from './RegistrarTipo';

function ListarMuebles({ show, handleClose }) {
  const [muebles, setMuebles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [filteredMuebles, setFilteredMuebles] = useState([]);
  const [Tipos, setTipos] = useState([]);
  const [showRegistrarTipo, setShowRegistrarTipo] = useState(false);

  // Resetear los formularios cuando el modal se cierra
  useEffect(() => {
    if (!show) {
      setSearchTerm('');
      setSelectedTipo('');
      setFilteredMuebles(muebles);  // Resetear la lista filtrada a la original
    }
  }, [show, muebles]);

  useEffect(() => {
    if (show) {
      fetchMuebles();
    }
  }, [show]);

  const fetchMuebles = async () => {
    try {
      const response = await api.get('/muebles');
      setMuebles(response.data);
      setFilteredMuebles(response.data);

      const uniqueCategories = [
        ...new Set(response.data.map((mueble) => mueble.Tipo)),
      ];
      setTipos(uniqueCategories);
    } catch (error) {
      console.error('Error al obtener los muebles:', error);
    }
  };

  const handleSearch = () => {
    let filtered = muebles;

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((mueble) =>
        mueble.nombre.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }

    if (selectedTipo !== '') {
      filtered = filtered.filter((mueble) =>
        mueble.Tipo.toLowerCase().includes(selectedTipo.toLowerCase())
      );
    }

    setFilteredMuebles(filtered);
  };

  const eliminarMueble = async (id) => {
    try {
      await api.delete(`/muebles/eliminar/${id}`);
      const updatedMuebles = muebles.filter((mueble) => mueble.id !== id);
      setMuebles(updatedMuebles);
      setFilteredMuebles(updatedMuebles);
    } catch (error) {
      console.error('Error al eliminar el mueble:', error);
      alert('No se pudo eliminar el mueble. Intenta nuevamente.');
    }
  };

  const handleCreateTipo = (newTipo) => {
    setTipos((prevTipos) => [...prevTipos, newTipo.nombre]);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Lista de Muebles</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group controlId="Tipo">
          <Form.Label className="fw-bold">Tipo</Form.Label> {/* Agregar la clase fw-bold para negrita */}
          <Form.Control
            as="select"
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)}
            onBlur={handleSearch}
          >
          <option value="">Todos los tipos</option>
          {Tipos.map((Tipo, index) => (
            <option key={index} value={Tipo}>
            {Tipo}
            </option>
          ))}
          </Form.Control>
        </Form.Group>

          <div className="d-flex mb-2" style={{ alignItems: 'flex-start' }}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
              style={{ flex: '1' }}
            />
            <Button variant="primary" onClick={handleSearch}>
              Buscar
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo de Madera</th>
                <th>Fabricante</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMuebles.length > 0 ? (
                filteredMuebles.map((mueble) => (
                  <tr key={mueble.id}>
                    <td>{mueble.nombre}</td>
                    <td>{mueble.tipoMadera}</td>
                    <td>{mueble.fabricante}</td>
                    <td>{mueble.Tipo}</td>
                    <td>${mueble.precio}</td>
                    <td>{mueble.stock}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => eliminarMueble(mueble.id)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No hay muebles disponibles o no coinciden con la búsqueda.
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

      {/* Modal Crear Categoría */}
      <RegistrarTipo
        show={showRegistrarTipo}
        handleClose={() => setShowRegistrarTipo(false)}
        handleCreateTipo={handleCreateTipo}
      />
    </>
  );
}

export default ListarMuebles;
