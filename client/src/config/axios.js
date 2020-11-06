import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kanban-app-bimo-ganteng.herokuapp.com',
});

export default instance