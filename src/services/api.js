import Axios from 'axios'

export const BASE_URL = 'https://stride-app.herokuapp.com/'

const Client = Axios.create({ baseURL: BASE_URL })
Client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`

    }
    return config
},
    (error) => Promise.reject(error)
)

const api = Axios.create({ baseURL: process.env.REACT_APP_API_KEY })
Client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`

    }
    return config
},
    (error) => Promise.reject(error)
)

export default Client