import axios from 'axios';
import helper from '../helpers'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')


const url = 'http://localhost:4200/api/card/'

const Card = {

    getAll () {
        return axios.get(url + 'find_all').then(res => res.data)
    },

    get (object) {
        var where = helper.Request.urlFromObject(object)
        return axios.get(url + 'find_one' + where).then(res => res.data)
    },

    create(body){
        return axios.post(url + 'create', body).then(res => res.data)
    },

    update(cardId,body){
        return axios.put(url + 'update/'+cardId, body).then(res => res.data)
    },

    searchbarCards (str) {
        var where = helper.Request.urlFromObject(str)
        return axios.get(url + 'find_all_searchbar' + where).then(res => res.data)
    }

}

export default Card