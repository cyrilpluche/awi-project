function copy (o) {
    return JSON.parse( JSON.stringify( o ) )
}

const methods = {
    /**
     * create a copy of the object o
     * @param o
     * @returns {any}
     */
    copyObject (o) {
        return copy(o)

    },

    /**
     * Use when a project attribute (that contains an object) belongs to the queryResult
     *
     * @param queryResult
     */
    flatProjects (queryResult) {
        let result = copy(queryResult)
        let project = result.Project;
        result.projectTitle = project.projectTitle;
        result.projectVisibility = project.projectVisibility;
        result.projectStatus = project.projectStatus;
        result.projectDateTarget = project.projectDateTarget;

        result.Project = undefined;
        return result
    },

    flatTeams (queryResult) {
        let result = copy(queryResult)
        let team = result.Team
        result.teamId = team.teamId
        result.teamName = team.teamName
        result.Team = undefined

        return result
    }
};

module.exports = methods;