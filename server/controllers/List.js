var List = require('../config/db_connection').List;
var sequelize = require('../config/db_connection').sequelize;
var Sequelize = require('../config/db_connection').Sequelize;

module.exports = {

    /* =================

    /*  localhost:4200/api/list/create
     *
     *  req.body = {
     *      listTitle: String,
     *      listStatus: Int,
     *      projectId: Int,
     *      listIdIsTheFather: Int, (optional),
     *      listIdIsTheChild: Int, (optional)
     *  }
     *
     *  return: New List object.
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

    /*  localhost:4200/api/list/find_all --- ?listTitle=title... (optional)
     *
     *  return: Array of List objects with given attributes.
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

    /*  localhost:4200/api/card/find_all_searchbar?str=customStr. (optional)
     *
     *  return: Array of Cards objects with given attributes.
     */
    findAllSearchbar(req, res, next) {
        List
            .findAll({
                attributes: [['list_id', 'id'], ['list_title', 'label']],
                order : sequelize.col('list_id'),
                where: {
                    listTitle: { [Sequelize.Op.like]: '%' + req.query.str + '%'}
                }
            })
            .then(lists => {
                req.body.result = lists
                next()
            })
            .catch(error => res.status(400).send(error));
    },

     /*  localhost:4200/api/list/find_all/:id
     *
     *  return: Array of List objects with given attributes.
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


    /*  localhost:4200/api/list/find_one --- ?listTitle=title... (optional)
     *
     *  return: List object with given attributes.
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

    /*  localhost:4200/api/list/update/:id
     *
     *  req.body = {
     *      listTitle: String, (optional)
     *      listStatus: Int, (optional)
     *      projectId: Int, (optional)
     *      listIdIsTheFather: Int, (optional),
     *      listIdIsTheChild: Int, (optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
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

    /*  localhost:4200/api/list/delete/:id
     *
     *  return: A boolean. true = deleted, false = no deleted.
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