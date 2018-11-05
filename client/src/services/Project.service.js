//import axios from 'axios';
import helper from '../helpers'
//axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
import Api from './Api'

const url = 'project/'

const Project = {

    getAll () {
        return Api.get(url + 'find_all').then(res => res.data)
    },

    getAllWithCards (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_all_lists_cards' +where).then(res => res.data)
    },

    getAllProjectsMember (member_id) { // get all member that member is involved in
        return Api.get(`${url}find_all_member/${member_id}`).then(res => res.data).catch(e => e.error)
    },

    /** Use for project component */
    getAllMembers(object){
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_all_members' + where).then(res => res.data)
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

    createProject (projectTitle, projectVisibility, projectStatus = 0, projectDateTarget = null) {
        let payload = {
            projectTitle, projectVisibility, projectStatus, projectDateTarget
        }

        return Api.post(url + 'create', payload).then(res => res.data)
    },

    createMemberHasProject (memberId, projectId, memberhasprojectStatus, projectIsFavorite = false) {
        let payload = {
            memberId, projectId, memberhasprojectStatus, projectIsFavorite
        }
        return Api.post(url + 'createMemberHasProject', payload).then(res => res.data)
    },

    updateMemberHasProject (params) {
      return Api.put(`${url}update_memberhasProject${helper.Request.urlFromObject(params)}`).then(res => res.data)
    },

    searchbarProjects (str) {
        let where = helper.Request.urlFromObject(str)
        return Api.get(url + 'find_all_searchbar' + where).then(res => res.data)
    },
    getMemberHasProject(object){
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'member_has_project' + where).then(res => res.data)
    },

    getLabels(){
        /**
         * return all labels for a specific project
         */
    },

    sendInvitation(object){
        //let where = helper.Request.urlFromObject(object)
       /**
        * object = {
            * memberId :..
            * memberEmail:...
            * projectId: ...
        * }
        */

        /**
        * send an invitation to user to join the project (user exist in DB)
        * -> we create a row in the table memberhasproject with status = 0 (in validation) 
        * -> we send an email with a link to update his status = 1 (accepted to join) 
        */

    },  
    createAndSendInvitation(body){
        /**
        * object = {
            * memberEmail:...
            * projectId: ...
        * }
        */

        /** email doesnt exist in DB so we have to :
         * Create an account with the specified email and send an email invitation to user to join the project
         * -> we create an account 
         * -> we create a row in the table memberhasproject with status = 0 (in validation)
         * -> we send an email with a link to update his password and information and update his status = 1 (accepted to join)
         */
        return Api.post(url + 'create_invitation', body).then(res => res.data)
    },
    getMemberStatus(object){
        /**
         * object = {
            * memberId: ..
            * projectId: ...
         * } 
         */

        /***Return the status for a member of a specific project:
         * True if he is admin of this project, else false
         */ 
        
    },

    setAsAdmin(object){
         /**
         * object = {
         * memberId: ..
         * projectId: ...
         * }
         */

         /**
          * Set the member as administrator of the project given as parameter
          *  in the DB -> Table memberhaspermissionproject, attribute : mhpp_state = true
          */
    },
    getActivity(projectId){
        /**
         * Return all activities related to this project 
         * in the DB -> Table "action"
         */
    }
}

export default Project