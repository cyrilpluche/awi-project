// import axios from 'axios';
import helper from '../helpers'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
import Api from './Api'

const url = 'label/'

const Label = {

    getAll () {
        return Api.get(url + 'find_all').then(res => res.data)
    }

}

export default Label