// import axios from 'axios';
import helper from '../helpers'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
import Api from './Api'

const url = 'label/'

const Label = {

    getAll (query) {
        let where = helper.Request.urlFromObject(query)
        return Api.get(url + 'find_all' + where).then(res => res.data)
    }

}

export default Label