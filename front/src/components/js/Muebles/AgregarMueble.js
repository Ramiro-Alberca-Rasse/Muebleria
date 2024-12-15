import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Toast, ToastContainer, Alert } from 'react-bootstrap';
import api from '../../../services/api'; // Asegúrate de que esta ruta sea correcta
import RegistrarTipo from './RegistrarTipo'; // Modal para registrar nuevos "Tipo"
import RegistrarTipoMadera from './RegistrarTipoDeMadera'; // Modal para registrar nuevos "Tipo de Madera"
import RegistrarFabricante from './RegistrarFabricante'; // Modal para registrar nuevos fabricantes

function AgregarMueble({ show, handleClose, onMuebleAdded }) {
  const [nombre, setNombre] = useState('');
  const [tipoMadera, setTipoMadera] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [tipo, setTipo] = useState('');
  const [tipos, setTipos] = useState([]); // Tipos de muebles
  const [tiposDeMadera, setTiposDeMadera] = useState([]); // Tipos de madera
  const [fabricantes, setFabricantes] = useState([]); // Fabricantes
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [showRegistrarTipo, setShowRegistrarTipo] = useState(false); // Modal para "Tipo"
  const [showRegistrarTipoMadera, setShowRegistrarTipoMadera] = useState(false); // Modal para "Tipo de Madera"
  const [showRegistrarFabricante, setShowRegistrarFabricante] = useState(false); // Modal para "Fabricante"
  const [showSuccess, setShowSuccess] = useState(false);

  // Cargar los tipos de muebles
  const fetchTipos = async () => {
    try {
      const response = await api.get('/tipos'); // Ruta correcta en tu backend
      setTipos(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos:', error);
    }
  };

  // Cargar los tipos de madera
  const fetchTiposDeMadera = async () => {
    try {
      const response = await api.get('/tiposdemadera'); // Ruta correcta en tu backend
      setTiposDeMadera(response.data);
      
    } catch (error) {
      console.error('Error al obtener los tipos de madera:', error);
    }
  };

  // Cargar los fabricantes
  const fetchFabricantes = async () => {
    try {
      const response = await api.get('/fabricantes'); // Ruta correcta en tu backend
      setFabricantes(response.data);
    } catch (error) {
      console.error('Error al obtener los fabricantes:', error);
    }
  };

  useEffect(() => {
    if (show) {
      fetchTipos();
      fetchTiposDeMadera();
      fetchFabricantes();
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoMueble = {
      nombre,
      tipoMaderaId: tipoMadera || null,
      fabricanteId: fabricante || null,
      precio: parseFloat(precio),
      stock: stock === '' ? 0 : parseInt(stock, 10),
      tipoId: tipo || null,
    };

    // Log para verificar los datos antes de enviarlos
    console.log("Datos que se enviarán al servidor:", nuevoMueble);

    try {
      const response = await api.post('/muebles/registrar', nuevoMueble);
      if (response.status === 201) {
        setShowSuccess(true); // Mostrar mensaje de éxito
        handleReset();
        setTimeout(() => {
          setShowSuccess(false);
          handleClose();        
        }, 4000); // Ocultar mensaje después de 3 segundos
      }
    } catch (error) {
      console.error('Error al agregar el mueble:', error);
      setMensajeExito('');
    }
  };

  const handleReset = () => {
    setNombre('');
    setTipoMadera('');
    setFabricante('');
    setPrecio('');
    setStock('');
    setTipo('');
  };

  const handleCloseModal = () => {
    handleClose();
    setShowSuccessToast(false);
  };

  return (
    <>
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
          <Alert variant="success" className="notification">
            Mueble registrado con éxito!
          </Alert>
        </div>
      )}

      <Modal show={show} onHide={handleCloseModal} size="lg">
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

              <Form.Group as={Col} controlId="formFabricante">
                <Form.Label>Fabricante</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    as="select"
                    value={fabricante}
                    onChange={(e) => setFabricante(e.target.value)}
                    className="me-2"
                  >
                    <option value="">Selecciona un fabricante</option>
                    {fabricantes.map((fab) => (
                      <option key={fab.id} value={fab.id}>
                        {fab.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Button
                    variant="success"
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
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresa el precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresa el stock disponible"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formTipo">
                <Form.Label>Tipo de mueble</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    as="select"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="me-2"
                  >
                    <option value="">Selecciona un tipo de mueble</option>
                    {tipos.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Button
                    variant="success"
                    size="sm"
                    className="align-self-start"
                    onClick={() => setShowRegistrarTipo(true)}
                  >
                    Registrar
                  </Button>
                </div>
              </Form.Group>

              <Form.Group as={Col} controlId="formTipoMadera">
                <Form.Label>Tipo de madera</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    as="select"
                    value={tipoMadera}
                    onChange={(e) => setTipoMadera(e.target.value)}
                    className="me-2"
                  >
                    <option value="">Selecciona el tipo de madera</option>
                    {tiposDeMadera.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Button
                    variant="success"
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
              Agregar Mueble
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Registrar Tipo */}
      <RegistrarTipo
        show={showRegistrarTipo}
        handleClose={() => {
          setShowRegistrarTipo(false);
          fetchTipos(); // Actualiza la lista desde el backend
        }}
      />

      {/* Modal para Registrar Tipo de Madera */}
      <RegistrarTipoMadera
        show={showRegistrarTipoMadera}
        handleClose={() => {
          setShowRegistrarTipoMadera(false);
          fetchTiposDeMadera(); // Actualiza la lista desde el backend
        }}
      />

      {/* Modal para Registrar Fabricante */}
      <RegistrarFabricante
        show={showRegistrarFabricante}
        handleClose={() => {
          setShowRegistrarFabricante(false);
          fetchFabricantes(); // Actualiza la lista desde el backend
        }}
      />
    </>
  );
}

export default AgregarMueble;
