import axios from 'axios';
import helper from "../helpers";

const url = 'http://localhost:4200/api/member/'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')

const Member = {

    signIn (body) {
        return axios.post(url + 'sign_in', body).then(res => res.data)
    },

    signUp (body) {
        return axios.post(url + 'sign_up', body).then(res => res.data)
    },

    validateAccount (memberToken) {
        axios.defaults.headers.common['Authorization'] = memberToken
        return axios.put(url + 'validate_account').then(res => res.data)
    },

    /* Retrieve member's token and check if he is connected are not */
    isLogged () {
        const memberToken = localStorage.getItem('memberToken')

        if (memberToken) {
            // eslint-disable-next-line
            return axios.get(url + 'is_logged' + '?memberToken=' + memberToken)
                .then(res => {
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
    },

    update (body) {
        var where = helper.Request.urlFromObject({memberId: body.memberId})
        return axios.put(url + 'update' + where, body).then(res => res.data)
    },

    updatePassword (attributes) {
        var where = helper.Request.urlFromObject({memberId: attributes.memberId, memberPassword: attributes.memberPassword})
        let body = {
            memberPassword: attributes.newMemberPassword
        }
        return axios.put(url + 'update_password' + where, body).then(res => res.data)
    },

    sendNewPassword (memberEmail) {
        let body = {
            memberEmail: memberEmail
        }
        return axios.post(url + 'password_forgotten', body).then(res => res.data)
    }
}

export default Member