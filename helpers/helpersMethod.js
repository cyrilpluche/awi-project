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
        result.contributor = project.MemberhasprojectProjectFks.length

        result.Project = undefined;
        return result
    },

    flatComents (queryResult) {
        let result = copy(queryResult)
        let action = result.Action
        action.Card = undefined
        for(let propertyName in action) {
            result[propertyName] = action[propertyName]
            // propertyName is what you want
            // you can get the value like this: myObject[propertyName]
        }
        result.Action = undefined
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
            if (project.Project !== null) {
                for (let list of project.Project.ListProjectFks) {
                    flat.push({
                        id: list.dataValues.id,
                        label: list.dataValues.label,
                        projectId: project.projectId,
                        projectTitle: project.Project.dataValues.label
                    })
                }
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
    },

    computeListOrder (lists) {
        let listsOrder = []
        let father = 0

        for (let l of lists) {
            /** We select list in order */
            let index = lists.findIndex(list => list.listFather === father)

            while (index === -1) {
                father += 1
                index = lists.findIndex(list => list.listFather === father)
            }

            /** We sort her cards */
            let cardsOrder = []
            let cardFather = 0
            for (let c of lists[index].CardListFks) {
                let indexCard = lists[index].CardListFks.findIndex(card => card.cardFather === cardFather)

                while (indexCard === -1) {
                    cardFather += 1
                    indexCard = lists[index].CardListFks.findIndex(card => card.cardFather === cardFather)
                }

                cardsOrder.push(lists[index].CardListFks[indexCard])
                cardFather += 1
            }
            lists[index].dataValues.CardListFks = cardsOrder
            listsOrder.push(lists[index])
            father += 1
        }
        return listsOrder
    },

    listToArrayListId (lists) {
        let flat = []
        for (let l of lists) {
            flat.push({ listId: l.listId })
        }
        return flat
    },

    cardToArrayCardId (cards) {
        let flat = []
        for (let c of cards) {
            flat.push({ cardId: c.cardId })
        }
        return flat
    }
};

module.exports = methods;