import axios from 'axios';
import helper from '../helpers'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')


const url = 'http://localhost:4200/api/project/'

const Project = {

    getAll () {
        return axios.get(url + 'find_all').then(res => res.data)
    },

    get (object) {
        let where = helper.Request.urlFromObject(object)
        return axios.get(url + 'find_one' + where).then(res => res.data)
    },

    getOne (projectId) {
        return axios.get(url + 'find_one/' +projectId).then(res => res.data)
    },

    update(projectId,body){
        return axios.put(url + 'update/' +projectId, body).then(res => res.data)
    },
    searchbarProjects (str) {
        var where = helper.Request.urlFromObject(str)
        return axios.get(url + 'find_all_searchbar' + where).then(res => res.data)
    },
    sendInvitation(object){
        let where = helper.Request.urlFromObject(object)
        //return axios.post(url + 'find_one' + where).then(res => res.data)
    },  
    createAndSendInvitation(object){
        let where = helper.Request.urlFromObject(object)
    }

}

export default Project