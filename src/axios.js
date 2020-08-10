import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/chetan-a/paymentApp'
    // baseURL: 'http://localhost:3002'
})

instance.defaults.headers.common['Content-Type'] = "application/json";

export default instance;