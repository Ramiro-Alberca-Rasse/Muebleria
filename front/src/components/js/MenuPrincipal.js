import React from "react";
import { Link } from "react-router-dom";
import "../css/MenuPrincipal.css"; // Archivo para los estilos

const MenuPrincipal = () => {
  return (
    <>
      <nav className="menu-principal">
        {/* Nombre de la empresa centrado */}
        <div className="empresa-nombre">
          <Link to="/">Sitios Muebles</Link>
        </div>

        {/* Menú de navegación */}
        <ul className="menu-lista">
          <li className="menu-item">
            <Link to="/">Gestionar Muebles</Link>
          </li>
          <li className="menu-item">
            <Link to="/ventas">Gestionar Ventas</Link> {/* Actualiza la ruta */}
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
        Sitios Muebles
      </div>
    </>
  );
};

export default MenuPrincipal;
