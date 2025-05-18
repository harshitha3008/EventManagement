// Create a file like api.js in your services folder
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mahotsav-backend.vercel.app'
});

export default api;