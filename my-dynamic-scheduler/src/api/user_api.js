import axios from 'axios';

/*
    Uses axios to call user_api and create functions
*/

const api = axios.create({
    baseURL: 'http://localhost:9000/user_api'
});

export const addUser = payload => api.post('/user', payload);
export const authUser = payload => api.post(`/user/auth`, payload);
export const getUserByName = username => api.get(`/user/${username}`);
export const deleteUser = username => api.delete(`/user/${username}`);

const apis = {
    addUser,
    getUserByName,
    deleteUser,
    authUser
};

export default apis;