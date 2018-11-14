import Api from './Api'

const url = 'action/'

const comments = {
    getAllComments (cardId) {
        Api.get(`${url}find_all_comments/${cardId}`).then(res => res.data)
    },

    addComments (cardId, memberId, description, date = new Date()) {
        // action_type = 3
        let payload = {
            action_type: 3,
            action_title: '',
            action_description: description,
            action_date_creation: date,
            card_id: cardId,
            list_id: null,
            project_id: null,
            team_id: null
        }
        Api.post('/create', payload).then(action => {
            let data = {
                member_id: memberId,
                action_id: action.data.actionId,
                mha_status: 0
            }
            return Api.post('/create_member_has_action', data)
        }).then(res => res.data)
    }
}

export default comments