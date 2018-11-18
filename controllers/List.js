const helper = require('../helpers/helpersMethod');
var List = require('../config/db_connection').List;
var sequelize = require('../config/db_connection').sequelize;
var Sequelize = require('../config/db_connection').Sequelize;
const MemberHasProject = require('../config/db_connection').MemberHasProject
const Project = require('../config/db_connection').Project

module.exports = {

    /* ================= LIST CONTROLLER =============== */

    /**
     * @typedef List
     * @property {integer} listId.required
     * @property {string} listTitle.optional
     * @property {integer} projectId.optional
     * @property {integer} cardIdIsTheFather.optional
     * @property {integer} listIdIsTheFather.optional
     * @property {integer} listIdIsTheChild.optional
     */

    /**
     * This function create a new list.
     * @route POST /api/list/create
     * @group List - Operations about lists.
     * @param {string} listTitle.optional
     * @param {integer} projectId.optional
     * @param {integer} cardIdIsTheFather.optional
     * @param {integer} listIdIsTheFather.optional
     * @param {integer} listIdIsTheChild.optional
     * @returns {List.model} 200 - New card object
     * @returns {Error}  500 - error
     *
     */
    create(req, res, next) {
        List
            .create(req.body)
            .then(list => {
                req.body.result = list
                next()
            })
            .catch(error => next(error))
    },

    /**
     * This function find all the lists matching.
     * @route GET /api/list/find_all
     * @group List - Operations about lists.
     * @param {string} listTitle.optional
     * @param {integer} projectId.optional
     * @param {integer} cardIdIsTheFather.optional
     * @param {integer} listIdIsTheFather.optional
     * @param {integer} listIdIsTheChild.optional
     * @returns {<Array.Action>} 200 - All the list matching.
     * @returns {Error}  500 - error
     *
     */
    findAll(req, res, next) {
        List
            .findAll({
                order : sequelize.col('listId'),
                where: req.query
            })
            .then(lists => {
                req.body.result = lists
                next()
            })
            .catch(error => next(error))
    },

    /**
     * This function find all the lists matching the keywords.
     * @route GET /api/list/find_all_searchbar
     * @group List - Operations about lists.
     * @param {string} str - The keyword
     * @returns {<Array.Action>} 200 - All the list matching the keywords.
     * @returns {Error}  500 - error
     *
     */
    findAllSearchbar(req, res, next) {
        MemberHasProject
            .findAll({
                order : sequelize.col('project_id'),
                where: {
                    memberId: req.query.memberId
                },
                include: [{
                    model: Project,
                    as: 'Project',
                    attributes: [['project_id', 'id'], ['project_title', 'label']],
                    include: [{
                        model: List,
                        as: 'ListProjectFks',
                        attributes: [['list_id', 'id'], ['list_title', 'label']],
                        where: {
                            listTitle: {
                                [Sequelize.Op.or]: [
                                    { [Sequelize.Op.like]: '%' + req.query.str + '%' },
                                    { [Sequelize.Op.like]: '%' + req.query.str.charAt(0).toUpperCase() + req.query.str.slice(1) + '%' }
                                ]
                            },
                            listStatus: 0
                        }
                    }]
                }]
            })
            .then(lists => {
                req.body.result = helper.flatSearchList(lists)
                next()
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     * This function find all the lists for a project.
     * @route GET /api/list/find_all/:id
     * @group List - Operations about lists.
     * @returns {<Array.Action>} 200 - All the list for a project.
     * @returns {Error}  500 - error
     *
     */
    findAllOfProject(req, res, next) {
        List
            .findAll({
                order : sequelize.col('listId'),
                where: { projectId: req.params.id }
            })
            .then(lists => {
                req.body.result = lists
                next()
            })
            .catch(error => next(error))
    },

    /**
     * This function find the first list matching.
     * @route GET /api/list/find_one
     * @group List - Operations about lists.
     * @param {string} listTitle.optional
     * @param {integer} projectId.optional
     * @param {integer} cardIdIsTheFather.optional
     * @param {integer} listIdIsTheFather.optional
     * @param {integer} listIdIsTheChild.optional
     * @returns {<Array.Action>} 200 - The first list matching.
     * @returns {Error}  500 - error
     *
     */
    findOne(req, res, next) {
        List
            .findOne({ where: req.query })
            .then(list => {
                req.body.result = list
                next()
            })
            .catch(error => next(error))
    },

    /**
     * This function update a list.
     * @route PUT /api/list/update/:id
     * @group List - Operations about lists.
     * @param {string} listTitle.optional
     * @param {integer} projectId.optional
     * @param {integer} cardIdIsTheFather.optional
     * @param {integer} listIdIsTheFather.optional
     * @param {integer} listIdIsTheChild.optional
     * @returns {boolean} 200 - Boolean, true if the list was updated.
     * @returns {Error}  500 - error
     *
     */
    update(req, res, next) {
        List
            .update(req.body, {
                where: { listId: req.params.id }
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => next(error))
    },

    /**
     * This function update the order of the lists contained in the array.
     * @route PUT /api/list/update_list_order
     * @group List - Operations about lists.
     * @param {Array.<List>} lists.body
     * @returns {Error}  500 - error
     *
     */
    updateFromArray(req, res, next) {
        for (let list of req.body.lists) {
            List
                .update({listFather: list.listFather}, {
                    where: { listId: list.listId }
                })
                .then(isUpdated => {

                    if (req.body.lists.indexOf(list) === req.body.lists.length - 1) next()
                })
                .catch(error => next(error))
        }
    },

    /*  localhost:4200/api/list/delete/:id
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    /**
     * This function delete a list.
     * @route DELETE /api/list/delete/:id
     * @group List - Operations about lists.
     * @returns {boolean} 200 - Boolean, true if the list was deleted.
     * @returns {Error}  500 - error
     *
     */
    delete(req, res, next) {
        List
            .destroy({
                where: {
                    listId: req.params.id
                }
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error))
    }
}