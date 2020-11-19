import axios from "axios"

const instance = axios.create({
  baseURL: 'https://kanban-web-application.herokuapp.com/',

});

export default instance