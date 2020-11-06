import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://kanbandaryal.herokuapp.com',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
module.exports = instance