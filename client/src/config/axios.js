import axios from 'axios'
const instance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'https://kanban-app-yeska.herokuapp.com'
})

export default instance 