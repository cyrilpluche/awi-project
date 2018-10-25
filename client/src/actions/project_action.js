import axios from "axios"
const url = 'http://localhost:4200/api/project/'

export const FIND_ONE_PROJECT = 'projects:findOneProject'

export default {
    findOneProject
}



export function findOneProject () {
    /*return {
            type: FIND_ONE_PROJECT,
            payload: {
                project: {
                    projectTitle: "ma couille",
                    projectVisibility: "en string"
                }
            }
    }*/
    fetch(url+'find_one?projectId=1')
        .then((response) => {
            return {
                payload: {
                    project: {
                        projectTitle: response.projectTitle,
                        projectVisibility: "en string"
                        }
                }
            }
        })
        .then((response) => response.json())
}