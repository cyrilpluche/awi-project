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
    },

    flatSearchProject (queryResult) {
        let flat = []
        for (let project of queryResult ) {
            flat.push(project.Project)
        }
        return flat
    },

    flatSearchList (queryResult) {
        let flat = []
        for (let project of queryResult ) {
            for (let list of project.Project.ListProjectFks) {
                flat.push({
                    id: list.dataValues.id,
                    label: list.dataValues.label,
                    projectId: project.projectId,
                    projectTitle: project.Project.dataValues.label
                })
            }
        }
        return flat
    },

    flatSearchCard (queryResult) {
        let flat = []
        for (let project of queryResult ) {
            for (let list of project.Project.ListProjectFks) {
                for (let card of list.CardListFks) {
                    flat.push({
                        id: card.dataValues.id,
                        label: card.dataValues.label,
                        listId: list.dataValues.id,
                        listTitle: list.dataValues.label,
                        projectId: project.projectId,
                        projectTitle: project.Project.dataValues.label
                    })
                }
            }
        }
        return flat
    },

    membersOnCardFilter (members, queryResult) {
        let filter = {
            membersOnCard: [],
            membersOffCard: []
        }

        for (let member of members) {
            if (queryResult.find(mhc => mhc.memberId === member.memberId)) filter.membersOnCard.push(member.Member)
            else filter.membersOffCard.push(member.Member)
        }

        //filter.membersOnCard = queryResult
        //filter.membersOffCard = members

        return filter
    }
};

module.exports = methods;