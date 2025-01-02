import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/MenuPrincipal.css"; // Archivo para los estilos
import Ajustes from "./Ajustes"; // Importar el componente Ajustes
import NotificarStock from "./Muebles/NotificarStock"; // Importar el componente NotificarStock

const MenuPrincipal = () => {
  const [mostrarAjustes, setMostrarAjustes] = useState(false);

  const abrirAjustes = () => {
    setMostrarAjustes(true);
  };

  const cerrarAjustes = () => {
    setMostrarAjustes(false);
  };

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
            <NotificarStock />
          </div>
        </div>
      </nav>

      {/* Nuevo texto centrado en la parte inferior */}
      <div className="texto-inferior">
        Sitios Muebles
      </div>
      {/* Botón de ajustes en la parte inferior derecha */}
      <div className="ajustes-boton" style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <button onClick={abrirAjustes}>Ajustes</button>
      </div>
      {mostrarAjustes && <Ajustes cerrarAjustes={cerrarAjustes} />}
    </>
  );
};

export default MenuPrincipal;
