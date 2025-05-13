import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/MenuPrincipal.css";
import Ajustes from "./Ajustes";
import Notificaciones from "./Muebles/Notificaciones";
import api from '../../services/api';

const MenuPrincipal = () => {
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [tieneNotificaciones, setTieneNotificaciones] = useState(false);

  useEffect(() => {
    verificarNotificaciones();
  
    const interval = setInterval(verificarNotificaciones, 10000);
    return () => clearInterval(interval); // Limpieza del intervalo
  }, [tieneNotificaciones]); // Agregamos tieneNotificaciones como dependencia

  const verificarNotificaciones = async () => {
    try {
      const response = await api.get("/notificaciones/hayNotificaciones");
      const hayNotificaciones = response.data; // Axios almacena los datos en response.data
      if (hayNotificaciones !== tieneNotificaciones) {
        setTieneNotificaciones(hayNotificaciones);
      }
    } catch (error) {
      console.error("Error al verificar notificaciones:", error.message);
    }
  };

  const abrirNotificaciones = () => {
    setMostrarNotificaciones(true); 
  };

  const cerrarNotificaciones = () => {
    setMostrarNotificaciones(false);
    verificarNotificaciones()
  };

  const abrirAjustes = () => {
    setMostrarAjustes(true);
  };

  const cerrarAjustes = () => {
    setMostrarAjustes(false);
  };

  return (
    <>
      <nav className="menu-principal">
        <div className="empresa-nombre">
          <Link to="/">Sitios Muebles</Link>
        </div>

        <ul className="menu-lista">
          <li className="menu-item">
            <Link to="/">Gestionar Muebles</Link>
          </li>
          <li className="menu-item">
            <Link to="/ventas">Gestionar Ventas</Link>
          </li>
        </ul>

        <div className="notificaciones-boton" style={{ position: "relative" }}>
          <button onClick={abrirNotificaciones}>Notificaciones</button>
          {tieneNotificaciones && (
            <span
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                width: "10px",
                height: "10px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            ></span>
          )}
        </div>

        {mostrarNotificaciones && (
          <Notificaciones cerrarNotificaciones={cerrarNotificaciones} />
        )}
      </nav>

      <div className="texto-inferior">Sitios Muebles</div>

      <div
        className="ajustes-boton"
        style={{ position: "fixed", bottom: "10px", right: "10px" }}
      >
        <button onClick={abrirAjustes}>Ajustes</button>
      </div>

      {mostrarAjustes && <Ajustes cerrarAjustes={cerrarAjustes} />}
    </>
  );
};

export default MenuPrincipal;
