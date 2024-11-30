import React from "react";
import { Link } from "react-router-dom";
import "../css/MenuPrincipal.css"; // Archivo para los estilos

const MenuPrincipal = () => {
  return (
    <nav className="menu-principal">
      {/* Nombre de la empresa en la esquina izquierda con enlace */}
      <div className="empresa-nombre">
        <Link to="/">Sitios Muebles</Link>
      </div>

      <ul className="menu-lista">
        <li className="menu-item">
          <Link to="/muebles">Gestionar Muebles</Link>
        </li>
        <li className="menu-item">
          <Link to="/stock">Gestionar Stock</Link>
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
  );
};

export default MenuPrincipal;
