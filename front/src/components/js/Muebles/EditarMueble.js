import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Toast, ToastContainer, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { createPortal } from 'react-dom';
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
  const [showStockWarning, setShowStockWarning] = useState(false);
  const [isStockChecked, setIsStockChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      setShowStockWarning(false);
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

    const requestData = {
      muebleDTO: muebleActualizado,
      checkbox: isStockChecked
    };

    try {
      const response = await api.put(`/muebles/actualizar/${mueble.id}`, requestData);
      if (response.status === 200) {
        setShowSuccessToast(true);
        setMensajeExito('Mueble actualizado con éxito');
        setTimeout(() => {
          setShowSuccessToast(false);
          handleClose();
          onMuebleUpdated();
        }, 3000);
      }
    } catch (error) {
      console.error('Error al actualizar el mueble:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error al actualizar el mueble');
      }
      setMensajeExito('');
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setShowSuccessToast(false);
    setErrorMessage('');
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
    if (!isStockChecked) {
      setShowStockWarning(true);
    } else {
      setShowStockWarning(false);
    }
  };

  const handleStockCheckboxChange = () => {
    setIsStockChecked(!isStockChecked);
    setShowStockWarning(false);
  };

  const ElementoNoOscurecido = ({ children }) => {
    return createPortal(children, document.body);
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseModal} size="lg" style={{ marginTop: '90px' }}>
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
                  style={{ borderColor: '#343a40' }}
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
                    style={{ borderColor: '#343a40' }}
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
                  style={{ borderColor: '#343a40' }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formStock">
                <Form.Label><strong>Stock</strong></Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    placeholder="Ingresa el stock disponible"
                    value={stock}
                    onChange={handleStockChange}
                    style={{ borderColor: '#343a40' }}
                  />
                  <Form.Check
                    type="checkbox"
                    className="ms-2 custom-checkbox"
                    checked={isStockChecked}
                    onChange={handleStockCheckboxChange}
                  />
                  <style>
                    {`
                      .custom-checkbox input[type="checkbox"] {
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        border: 2px solid #343a40;
                        border-radius: 4px;
                        background-color: white;
                        cursor: pointer;
                      }

                      .custom-checkbox input[type="checkbox"]:checked {
                        background-color: #343a40;
                      }
                    `}
                  </style>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Si marca la casilla no se registrará un nuevo cambio de stock; se modificará el stock inicial (en caso de error al crear el mueble).</Tooltip>}
                  >
                    <Button variant="primary" size="sm" className="ms-2">info</Button>
                  </OverlayTrigger>
                </div>
                {showStockWarning && (
                  <Alert variant="warning" className="mt-2">
                    El cambio en el stock se registrará como una salida o entrada de stock (venta o ingreso).
                  </Alert>
                )}
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
                    style={{ borderColor: '#343a40' }}
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
                    style={{ borderColor: '#343a40' }}
                  >
                    <option value="">Selecciona el tipo de madera</option>
                    {tiposDeMadera.map((tm) => (
                      <option key={tm.id} value={tm.id}>
                        {tm.nombre}
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

        <div className="notification-container-bottom-right">
          {showSuccess && (
            <Alert variant="success" className="notification">
              Mueble actualizado con éxito!
            </Alert>
          )}

          {errorMessage && (
            <Alert variant="danger" className="notification">
              {errorMessage}
            </Alert>
          )}
        </div>
      </ElementoNoOscurecido>

      <RegistrarTipo
        show={showRegistrarTipo}
        handleClose={() => {
          setShowRegistrarTipo(false);
          fetchTipos();
        }}
      />
      <RegistrarTipoMadera
        show={showRegistrarTipoMadera}
        handleClose={() => {
          setShowRegistrarTipoMadera(false);
          fetchTiposDeMadera();
        }}
      />
      <RegistrarFabricante
        show={showRegistrarFabricante}
        handleClose={() => {
          setShowRegistrarFabricante(false);
          fetchFabricantes();
        }}
      />

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

export default EditarMueble;