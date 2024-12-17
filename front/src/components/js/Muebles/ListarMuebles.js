import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import api from '../../../services/api'; // Asegúrate de que esta ruta sea correcta
import EditarMueble from './EditarMueble'; // Importar el componente EditarMueble

function ListarMuebles({ show, handleClose }) {
  const [muebles, setMuebles] = useState([]);
  const [filteredMuebles, setFilteredMuebles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [tipos, setTipos] = useState([]);
  const [selectedTipoMadera, setSelectedTipoMadera] = useState('');
  const [selectedFabricante, setSelectedFabricante] = useState('');
  const [tiposMadera, setTiposMadera] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  const [muebleToEdit, setMuebleToEdit] = useState(null); // Estado para el mueble a editar
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal de edición
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [muebleToDelete, setMuebleToDelete] = useState(null);

  const fetchMuebles = useCallback(async () => {
    try {
      const response = await api.get('/muebles');
      console.log('Datos recibidos:', response.data); // Log para verificar los datos recibidos
      const mueblesConDetalles = await Promise.all(
        response.data.map(async (mueble) => {
          const tipo = mueble.tipoId ? await fetchTipo(mueble.tipoId) : null;
          const tipoDeMadera = mueble.tipoMaderaId ? await fetchTipoDeMadera(mueble.tipoMaderaId) : null;
          const fabricante = mueble.fabricanteId ? await fetchFabricante(mueble.fabricanteId) : null;
          return { ...mueble, tipo, tipoDeMadera, fabricante };
        })
      );
      setMuebles(mueblesConDetalles);
      setFilteredMuebles(mueblesConDetalles);

      const uniqueCategories = [
        ...new Set(mueblesConDetalles.map((mueble) => mueble.tipo ? mueble.tipo.nombre : 'Sin Tipo')),
      ];
      setTipos(uniqueCategories);
    } catch (error) {
      console.error('Error al obtener los muebles:', error);
    }
  }, []); // Definir fetchMuebles con useCallback

  useEffect(() => {
    if (show) {
      fetchMuebles();
      fetchTiposMadera();
      fetchFabricantes();
    }
  }, [show, fetchMuebles]); // Agregar fetchMuebles a las dependencias

  useEffect(() => {
    if (!show) {
      setSearchTerm('');
      setSelectedTipo('');
      setSelectedTipoMadera('');
      setSelectedFabricante('');
      setFilteredMuebles(muebles); // Resetear la lista filtrada a la original
    }
  }, [show, muebles]);

  const fetchTipo = async (id) => {
    try {
      const response = await api.get(`/tipos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el tipo de mueble:', error);
      return null;
    }
  };

  const fetchTipoDeMadera = async (id) => {
    try {
      const response = await api.get(`/tiposdemadera/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el tipo de madera:', error);
      return null;
    }
  };

  const fetchFabricante = async (id) => {
    try {
      const response = await api.get(`/fabricantes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el fabricante:', error);
      return null;
    }
  };

  const fetchTiposMadera = async () => {
    try {
      const response = await api.get('/tiposdemadera');
      setTiposMadera(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de madera:', error);
    }
  };

  const fetchFabricantes = async () => {
    try {
      const response = await api.get('/fabricantes');
      setFabricantes(response.data);
    } catch (error) {
      console.error('Error al obtener los fabricantes:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/muebles/eliminar/${muebleToDelete.id}`);
      setShowDeleteConfirm(false);
      fetchMuebles(); // Refrescar la lista de muebles después de eliminar
    } catch (error) {
      console.error('Error al eliminar el mueble:', error);
    }
  };

  const confirmDelete = (mueble) => {
    setMuebleToDelete(mueble);
    setShowDeleteConfirm(true);
  };

  const handleEdit = (mueble) => {
    setMuebleToEdit(mueble);
    setShowEditModal(true);
  };

  const handleMuebleUpdated = () => {
    setShowEditModal(false);
    fetchMuebles();
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterMuebles(term, selectedTipo, selectedTipoMadera, selectedFabricante);
  };

  const handleFilterByTipo = (e) => {
    const tipo = e.target.value;
    setSelectedTipo(tipo);
    filterMuebles(searchTerm, tipo, selectedTipoMadera, selectedFabricante);
  };

  const handleFilterByTipoMadera = (e) => {
    const tipoMadera = e.target.value;
    setSelectedTipoMadera(tipoMadera);
    filterMuebles(searchTerm, selectedTipo, tipoMadera, selectedFabricante);
  };

  const handleFilterByFabricante = (e) => {
    const fabricante = e.target.value;
    setSelectedFabricante(fabricante);
    filterMuebles(searchTerm, selectedTipo, selectedTipoMadera, fabricante);
  };

  const filterMuebles = (term, tipo, tipoMadera, fabricante) => {
    let filtered = muebles;
    if (term) {
      filtered = filtered.filter((mueble) =>
        mueble.nombre.toLowerCase().includes(term)
      );
    }
    if (tipo) {
      filtered = filtered.filter((mueble) => mueble.tipo && mueble.tipo.nombre === tipo);
    }
    if (tipoMadera) {
      filtered = filtered.filter((mueble) => mueble.tipoDeMadera && mueble.tipoDeMadera.nombre === tipoMadera);
    }
    if (fabricante) {
      filtered = filtered.filter((mueble) => mueble.fabricante && mueble.fabricante.nombre === fabricante);
    }
    setFilteredMuebles(filtered);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Listar Muebles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="search">
              <Form.Label>Buscar por nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </Form.Group>
            <Form.Group controlId="filterByTipo">
              <Form.Label>Filtrar por tipo de mueble</Form.Label>
              <Form.Control as="select" value={selectedTipo} onChange={handleFilterByTipo}>
                <option value="">Todos</option>
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="filterByTipoMadera">
              <Form.Label>Filtrar por tipo de madera</Form.Label>
              <Form.Control as="select" value={selectedTipoMadera} onChange={handleFilterByTipoMadera}>
                <option value="">Todos</option>
                {tiposMadera.map((tipoMadera) => (
                  <option key={tipoMadera.id} value={tipoMadera.nombre}>
                    {tipoMadera.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="filterByFabricante">
              <Form.Label>Filtrar por fabricante</Form.Label>
              <Form.Control as="select" value={selectedFabricante} onChange={handleFilterByFabricante}>
                <option value="">Todos</option>
                {fabricantes.map((fabricante) => (
                  <option key={fabricante.id} value={fabricante.nombre}>
                    {fabricante.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Tipo de Madera</th>
                <th>Fabricante</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMuebles.map((mueble) => (
                <tr key={mueble.id}>
                  <td>{mueble.nombre}</td>
                  <td>{mueble.tipo ? mueble.tipo.nombre : 'Sin Tipo'}</td>
                  <td>
                    {mueble.tipoDeMadera
                      ? mueble.tipoDeMadera.nombre
                      : 'Sin Tipo de Madera'}
                  </td>
                  <td>
                    {mueble.fabricante ? mueble.fabricante.nombre : 'Sin Fabricante'}
                  </td>
                  <td>{mueble.precio}</td>
                  <td>{mueble.stock}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => confirmDelete(mueble)}>
                      Eliminar
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => handleEdit(mueble)} className="ms-2">
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el mueble "{muebleToDelete?.nombre}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {muebleToEdit && (
        <EditarMueble
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          mueble={muebleToEdit}
          onMuebleUpdated={handleMuebleUpdated}
        />
      )}
    </>
  );
}

export default ListarMuebles;