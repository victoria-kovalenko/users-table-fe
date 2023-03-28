import axios from 'axios';

export const client = axios.create({
    baseURL: 'https://users-table-be.herokuapp.com',
})