// import axios from 'axios';
import helper from '../helpers'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
import Api from './Api'

const url = 'team/'

const Team = {

    getAll (memberId = null) {
        // if there is no parameter memberId select all team
        // otherwise return all team that the member is involved in
        if (!memberId ||memberId == null)
            return Api.get(url + 'find_all').then(res => res.data);
        else
            return Api.get(url + 'find_all/' + memberId).then(res => res.data)

    },

    get (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_one' + where).then(res => res.data)
    },

    create(body){
        return Api.post(url + 'create', body).then(res => res.data)
    },

    update(teamId, body){
        return Api.put(url + 'update/' + teamId, body).then(res => res.data)
    },



}

export default Team