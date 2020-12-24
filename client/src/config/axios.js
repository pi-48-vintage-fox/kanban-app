import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kanban-app-bimo-ganteng.herokuapp.com',
  // baseURL: "http://localhost:3000"
});

export default instance