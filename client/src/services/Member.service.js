// import axios from 'axios';
import helper from "../helpers";
import Api from './Api'
import axios from 'axios';

const url = 'member/'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')

const Member = {

    createIfNotExist (body) {
        let where = helper.Request.urlFromObject({ memberEmail: body.memberEmail })
        return Api.post(url + 'create_if_not_exist' + where, body).then(res => res.data)
    },

    signIn (body) {
        return Api.post(url + 'sign_in', body).then(res => res.data)
    },

    signInWithGithub () {
        return Api.get(url + 'sign_in_with_github').then(res => res.data)
    },

    signUp (body) {
        let where = helper.Request.urlFromObject({
            memberEmail: body.memberEmail,
            memberPseudo: body.memberPseudo
        })
        return Api.post(url + 'sign_up' + where, body).then(res => res.data)
    },

    updateMemberInvitation (body) {
        return Api.put(url + 'update_sign_up?memberEmail=' + body.memberEmail, body).then(res => res.data)
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

    /** ==================== INVITATIONS ==================== */

    /** Check if the token contains a member that exist */
    decrpytInvitation (memberToken) {
        return Api.get(url + 'decrypt_invitation', memberToken).then(res => res.data)
    },

    getInvitation (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_one_invitation' + where).then(res => res.data)
    },

    updateInvitation (body, query) {
        let where = helper.Request.urlFromObject(query)
        return Api.put(url + 'update_invitation' + where, body).then(res => res.data)
    },

    deleteInvitation (query) {
        let where = helper.Request.urlFromObject(query)
        return Api.delete(url + 'delete_invitation' + where).then(res => res.data)
    },

    /** ==================== CLOUDINARY ==================== */
    updateProfilePicture (body, query) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
        let where = helper.Request.urlFromObject({memberId: query})
        return axios.put(Api.BASE_URL + url + 'update_picture' + where, body).then(res => res.data)
    },
}

export default Member