import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://snowkan-v2.herokuapp.com'
});

export default instance;