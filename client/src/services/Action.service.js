import helper from '../helpers'
import Api from './Api'

// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')

const url = 'action/'

const Action = {

    getAll (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_all' + where).then(res => res.data)
    },

    get (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_one' + where).then(res => res.data)
    },

    getNonArchived () {
        return Api.get(url + 'find_all_unarchived').then(res => res.data)
    },

    updateMultiple (array) {
        let body = {memberHasAction: array}
        return Api.put(url + 'update_multiple', body).then(res => res.data)
        //return axios.put(url + 'update/' + array[0].actionId, array[0]).then(res => res.data)
    },

    /** Generate project activity for all members of an array */
    createActivityForAllMembers (body) {
        let where = helper.Request.urlFromObject({projectId: body.projectId})
        return Api.post(url + 'create_mha_from_array' + where, body).then(res => res.data)
    }

}

export default Action