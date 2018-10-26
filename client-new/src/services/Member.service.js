import axios from 'axios';
import helper from '../helpers'

const url = 'http://localhost:4200/api/member/'

const Member = {

    signIn (body) {
        return axios.post(url + 'sign_in', body).then(res => res.data)
    },

    signUp (body) {
        console.log(body)
        return axios.post(url + 'sign_up', body).then(res => res.data)
    },

    isLogged () {
        const memberToken = localStorage.getItem('memberToken')
        if (memberToken) {
            return axios.get(url + 'is_logged' + '?memberToken=' + memberToken)
                .then(res => {
                    console.log(res)
                    return true
                })
                .catch(err => false)
        } else {
            return false
        }
    }

}

export default Member