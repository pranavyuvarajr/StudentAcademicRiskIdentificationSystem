import axios from 'axios';

// Using relative URLs so Vite proxy handles routing to Spring Boot on port 8080
const api = axios.create({
  baseURL: 'https://studentacademicrisk.up.railway.app/',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
