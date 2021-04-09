import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/event_api'
});

export const addEvent = payload => api.post('/event', payload);
export const getEvents = () => api.get('/event');
export const deleteEvent = id => api.delete(`/event/${id}`);

const apis = {
    addEvent,
    deleteEvent,
    getEvents
};

export default apis;