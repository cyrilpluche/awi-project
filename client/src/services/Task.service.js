// import axios from 'axios';
import helper from '../helpers'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
import Api from './Api'

const url = 'task/'

const Task = {

    create(body){
        return Api.post(url + 'create', body).then(res => res.data)
    },

    update(query, body){
        let where = helper.Request.urlFromObject(query)
        return Api.put(url + 'update' + where, body).then(res => res.data)
    },

    delete(query) {
        let where = helper.Request.urlFromObject(query)
        return Api.delete(url + 'delete' + where).then(res => res.data)
    }

}

export default Task