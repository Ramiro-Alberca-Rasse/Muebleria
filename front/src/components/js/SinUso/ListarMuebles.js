import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Spinner } from 'react-bootstrap'; 
import api from '../../../services/api';

function MueblesList() {
  const [muebles, setMuebles] = useState([]);
  const [filteredMuebles, setFilteredMuebles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMuebles();
  }, []);

  useEffect(() => {
    // Filtramos los muebles según el término de búsqueda
    setFilteredMuebles(
      muebles.filter((mueble) =>
        mueble.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, muebles]);

  const fetchMuebles = async () => {
    try {
      const response = await api.get('/muebles');
      setMuebles(response.data);
      setFilteredMuebles(response.data); // Inicializamos con todos los muebles
    } catch (error) {
      console.error('Error al obtener la lista de muebles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Cargando muebles...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Lista de Muebles</h2>
      
      {/* Campo de búsqueda */}
      <Form.Control
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Row className="my-3">
        {filteredMuebles.length > 0 ? (
          filteredMuebles.map((mueble) => (
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
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No se encontraron muebles que coincidan con la búsqueda.</p>
        )}
      </Row>
    </div>
  );
}

export default MueblesList;
