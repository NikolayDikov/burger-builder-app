import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgertrainingapp-default-rtdb.firebaseio.com/'
});

export default instance;