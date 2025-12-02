import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: 'https://lonja-api.onrender.com'
});

export default clienteAxios