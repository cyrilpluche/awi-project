//import axios from 'axios';
import helper from '../helpers'
//axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
import Api from './Api'

const url = 'project/'

const Project = {

    getAll () {
        return Api.get(url + 'find_all').then(res => res.data)
    },

    getAllProjectsMember (member_id) { // get all member that member is involved in
        return Api.get(`${url}find_all_member/${member_id}`).then(res => res.data).catch(e => e.error)
    },
    get (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_one' + where).then(res => res.data)
    },

    getOne (projectId) {
        return Api.get(url + 'find_one/' +projectId).then(res => res.data)
    },

    update(projectId,body){
        return Api.put(url + 'update/' +projectId, body).then(res => res.data)
    },

    updateMemberHasProject (params) {
      return Api.put(`${url}update_memberhasProject${helper.Request.urlFromObject(params)}`).then(res => res.data)
    },
    searchbarProjects (str) {
        let where = helper.Request.urlFromObject(str)
        return Api.get(url + 'find_all_searchbar' + where).then(res => res.data)
    },
    sendInvitation(object){
        let where = helper.Request.urlFromObject(object)
        //TODO ROUTES
    },  
    createAndSendInvitation(object){
        let where = helper.Request.urlFromObject(object)
        //TODO ROUTES
    }

}

export default Project