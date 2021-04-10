import axios from 'axios';

/*
    Uses axios to call event_api and create functions
*/

const api = axios.create({
    baseURL: 'http://localhost:9000/event_api'
});

export const addEvent = payload => api.post('/event', payload);
export const getEvents = username => api.get(`/event/${username}`);
export const deleteEvent = id => api.delete(`/event/${id}`);

const apis = {
    addEvent,
    deleteEvent,
    getEvents
};

export default apis;