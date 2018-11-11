const MemberHasAction = require('../config/db_connection').MemberHasAction
const sequelize = require('../config/db_connection').sequelize;

const Task = require('../config/db_connection').Task

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      taskTitle: String,
     *      chtState: Boolean,
     *      cardId: INT,
     *  }
     *
     *  return: The Task object.
     */
    create(req, res, next) {
        Task
            .create(req.body)
            .then(task => {
                req.body.result = task
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  return: Array of Task objects with given attributes of the query.
     */
    findAll(req, res, next) {
        Task
            .findAll({
                order : sequelize.col('taskId'),
                where: req.query,
                include: [{ all: true }]
            })
            .then(tasks => {
                req.body.result = tasks
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  return: Task object with given attributes of the query.
     */
    findOne(req, res, next) {
        Task
            .findOne({
                where: req.query,
                include: [{ all: true }]
            })
            .then(task => {
                req.body.result = task
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  req.body = {
     *      taskTitle: String,
     *      chtState: Boolean,
     *      cardId: INT,
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        Task
            .update(req.body, {
                where: req.query
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Task
            .destroy({
                where: req.query
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    }
}