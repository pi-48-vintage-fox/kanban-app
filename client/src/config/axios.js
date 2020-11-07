import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://kanban-app-septian.herokuapp.com/',
  });

export default instance