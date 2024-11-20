import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import api from '../services/api';

function MueblesList() {
  const [muebles, setMuebles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMuebles();
  }, []);

  const fetchMuebles = async () => {
    try {
      const response = await api.get('/muebles');
      setMuebles(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de muebles:', error);
    }
  };

  const eliminarMueble = async (id) => {
    try {
      await api.delete(`/muebles/${id}`);
      fetchMuebles();
    } catch (error) {
      console.error('Error al eliminar el mueble:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Muebles</h2>
      <Row className="my-3">
        {muebles.map((mueble) => (
          <Col md={4} className="mb-4" key={mueble.id}>
            <Card>
              <Card.Body>
                <Card.Title>{mueble.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{mueble.tipoMadera}</Card.Subtitle>
                <Card.Text>
                  Fabricante: {mueble.fabricante} <br />
                  Precio: ${mueble.precio} <br />
                  Stock: {mueble.stock}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/mueble/${mueble.id}`)}>
                  Ver Detalles
                </Button>{' '}
                <Button variant="danger" onClick={() => eliminarMueble(mueble.id)}>
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="success" onClick={() => navigate('/mueble/nuevo')}>
        Agregar Mueble
      </Button>
    </div>
  );
}

export default MueblesList;
