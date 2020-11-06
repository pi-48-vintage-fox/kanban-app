'use strict'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kang-bang-app.herokuapp.com',
});

export default instance