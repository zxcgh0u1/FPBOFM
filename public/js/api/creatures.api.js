import { http } from './http.js';

export const getCreatures = () => http.get('/creatures');
export const getCreatureById = (id) => http.get(`/creatures/${id}`);
export const createCreature = (payload) => http.post('/creatures', payload);
