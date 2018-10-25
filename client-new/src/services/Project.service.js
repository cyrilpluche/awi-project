import axios from 'axios';
import _helper from '../helpers'

const url = 'http://localhost:4200/api/project/'

const Project = {

    getAll () {
        return axios.get(url + 'find_all').then(res => res.data)
    },

    get (object) {
        var where = _helper.Request.urlFromObject(object)
        return axios.get(url + 'find_one' + where).then(res => res.data)
    }

}

export default Project