import axios from 'axios';

// Using relative URLs so Vite proxy handles routing to Spring Boot on port 8080
const api = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
