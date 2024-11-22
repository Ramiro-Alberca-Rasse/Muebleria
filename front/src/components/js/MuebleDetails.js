import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import MuebleForm from './MuebleForm';

function MuebleDetails() {
    const { id } = useParams(); // Obtenemos el ID desde la URL
    const [mueble, setMueble] = useState(null); // Estado para almacenar los detalles del mueble

    // Definimos fetchMueble con useCallback para que sea estable
    const fetchMueble = useCallback(async () => {
        try {
            const response = await api.get(`/muebles/${id}`);
            setMueble(response.data);
        } catch (error) {
            console.error('Error al obtener detalles del mueble:', error);
        }
    }, [id]);

    // Ejecutamos fetchMueble cuando cambia el ID
    useEffect(() => {
        fetchMueble();
    }, [fetchMueble]);

    // Mostramos un indicador de carga mientras se obtienen los datos
    if (!mueble) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalles del Mueble</h2>
            {/* Pasamos los datos del mueble al formulario */}
            <MuebleForm muebleData={mueble} onSuccess={fetchMueble} />
        </div>
    );
}

export default MuebleDetails;
