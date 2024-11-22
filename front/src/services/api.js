import axios from 'axios';

// Ajusta la baseURL según la URL donde corre tu backend
const API_BASE_URL = "http://localhost:8080/api"; // Ajusta según tu backend

// Configuración de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Función adicional para usar `fetch` si es necesario
export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Exporta por defecto el objeto `api` para usar Axios
export default api;

