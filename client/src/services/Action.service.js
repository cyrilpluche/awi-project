import axios from 'axios';
import helper from '../helpers'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')

const url = 'http://localhost:4200/api/action/'

const Action = {

    getAll (object) {
        let where = helper.Request.urlFromObject(object)
        return axios.get(url + 'find_all' + where).then(res => res.data)
    },

    get (object) {
        let where = helper.Request.urlFromObject(object)
        return axios.get(url + 'find_one' + where).then(res => res.data)
    },

    getNonArchived () {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
        return axios.get(url + 'find_all_unarchived').then(res => res.data)
    },

    updateMultiple (array) {
        let body = {actions: array}
        return axios.put(url + 'update_multiple', body).then(res => res.data)
        //return axios.put(url + 'update/' + array[0].actionId, array[0]).then(res => res.data)

    }

}

export default Action