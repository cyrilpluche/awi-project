import axios from 'axios';
import helper from '../helpers'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')


const url = 'http://localhost:4200/api/list/'

const List = {

    getAll () {
        return axios.get(url + 'find_all').then(res => res.data)
    },

    get (object) {
        var where = helper.Request.urlFromObject(object)
        return axios.get(url + 'find_one' + where).then(res => res.data)
    },
    create(body){
        return axios.post(url + 'create', body).then(res => res.data)
    }

}

export default List