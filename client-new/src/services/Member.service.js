import axios from 'axios';
import helper from '../helpers'

const url = 'http://localhost:4200/api/member/'

const Member = {

    signIn (body) {
        return axios.post(url + 'sign_in', body).then(res => res.data)
    }

}

export default Member