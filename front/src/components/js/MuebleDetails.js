import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import MuebleForm from './MuebleForm';

function MuebleDetails() {
    const { id } = useParams();
    const [mueble, setMueble] = useState(null);

    useEffect(() => {
        fetchMueble();
    }, [id]);

    const fetchMueble = async () => {
        try {
            const response = await api.get(`/muebles/${id}`);
            setMueble(response.data);
        } catch (error) {
            console.error('Error al obtener detalles del mueble:', error);
        }
    };

    if (!mueble) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalles del Mueble</h2>
            <MuebleForm muebleData={mueble} onSuccess={fetchMueble} />
        </div>
    );
}

export default MuebleDetails;
