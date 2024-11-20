import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Layout({ children }) {
  return (
    <div>
      {/* Navbar de la aplicación */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Mueblería</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Inicio</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/mueble/nuevo">
                <Nav.Link>Agregar Mueble</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/stock">
                <Nav.Link>Administrar Stock</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenedor principal con márgenes */}
      <Container className="my-4">
        {children}
      </Container>
    </div>
  );
}

export default Layout;
console.log('Rendering Layout component');