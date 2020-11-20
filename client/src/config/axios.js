import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://kanban-app-septian.herokuapp.com/',
  });

export default instance