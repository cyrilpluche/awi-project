import axios from 'axios';
import helper from '../helpers'

const url = 'http://localhost:4200/api/member/'

const Member = {

    signIn (body) {
        return axios.post(url + 'sign_in', body).then(res => res.data)
    },

    isLogged () {
        if (localStorage.getItem('memberToken')) {
            return axios.get(url + 'is_logged')
                .then(res => true)
                .catch(err => false)
        } else {
            return false
        }
    }

}

export default Member