import axios from 'axios';
import helper from "../helpers";

const url = 'http://localhost:4200/api/member/'

const Member = {

    signIn (body) {
        return axios.post(url + 'sign_in', body).then(res => res.data)
    },

    signUp (body) {
        return axios.post(url + 'sign_up', body).then(res => res.data)
    },

    /* Retrieve member's token and check if he is connected are not */
    isLogged () {
        const memberToken = localStorage.getItem('memberToken')

        if (memberToken) {
            // eslint-disable-next-line
            return axios.get(url + 'is_logged' + '?memberToken=' + memberToken)
                .then(res => {
                    console.log(res.data)
                    return {
                        member: res.data.member,
                        isLogged: true
                    }
                })
                .catch(err => {
                    localStorage.removeItem('memberToken')
                    return { isLogged: false }
                })
        } else {
            return { isLogged: false }
        }
    },

    get (object) {
        var where = helper.Request.urlFromObject(object)
        return axios.get(url + 'find_one' + where).then(res => res.data)
    }
}

export default Member