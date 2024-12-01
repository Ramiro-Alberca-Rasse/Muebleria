import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import api from '../../../services/api'; // Asegúrate de que esta ruta sea correcta
import CrearTipo from './CrearTipo'; // Importar el componente CrearTipo

function AgregarMueble({ show, handleClose, onMuebleAdded }) {
  const [nombre, setNombre] = useState('');
  const [tipoMadera, setTipoMadera] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [Tipo, setTipo] = useState('');
  const [Tipos, setTipos] = useState([]); // Estado para las categorías
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [showCrearTipo, setShowCrearTipo] = useState(false); // Estado para mostrar el modal de CrearTipo

  // Función para cargar las categorías
  const fetchTipos = async () => {
    try {
      const response = await api.get('/Tipos'); // Asegúrate de que la ruta de la API sea correcta
      setTipos(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  useEffect(() => {
    fetchTipos(); // Cargar las categorías cuando el componente se monta
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoMueble = {
      nombre,
      tipoMadera: tipoMadera || null,
      fabricante: fabricante || null,
      precio: parseFloat(precio),
      stock: stock === '' ? 0 : parseInt(stock, 10),
      Tipo: Tipo || null,
    };

    try {
      const response = await api.post('/muebles/crear', nuevoMueble);
      if (response.status === 200) {
        setMensajeExito('¡Mueble agregado exitosamente!');
        setShowSuccessToast(true);
        handleReset();
        handleClose();
        onMuebleAdded(); // Notificar a la lista de muebles que se ha agregado un nuevo mueble
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

              <Form.Group as={Col} controlId="formTipoMadera">
                <Form.Label>Tipo de Madera</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el tipo de madera"
                  value={tipoMadera}
                  onChange={(e) => setTipoMadera(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFabricante">
                <Form.Label>Fabricante</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el fabricante"
                  value={fabricante}
                  onChange={(e) => setFabricante(e.target.value)}
                />
              </Form.Group>

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
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresa el stock disponible"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formTipo">
                <Form.Label>Tipo</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    as="select"
                    value={Tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="me-2" // Espacio entre el select y el botón
                  >
                    <option value="">Selecciona un tipo</option>
                    {Tipos.map((cat) => (
                      <option key={cat.id} value={cat.nombre}>
                        {cat.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Button
                    variant="success"
                    size="sm" // Botón pequeño
                    onClick={() => setShowCrearTipo(true)}
                    className="align-self-stretch" // Asegura que el botón tenga la misma altura que el campo
                  >
                    Crear
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

      {/* Modal Crear Categoría */}
      <CrearTipo
        show={showCrearTipo}
        handleClose={() => setShowCrearTipo(false)}
        handleCreateCategory={(newCategory) => {
          setTipos((prevTipos) => [...prevTipos, newCategory]);
        }}
      />
    </>
  );
}

export default AgregarMueble;
