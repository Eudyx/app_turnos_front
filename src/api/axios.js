import axios from "axios";

export default axios.create({
    baseURL: 'https://app-de-turnos.onrender.com/'
    // baseURL: 'http://localhost:3000/'
})
