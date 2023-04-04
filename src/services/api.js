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

const api = Axios.create({ baseURL: 'https://maps.googleapis.com/maps/' })
api.interceptors.request.use((config) => {
    return config
},
    (error) => Promise.reject(error)
)

export default Client
