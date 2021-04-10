import axios from 'axios';

/*
    Uses axios to call task_api and create functions
*/

const api = axios.create({
    baseURL: 'http://localhost:9000/task_api'
});

export const addTask = payload => api.post('/task', payload);
export const getTasks = username => api.get(`/task/${username}`);
export const deleteTask = id => api.delete(`/task/${id}`);

const apis = {
    addTask,
    deleteTask,
    getTasks
};

export default apis;