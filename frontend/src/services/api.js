import axios from 'axios';

// Ajusta la baseURL según la URL donde corre tu backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api', 
});

export default api;
