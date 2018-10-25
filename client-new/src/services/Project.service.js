import axios from "axios";

const url = 'http://localhost:4200/api/project/'

const Project = {

    getAll () {
        return axios.get(url + 'find_all')
            /*.then(res => {
                return res.data
            })
            .catch((err) => {
                console.log('Error : ', err)
            });*/
    }

}

export default Project