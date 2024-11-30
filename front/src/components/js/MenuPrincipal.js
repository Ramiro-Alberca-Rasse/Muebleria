import React from "react";
import { Link } from "react-router-dom";
import "../css/MenuPrincipal.css"; // Archivo para los estilos

const MenuPrincipal = () => {
  return (
    <>
      <div className="pantalla-centro">
        <h1>Sitios Muebles</h1>
      </div>

      <nav className="menu-principal">
        {/* Nombre de la empresa centrado */}
        <div className="empresa-nombre">
          <Link to="/">Sitios Muebles</Link>
        </div>

        {/* Menú de navegación */}
        <ul className="menu-lista">
          <li className="menu-item">
            <Link to="/muebles">Gestionar Muebles</Link>
          </li>
          <li className="menu-item">
            <Link to="/stock">Gestionar Stocks</Link>
          </li>
          <li className="menu-item">
            <Link to="/ventas">Gestionar Ventas</Link>
          </li>
          <li className="menu-item">
            <Link to="/clientes">Gestionar Clientes</Link>
          </li>
        </ul>

        {/* Botón de notificaciones */}
        <div className="notificaciones">
          Notificaciones
          <div className="menu-notificaciones">
            <ul>
              <li>No hay notificaciones</li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Nuevo texto centrado en la parte inferior */}
      <div className="texto-inferior">
        Gestion de
      </div>
            {/* Nuevo texto centrado en la parte inferior */}
            <div className="texto-inferior2">
        Ventas e Inventario
      </div>
    </>
  );
};

export default MenuPrincipal;
