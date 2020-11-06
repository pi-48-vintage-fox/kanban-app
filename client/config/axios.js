import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://kam-ban.herokuapp.com'
})

export default instance