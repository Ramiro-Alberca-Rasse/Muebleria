import React, { useState } from 'react';
import { Modal, Form, Button, Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import api from '../../../services/api'; // Asegúrate de que esta ruta sea correcta

function AgregarMueble({ show, handleClose, onMuebleAdded }) {
  const [nombre, setNombre] = useState('');
  const [tipoMadera, setTipoMadera] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState(''); // Inicialmente vacío
  const [categoria, setCategoria] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false); // Estado para controlar el Toast
  const [mensajeExito, setMensajeExito] = useState(''); // Estado para el mensaje de éxito

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado'); // Esto te dirá si el formulario se envió correctamente

    const nuevoMueble = {
      nombre,
      tipoMadera: tipoMadera || null,
      fabricante: fabricante || null,
      precio: parseFloat(precio),
      stock: stock === '' ? 0 : parseInt(stock, 10), // Si está vacío, se pone en 0
      categoria: categoria || null,
    };

    try {
      const response = await api.post('/muebles/crear', nuevoMueble);
      console.log('Respuesta de la API:', response); // Verifica la respuesta del servidor
      if (response.status === 200) {
        setMensajeExito('¡Mueble agregado exitosamente!');
        setShowSuccessToast(true); // Muestra el toast de éxito
        handleReset(); // Resetea los valores del formulario
        handleClose(); // Cierra el modal
      }
    } catch (error) {
      console.error('Error al agregar el mueble:', error);
      setMensajeExito(''); // Limpia el mensaje de éxito si hay un error
    }
  };

  // Función para resetear los valores del formulario
  const handleReset = () => {
    setNombre('');
    setTipoMadera('');
    setFabricante('');
    setPrecio('');
    setStock('');
    setCategoria('');
  };

  const handleCloseModal = () => {
    handleClose();
    setShowSuccessToast(false); // Ocultar el toast al cerrar el modal
  };

  return (
    <>
      {/* Toast de éxito */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowSuccessToast(false)} // Cierra el toast cuando se hace clic en el icono de cierre
          show={showSuccessToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body>{mensajeExito}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={show} onHide={handleCloseModal} size="lg"> {/* Tamaño grande */}
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
                  required // Obligatorio
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
                  required // Obligatorio
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
                  onChange={(e) => setStock(e.target.value)} // Deja vacío si no se ingresa valor
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa la categoría del mueble"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Button variant="success" type="submit">
              Agregar Mueble
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AgregarMueble;
