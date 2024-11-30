import React, { useState, useEffect } from 'react';
import api from '../../../services/api';


function AgregarStock() {
    const [muebles, setMuebles] = useState([]);
    const [cantidad, setCantidad] = useState(0);
    const [selectedMuebleId, setSelectedMuebleId] = useState('');

    useEffect(() => {
        fetchMuebles();
    }, []);

    const fetchMuebles = async () => {
        try {
            const response = await api.get('/muebles');
            setMuebles(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de muebles:', error);
        }
    };

    const agregarStock = async () => {
        try {
            await api.post('/stock/agregar', {
                muebleId: selectedMuebleId,
                cantidad: cantidad,
            });
            alert('Stock actualizado');
            fetchMuebles();
        } catch (error) {
            console.error('Error al actualizar el stock:', error);
        }
    };

    return (
        <div>
            <h2>Administración de Stock</h2>
            <select onChange={(e) => setSelectedMuebleId(e.target.value)}>
                <option value="">Selecciona un mueble</option>
                {muebles.map(mueble => (
                    <option key={mueble.id} value={mueble.id}>
                        {mueble.nombre}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
            />
            <button onClick={agregarStock}>Actualizar Stock</button>
        </div>
    );
}

export default AgregarStock;
