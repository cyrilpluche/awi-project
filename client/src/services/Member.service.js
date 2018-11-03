// import axios from 'axios';
import helper from "../helpers";
import Api from './Api'

const url = 'member/'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')

const Member = {

    signIn (body) {
        return Api.post(url + 'sign_in', body).then(res => res.data)
    },

    signInWithGithub () {
        return Api.get(url + 'sign_in_with_github').then(res => res.data)
    },

    signUp (body) {

        return Api.post(url + 'sign_up?memberEmail=' + body.memberEmail, body).then(res => res.data)
    },

    /* Set the status of a member to 1 if the token is valid */
    validateAccount (memberToken) {
        return Api.put(url + 'validate_account',null , memberToken).then(res => res.data)
    },

    /* Retrieve member's token and check if he is connected are not */
    isLogged () {
        const memberToken = localStorage.getItem('memberToken')

        if (memberToken) {
            // eslint-disable-next-line
            return Api.get(url + 'is_logged' + '?memberToken=' + memberToken)
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
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_one' + where).then(res => res.data)
    },

    update (body) {
        let where = helper.Request.urlFromObject({memberId: body.memberId})
        return Api.put(url + 'update' + where, body).then(res => res.data)
    },

    updatePassword (attributes) {
        let where = helper.Request.urlFromObject({memberId: attributes.memberId, memberPassword: attributes.memberPassword})
        let body = {
            memberPassword: attributes.newMemberPassword
        }
        return Api.put(url + 'update_password' + where, body).then(res => res.data)
    },

    /* Send a random new password when a member forgot his password */
    sendNewPassword (memberEmail) {
        let body = {
            memberEmail: memberEmail
        }
        return Api.post(url + 'password_forgotten', body).then(res => res.data)
    },
    getAllMembers(projectId){
        return Api.get(url + 'find_all_members/'+projectId,).then(res => res.data)
    },

    /* Check if the token contains a member that exist */
    decrpytInvitation (memberToken) {
        return Api.get(url + 'invitation_token', memberToken).then(res => res.data)
    }
}

export default Member