import axios from 'axios';

const url = 'http://localhost:4200/api/member/'

const Member = {

    signIn (body) {
        return axios.post(url + 'sign_in', body).then(res => res.data)
    },

    isLogged () {
        const memberToken = localStorage.getItem('memberToken')

        if (memberToken) {
            // eslint-disable-next-line
            return axios.get(url + 'is_logged' + '?memberToken=' + memberToken)
                .then(res => {
                    return {
                        member: {
                            memberToken: memberToken
                        },
                        isLogged: true
                    }
                })
                .catch(err => {
                    localStorage.removeItem('memberToken')
                    return { isLogged: false }
                })
        } else {
            return { isLogged: false }
        }
    }

}

export default Member