// import axios from 'axios';
import helper from '../helpers'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
import Api from './Api'

const url = 'card/'

const Card = {

    getAll () {
        return Api.get(url + 'find_all').then(res => res.data)
    },

    get (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_one' + where).then(res => res.data)
    },

    create(body){
        return Api.post(url + 'create', body).then(res => res.data)
    },

    createLinkLabel(body){
        return Api.post(url + 'create_card_has_label', body).then(res => res.data)
    },

    deleteLinkLabel(query) {
        let where = helper.Request.urlFromObject(query)
        return Api.delete(url + 'delete_card_has_label' + where).then(res => res.data)
    },

    update(cardId,body){
        return Api.put(url + 'update/'+cardId ,body).then(res => res.data)
    },

    searchbarCards (str) {
        let where = helper.Request.urlFromObject(str)
        return Api.get(url + 'find_all_searchbar' + where).then(res => res.data)
    },

    delete(query) {
        let where = helper.Request.urlFromObject(query)
        return Api.delete(url + 'delete' + where).then(res => res.data)
    },

    addMember(body) {
        return Api.post(url + 'create_member_has_card', body).then(res => res.data)
    },

    removeMember(query) {
        let where = helper.Request.urlFromObject(query)
        return Api.post(url + 'delete_member_has_card' + where).then(res => res.data)
    },

}

export default Card