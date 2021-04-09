import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/task_api'
});

export const addTask = payload => api.post('/task', payload);
export const getTasks = () => api.get('/task');
export const deleteTask = id => api.delete(`/task/${id}`);

const apis = {
    addTask,
    deleteTask,
    getTasks
};

export default apis;