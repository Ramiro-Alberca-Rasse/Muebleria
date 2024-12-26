import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Table, Toast, ToastContainer, Alert } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import api from '../../../services/api'; // Asegúrate de que esta ruta sea correcta
import EditarCliente from './EditarCliente'; // Importar el componente EditarCliente
import DetallesCliente from './DetallesCliente'; // Importar el componente DetallesCliente

function ListarClientes({ show, handleClose }) {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clienteToEdit, setClienteToEdit] = useState(null); // Estado para el cliente a editar
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal de edición
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [clienteToView, setClienteToView] = useState(null); // Estado para el cliente a ver detalles
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Estado para mostrar el modal de detalles
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchClientes = useCallback(async () => {
    try {
      const response = await api.get('/clientes/info');
      setClientes(response.data);
      setFilteredClientes(response.data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }, []);

  useEffect(() => {
    if (show) {
      fetchClientes();
    }
  }, [show, fetchClientes]);

  useEffect(() => {
    if (!show) {
      setSearchTerm('');
      setFilteredClientes(clientes); // Resetear la lista filtrada a la original
    }
  }, [show, clientes]);

  const handleDelete = async () => {
    try {
      await api.delete(`/clientes/${clienteToDelete.id}`);
      setShowDeleteConfirm(false);
      fetchClientes(); // Refrescar la lista de clientes después de eliminar
      setShowSuccessToast(true);
      setMensajeExito('Cliente eliminado con éxito');
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      setErrorMessage('Error al eliminar el cliente');
    }
  };

  const confirmDelete = (cliente) => {
    setClienteToDelete(cliente);
    setShowDeleteConfirm(true);
  };

  const handleEdit = (cliente) => {
    setClienteToEdit(cliente);
    setShowEditModal(true);
  };

  const handleViewDetails = (cliente) => {
    setClienteToView(cliente);
    setShowDetailsModal(true);
  };

  const handleClienteUpdated = () => {
    setShowEditModal(false);
    fetchClientes();
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterClientes(term);
  };

  const filterClientes = (term) => {
    let filtered = clientes;
    if (term) {
      filtered = filtered.filter((cliente) =>
        (cliente.nombre + ' ' + cliente.apellido).toLowerCase().includes(term)
      );
    }
    setFilteredClientes(filtered);
  };

  const ElementoNoOscurecido = ({ children }) => {
    return createPortal(children, document.body);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Listar Clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="search">
              <Form.Label><strong>Buscar por nombre</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ borderColor: '#343a40' }}
              />
            </Form.Group>
          </Form>
          <Table striped bordered hover className="mt-3" style={{ borderColor: '#343a40' }}>
            <thead className="thead-dark">
              <tr>
                <th style={{ borderColor: '#343a40' }}>Nombre Completo</th>
                <th style={{ borderColor: '#343a40' }}>Email</th>
                <th style={{ borderColor: '#343a40' }}>Teléfono</th>
                <th style={{ borderColor: '#343a40' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td style={{ borderColor: '#343a40' }}>{cliente.nombreCompleto} </td>
                  <td style={{ borderColor: '#343a40' }}>{cliente.email}</td>
                  <td style={{ borderColor: '#343a40' }}>{cliente.telefono}</td>
                  <td style={{ borderColor: '#343a40' }}>
                    <Button variant="secondary" size="sm" onClick={() => handleViewDetails(cliente)}>
                      Detalles
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => handleEdit(cliente)} className="ms-2">
                      Editar
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => confirmDelete(cliente)} className="ms-2">
                      Eliminar
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
          ¿Estás seguro de que deseas eliminar el cliente "{clienteToDelete?.nombre} {clienteToDelete?.apellido}"?
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

      {clienteToEdit && (
        <EditarCliente
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          cliente={clienteToEdit}
          onClienteUpdated={handleClienteUpdated}
        />
      )}

      {clienteToView && (
        <DetallesCliente
          show={showDetailsModal}
          handleClose={() => setShowDetailsModal(false)}
          cliente={clienteToView}
        />
      )}

      <ElementoNoOscurecido>
        <ToastContainer position="bottom-end" className="p-3">
          <Toast
            onClose={() => setShowSuccessToast(false)}
            show={showSuccessToast}
            delay={3000}
            autohide
            bg="success"
          >
            <Toast.Body style={{ fontSize: '1.2em' }}>{mensajeExito}</Toast.Body>
          </Toast>
        </ToastContainer>

        {errorMessage && (
          <div className="notification-container-bottom-right">
            <Alert variant="danger" className="notification" style={{ fontSize: '1.2em' }}>
              {errorMessage}
            </Alert>
          </div>
        )}
      </ElementoNoOscurecido>

      <style jsx>{`
        .notification-container-bottom-right {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1050;
        }
      `}</style>
    </>
  );
}

export default ListarClientes;
