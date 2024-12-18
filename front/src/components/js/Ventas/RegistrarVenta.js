import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Table } from 'react-bootstrap';
import RegistrarCliente from '../../js/Clientes/RegistrarCliente'; // Importar el modal para Registrar cliente
import RegistrarSubVenta from './RegistrarSubVenta'; // Importar el modal para Registrar Subventa
import api from '../../../services/api';

function RegistrarVenta({ show, handleClose }) {
  const [clientes, setClientes] = useState([]); // Lista de clientes desde la API
  const [muebles, setMuebles] = useState([]); // Lista de muebles desde la API
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState(0); // Total es calculado, no modificable
  const [showRegistrarCliente, setShowRegistrarCliente] = useState(false); // Estado para el modal RegistrarCliente
  const [ventaParcial, setVentaParcial] = useState([]); // Array de ventas parciales
  const [showRegistrarSubVenta, setShowRegistrarSubVenta] = useState(false); // Estado para el modal RegistrarSubVenta

  // Establecer fecha actual y cargar clientes y muebles desde la API
  useEffect(() => {
    if (show) {
      const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      setFecha(fechaActual);

      // Obtener clientes y muebles desde la API usando api.get
      const fetchData = async () => {
        try {
          const [clientesResponse, mueblesResponse] = await Promise.all([
            api.get('/clientes'),
            api.get('/muebles')
          ]);

          // Inspeccionar la respuesta completa para ver la estructura de los datos
          console.log('Respuesta de clientes:', clientesResponse);

          // Verificar si clientesResponse.data es un array
          if (Array.isArray(clientesResponse.data)) {
            // Si es un array, mapeamos los clientes
            const clientesSinVentas = clientesResponse.data.map(cliente => ({
              id: cliente.id,
              nombre: cliente.nombre,
              apellido: cliente.apellido,
            }));
            setClientes(clientesSinVentas);
          } else {
            // Si no es un array, verificamos la estructura
            console.error('La respuesta de clientes no es un array:', clientesResponse.data);
            setClientes([]); // Establecemos como vacío si no es un array
          }

          // Asegurarnos de que la respuesta de muebles también sea un array
          setMuebles(Array.isArray(mueblesResponse.data) ? mueblesResponse.data : []);
        } catch (error) {
          console.error('Error al cargar los datos:', error);
          setClientes([]);
          setMuebles([]);
        }
      };

      fetchData();
    } else {
      // Resetear valores cuando el modal se cierra
      resetForm();
    }
  }, [show]);

  // Función para resetear todos los valores
  const resetForm = () => {
    setClienteSeleccionado('');
    setTotal(0);
    setVentaParcial([]);
  };

  // Maneja la adición de una venta parcial
  const agregarVentaParcial = (muebleSeleccionado, cantidad, subtotal) => {
    const nuevaVenta = { mueble: muebleSeleccionado, cantidad, subtotal };
    const nuevaVentaParcial = [...ventaParcial, nuevaVenta];
    setVentaParcial(nuevaVentaParcial);

    // Calculando el total de ventas después de agregar el nuevo item
    const totalCalculado = nuevaVentaParcial.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(totalCalculado); // Actualizar el total
  };

  // Función para eliminar una venta parcial
  const eliminarVentaParcial = (index) => {
    const nuevasVentasParciales = ventaParcial.filter((_, i) => i !== index);
    setVentaParcial(nuevasVentasParciales);

    // Calculando el total de ventas después de eliminar el item
    const totalCalculado = nuevasVentasParciales.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(totalCalculado); // Actualizar el total
  };

  // Función de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reestructurar el objeto para coincidir con VentaDTO
    const nuevaVenta = {
      idCliente: clienteSeleccionado, // Asegúrate de que esto sea el ID del cliente
      fecha,
      precioTotal: total, // 'total' debe coincidir con el precioTotal esperado
      ventasMuebles: ventaParcial.map((subVenta) => ({
        idMueble: subVenta.mueble.id, // Ajusta al formato del DTO esperado
        cantidad: subVenta.cantidad,
        subTotal: subVenta.subtotal,
      })),
    };

    console.log('Datos de nuevaVenta:', JSON.stringify(nuevaVenta, null, 2)); // Log para revisar el objeto enviado

    try {
      // Enviar la venta principal
      console.log('Enviando POST a /ventas...');
      const response = await api.post('/ventas', nuevaVenta, {
        headers: {
          'Content-Type': 'application/json', // Asegura que se envía como JSON
        },
      });
      console.log('Venta registrada:', response.data);

      // Ahora, enviar las subventas a /ventaMuebles
      console.log('Enviando subventas...');
      for (const subVenta of ventaParcial) {
        const subVentaData = {
          idVenta: response.data.id, // El ID de la venta registrada
          idMueble: subVenta.mueble.id, // Asegúrate de usar la propiedad correcta (subVenta.mueble.id)
          cantidad: subVenta.cantidad,
          subTotal: subVenta.subtotal, // Asegúrate de que 'subtotal' sea la propiedad correcta
        };

        console.log('Enviando subventa:', subVentaData);

        // Enviar cada subventa por separado a /ventaMuebles
        try {
          const subVentaResponse = await api.post('/ventaMuebles', subVentaData, {
            headers: {
              'Content-Type': 'application/json', // Asegura que se envía como JSON
            },
          });
          console.log('Subventa registrada:', subVentaResponse.data);
        } catch (subVentaError) {
          console.error('Error al registrar subventa:', subVentaError);
        }
      }

      console.log('Todas las ventas y subventas fueron registradas correctamente.');
      handleClose(); // Cierra el modal después de registrar la venta y subventas
    } catch (error) {
      console.error('Error al registrar la venta principal:', error);
    }
  };

  // Función para abrir el modal RegistrarCliente
  const handleShowRegistrarCliente = () => setShowRegistrarCliente(true);

  // Función para cerrar el modal RegistrarCliente
  const handleCloseRegistrarCliente = () => {
    setShowRegistrarCliente(false);
    // Refrescar la lista de clientes después de agregar uno nuevo
    api.get('/clientes')
      .then((response) => {
        if (response.status === 200) {
          setClientes(response.data);
        } else {
          console.error('Error al refrescar clientes:', response.status);
        }
      })
      .catch((error) => console.error('Error al refrescar clientes:', error));
  };

  // Función para abrir el modal RegistrarSubVenta
  const handleShowRegistrarSubVenta = () => setShowRegistrarSubVenta(true);

  // Función para cerrar el modal RegistrarSubVenta
  const handleCloseRegistrarSubVenta = () => {
    setShowRegistrarSubVenta(false);
    // Después de cerrar el modal de Subventa, se podría realizar alguna acción como refrescar la lista de ventas parciales
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Selección de cliente */}
            <Form.Group controlId="Cliente">
              <Form.Label>Cliente</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    as="select"
                    value={clienteSeleccionado}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                    required
                    style={{ borderColor: '#343a40' }}
                  >
                    <option value="">Selecciona un cliente</option>
                    {clientes.length > 0 ? (
                      clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre} {cliente.apellido} {/* Nombre y apellido */}
                        </option>
                      ))
                    ) : (
                      <option disabled>Cargando clientes...</option>
                    )}
                  </Form.Control>
                </Col>
                <Col xs={3}>
                  <Button variant="success" className="w-100" onClick={handleShowRegistrarCliente}>
                    Registrar
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            {/* Fecha actual */}
            <Form.Group controlId="Fecha" className="mt-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" value={fecha} readOnly disabled style={{ borderColor: '#343a40' }} />
            </Form.Group>

            {/* Botón Registrar Subventa */}
            <Button variant="success" type="button" onClick={handleShowRegistrarSubVenta} className="mt-3 w-100">
              Registrar Subventa
            </Button>

            {/* Tabla de ventas parciales */}
            {ventaParcial.length > 0 && (
              <Table striped bordered hover className="mt-4" style={{ borderColor: '#343a40' }}>
                <thead className="thead-dark">
                  <tr>
                    <th style={{ borderColor: '#343a40' }}>Mueble</th>
                    <th style={{ borderColor: '#343a40' }}>Cantidad</th>
                    <th style={{ borderColor: '#343a40' }}>Subtotal</th>
                    <th style={{ borderColor: '#343a40' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ventaParcial.map((item, index) => (
                    <tr key={index}>
                      <td style={{ borderColor: '#343a40' }}>{item.mueble.nombre}</td>
                      <td style={{ borderColor: '#343a40' }}>{item.cantidad}</td>
                      <td style={{ borderColor: '#343a40' }}>{item.subtotal}</td>
                      <td style={{ borderColor: '#343a40' }}>
                        <Button variant="danger" size="sm" onClick={() => eliminarVentaParcial(index)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            {/* Total */}
            <Form.Group controlId="Total" className="mt-3">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" value={total} readOnly disabled style={{ borderColor: '#343a40' }} />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-4 w-100">
              Registrar Venta
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Registrar un nuevo cliente */}
      <RegistrarCliente show={showRegistrarCliente} handleClose={handleCloseRegistrarCliente} />

      {/* Modal para Registrar Subventa */}
      <RegistrarSubVenta
        show={showRegistrarSubVenta}
        handleClose={handleCloseRegistrarSubVenta}
        muebles={muebles}
        agregarVentaParcial={agregarVentaParcial}
      />
    </>
  );
}

export default RegistrarVenta;
