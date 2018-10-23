var List = require('../config/db_connection').List;
var sequelize = require('../config/db_connection').sequelize;

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
            .then(list => res.status(201).send(list))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/list/find_all
     *
     *  return: Array of List objects.
     */
    findAll(req, res, next) {
        List
            .findAll({ order : sequelize.col('listId')})
            .then(lists => res.status(201).send(lists))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/list/find_one/:id
     *
     *  return: List object with the given id.
     */
    findOne(req, res, next) {
        List
            .findOne({
                where: {
                    listId : req.params.id
                }
            })
            .then(list => res.status(201).send(list))
            .catch(error => res.status(400).send(error));
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
                res.status(201).send(isUpdated[0] === 1)
            })
            .catch(error => res.status(400).send(error));
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
            .then(isDeleted => res.status(201).send(isDeleted === 1))
            .catch(error => res.status(400).send(error));
    }
}