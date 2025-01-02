import React, { useEffect, useState } from "react";

const NotificarStock = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/api/notificaciones");
    eventSource.onmessage = (event) => {
      const nuevaNotificacion = JSON.parse(event.data);
      setNotificaciones((prevNotificaciones) => [...prevNotificaciones, nuevaNotificacion]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="notificaciones">
      {notificaciones.length === 0 ? (
        <p>No hay notificaciones</p>
      ) : (
        <ul>
          {notificaciones.map((notificacion, index) => (
            <li key={index}>{notificacion.mensaje}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificarStock;
