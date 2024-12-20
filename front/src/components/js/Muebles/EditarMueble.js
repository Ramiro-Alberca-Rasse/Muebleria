import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Toast, ToastContainer, Alert } from 'react-bootstrap';
import api from '../../../services/api';
import RegistrarTipo from './RegistrarTipo';
import RegistrarTipoMadera from './RegistrarTipoDeMadera';
import RegistrarFabricante from './RegistrarFabricante';

function EditarMueble({ show, handleClose, mueble, onMuebleUpdated }) {
  const [nombre, setNombre] = useState('');
  const [tipoMadera, setTipoMadera] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [tipo, setTipo] = useState('');
  const [tipos, setTipos] = useState([]);
  const [tiposDeMadera, setTiposDeMadera] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [showRegistrarTipo, setShowRegistrarTipo] = useState(false);
  const [showRegistrarTipoMadera, setShowRegistrarTipoMadera] = useState(false);
  const [showRegistrarFabricante, setShowRegistrarFabricante] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Cargar los tipos de muebles
  const fetchTipos = async () => {
    try {
      const response = await api.get('/tipos');
      if (Array.isArray(response.data)) {
        setTipos(response.data);
      } else {
        console.error('La respuesta de la API no es un array:', response.data);
        setTipos([]);
      }
    } catch (error) {
      console.error('Error al obtener los tipos:', error);
      setTipos([]);
    }
  };

  // Cargar los tipos de madera
  const fetchTiposDeMadera = async () => {
    try {
      const response = await api.get('/tiposdemadera');
      if (Array.isArray(response.data)) {
        setTiposDeMadera(response.data);
      } else {
        console.error('La respuesta de la API no es un array:', response.data);
        setTiposDeMadera([]);
      }
    } catch (error) {
      console.error('Error al obtener los tipos de madera:', error);
      setTiposDeMadera([]);
    }
  };

  // Cargar los fabricantes
  const fetchFabricantes = async () => {
    try {
      const response = await api.get('/fabricantes');
      if (Array.isArray(response.data)) {
        setFabricantes(response.data);
      } else {
        console.error('La respuesta de la API no es un array:', response.data);
        setFabricantes([]);
      }
    } catch (error) {
      console.error('Error al obtener los fabricantes:', error);
      setFabricantes([]);
    }
  };

  // Cargar los datos del mueble a editar
  useEffect(() => {
    if (show && mueble) {
      setNombre(mueble.nombre);
      setTipoMadera(mueble.tipoMaderaId);
      setFabricante(mueble.fabricanteId);
      setPrecio(mueble.precio);
      setStock(mueble.stock);
      setTipo(mueble.tipoId);
      fetchTipos();
      fetchTiposDeMadera();
      fetchFabricantes();
    }
  }, [show, mueble]);

  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const muebleActualizado = {
      nombre,
      tipoMaderaId: tipoMadera || null,
      fabricanteId: fabricante || null,
      precio: parseFloat(precio),
      stock: stock === '' ? 0 : parseInt(stock, 10),
      tipoId: tipo || null,
    };

    try {
      const response = await api.put(`/muebles/${mueble.id}`, muebleActualizado);
      if (response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          handleClose();
          onMuebleUpdated();
        }, 4000);
      }
    } catch (error) {
      console.error('Error al actualizar el mueble:', error);
      setMensajeExito('');
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setShowSuccessToast(false);
  };

  return (
    <>
      <div className={show ? 'modal-backdrop show' : ''}></div> {/* Añadir div para oscurecer el fondo */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body>{mensajeExito}</Toast.Body>
        </Toast>
      </ToastContainer>

      {showSuccess && (
        <div className="notification-container">
          <Alert variant="primary" className="notification">
            Mueble actualizado con éxito!
          </Alert>
        </div>
      )}

      <Modal show={show} onHide={handleCloseModal} size="lg" style={{ marginTop: '90px' }}> {/* Añadir estilo para margen superior */}
        <Modal.Header closeButton>
          <Modal.Title>Editar Mueble</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formNombre">
                <Form.Label><strong>Nombre</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre del mueble"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  style={{ borderColor: '#343a40' }} // Añadir estilo para borde oscuro
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formFabricante">
                <Form.Label><strong>Fabricante</strong></Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    as="select"
                    value={fabricante}
                    onChange={(e) => setFabricante(e.target.value)}
                    className="me-2"
                    style={{ borderColor: '#343a40' }} // Añadir estilo para borde oscuro
                  >
                    <option value="">Selecciona un fabricante</option>
                    {fabricantes.map((fab) => (
                      <option key={fab.id} value={fab.id}>
                        {fab.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Button
                    variant="primary"
                    size="sm"
                    className="align-self-start"
                    onClick={() => setShowRegistrarFabricante(true)}
                  >
                    Registrar
                  </Button>
                </div>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formPrecio">
                <Form.Label><strong>Precio</strong></Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresa el precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                  style={{ borderColor: '#343a40' }} // Añadir estilo para borde oscuro
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formStock">
                <Form.Label><strong>Stock</strong></Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresa el stock disponible"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  style={{ borderColor: '#343a40' }} // Añadir estilo para borde oscuro
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formTipo">
                <Form.Label><strong>Tipo de mueble</strong></Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    as="select"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="me-2"
                    style={{ borderColor: '#343a40' }} // Añadir estilo para borde oscuro
                  >
                    <option value="">Selecciona un tipo de mueble</option>
                    {tipos.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Button
                    variant="primary"
                    size="sm"
                    className="align-self-start"
                    onClick={() => setShowRegistrarTipo(true)}
                  >
                    Registrar
                  </Button>
                </div>
              </Form.Group>

              <Form.Group as={Col} controlId="formTipoMadera">
                <Form.Label><strong>Tipo de madera</strong></Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    as="select"
                    value={tipoMadera}
                    onChange={(e) => setTipoMadera(e.target.value)}
                    className="me-2"
                    style={{ borderColor: '#343a40' }} // Añadir estilo para borde oscuro
                  >
                    <option value="">Selecciona el tipo de madera</option>
                    {tiposDeMadera.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Button
                    variant="primary"
                    size="sm"
                    className="align-self-start"
                    onClick={() => setShowRegistrarTipoMadera(true)}
                  >
                    Registrar
                  </Button>
                </div>
              </Form.Group>
            </Row>

            <Button variant="success" type="submit">
              Actualizar Mueble
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Registrar Tipo */}
      <RegistrarTipo
        show={showRegistrarTipo}
        handleClose={() => {
          setShowRegistrarTipo(false);
          fetchTipos();
        }}
      />

      {/* Modal para Registrar Tipo de Madera */}
      <RegistrarTipoMadera
        show={showRegistrarTipoMadera}
        handleClose={() => {
          setShowRegistrarTipoMadera(false);
          fetchTiposDeMadera();
        }}
      />

      {/* Modal para Registrar Fabricante */}
      <RegistrarFabricante
        show={showRegistrarFabricante}
        handleClose={() => {
          setShowRegistrarFabricante(false);
          fetchFabricantes();
        }}
      />
    </>
  );
}

export default EditarMueble;
