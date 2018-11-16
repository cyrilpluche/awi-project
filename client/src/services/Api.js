import axios from 'axios';

// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')

const BASE_URL = 'http://localhost:4200/api/';
const SOCKET_URL = 'http://localhost:4200'

/*
Why use Api instead of axios
api use axios but it is centralised therefore the server url is set only one time and
we only need to change the BASE_URL if we want to change the server
 */

const apiMethods = {
    BASE_URL,
    SOCKET_URL,
    headers: {
        Authorization: localStorage.getItem('memberToken')
    },
    get (url, token = localStorage.getItem('memberToken')) {
        axios.defaults.headers.common['Authorization'] = token
        return axios.get(BASE_URL + url)
    },

    post (url, payload, token = localStorage.getItem('memberToken')) {
        axios.defaults.headers.common['Authorization'] = token
        return axios.post(BASE_URL + url, payload)
    },

    put (url, payload, token = localStorage.getItem('memberToken')) {
        axios.defaults.headers.common['Authorization'] = token
        return axios.put(BASE_URL + url, payload)
    },

    delete (url, token = localStorage.getItem('memberToken')) {
        axios.defaults.headers.common['Authorization'] = token
        return axios.delete(BASE_URL + url)
    },
}

export default apiMethods
