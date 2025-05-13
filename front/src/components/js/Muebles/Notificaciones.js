import React, { useEffect, useState } from 'react';
import { Modal, Button, Table } from "react-bootstrap";
import api from "../../../services/api";

const Notificaciones = ({ cerrarNotificaciones }) => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchNotificaciones();
    }, []);

    const fetchNotificaciones = async () => {
        try {
            const response = await api.get('/notificaciones');
            setNotificaciones(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("Error 404: Notificaciones no encontradas");
            } else {
                console.error("Error al obtener notificaciones:", error);
            }
        }
    };

    const deleteNotificacion = async (id) => {
        try {
            await api.delete(`/notificaciones/${id}`);
            fetchNotificaciones();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error(`Error 404: Notificación con id ${id} no encontrada`);
            } else {
                console.error("Error al eliminar notificación:", error);
            }
        }
    };

    const deleteAllNotificaciones = async () => {
        try {
            await api.delete('/notificaciones');
            fetchNotificaciones();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("Error 404: No se encontraron notificaciones para eliminar");
            } else {
                console.error("Error al eliminar todas las notificaciones:", error);
            }
        }
    };


    return (
        <>
      <Modal show onHide={cerrarNotificaciones}>
        <Modal.Header closeButton>
          <Modal.Title>Notificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover className="mt-3" style={{ borderColor: '#343a40' }}>
            <thead className="thead-dark">
              <tr>
                <th style={{ borderColor: '#343a40' }}>Mensaje</th>
                <th style={{ borderColor: '#343a40' }}>Mueble</th>
                <th style={{ borderColor: '#343a40' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notificaciones.map((notificacion) => (
                <tr key={notificacion.id}>
                  <td style={{ borderColor: '#343a40' }}>{notificacion.mensaje}</td>
                  <td style={{ borderColor: '#343a40' }}>{notificacion.mueble.nombre}</td>
                  <td style={{ borderColor: '#343a40' }}>
                    <Button variant="danger" size="sm" onClick={() => deleteNotificacion(notificacion.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" data-bs-dismiss="modal" onClick={cerrarNotificaciones}>Cerrar</Button>
          <Button variant="danger" onClick={deleteAllNotificaciones}>Eliminar Todas</Button>
        </Modal.Footer>
      </Modal>
    </>
    );
};

export default Notificaciones;
