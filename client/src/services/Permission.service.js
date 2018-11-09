import helper from '../helpers'
import Api from './Api'

const url = 'permission/';

const Action = {

    createMemberProjectPermission (memberId, projectId, permissionId, mhppState) {
        let payload = {
            memberId, projectId, permissionId, mhppState
        };
        return Api.post(url + 'create_for_project', payload).then(r => r.data)
    },
    
    /** get the permissions of the member on the project
     *
     *  object = { projectId: id }
     */
    getAllOnProject (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_all_for_project' + where).then(res => res.data)
    },

    updateOnProject (object, body) {
        let where = helper.Request.urlFromObject(object)
        return Api.put(url + 'update_for_project' + where, body).then(res => res.data)
    },

    deleteForMemberOnProject (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.delete(url + 'delete_for_project' + where).then(res => res.data)
    }


}

export default Action