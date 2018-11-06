import helper from '../helpers'
import Api from './Api'

const url = 'permission/'

const Action = {

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
    }


}

export default Action