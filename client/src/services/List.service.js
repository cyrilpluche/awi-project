// import axios from 'axios';
import helper from '../helpers'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('memberToken')
import Api from './Api'

const url = 'list/'

const List = {


    getAll (idProject) {
        return Api.get(url + 'find_all/'+ idProject).then(res => res.data)
    },


    get (object) {
        let where = helper.Request.urlFromObject(object)
        return Api.get(url + 'find_one/1' + where).then(res => res.data)
    },

    create(body){

        return Api.post(url + 'create', body).then(res => res.data)
    },

    update(listId,body){
        return Api.put(url + 'update/'+listId, body).then(res => res.data)
    },

    delete(listId){
        return Api.delete(url + 'delete/'+listId).then(res => res.data)
    },

    searchbarLists (str) {
        let where = helper.Request.urlFromObject(str)
        return Api.get(url + 'find_all_searchbar' + where).then(res => res.data)
    },

    updateListOrder (listsOrder) {
        return Api.put(url + 'update_list_order', {lists: listsOrder}).then(res => res.data)
    }

}

export default List