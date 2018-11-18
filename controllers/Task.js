const MemberHasAction = require('../config/db_connection').MemberHasAction
const sequelize = require('../config/db_connection').sequelize;

const Task = require('../config/db_connection').Task

module.exports = {

    /* ================= Task CONTROLLER ================= */


    /**
     * @typedef Task
     * @property {integer} taskId.required
     * @property {string} taskTitle
     * @property {boolean} chtState
     * @property {integer} cardId
     *
     */

    /**
     * This function create a new Task.
     * @route POST /api/task/create
     * @group Task - Operations about task.
     * @param {string} taskTitle
     * @param {boolean} chtState
     * @param {integer} cardId
     * @returns {Task.model} 200 - A new Task created.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find all the tasks matching.
     * @route GET /api/task/find_all
     * @group Task - Operations about task.
     * @param {string} taskTitle
     * @param {integer} cardId
     * @returns {Array.<Task>} 200 - All the Tasks matching.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function the first task found.
     * @route GET /api/task/find_one
     * @group Task - Operations about task.
     * @param {string} taskTitle
     * @param {integer} cardId
     * @returns {Task.model} 200 - The task found.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /*  ?cardId=id... (optional)
     *
     *  req.body = {
     *      taskTitle: String,
     *      chtState: Boolean,
     *      cardId: INT,
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */

    /**
     * This function update a task.
     * @route PUT /api/task/update
     * @group Task - Operations about task.
     * @param {string} taskTitle
     * @param {integer} taskId
     * @param {string} taskTitle.body.optional
     * @param {boolean} chtState.body.optional
     * @param {integer} cardId.body.optional
     * @returns {boolean} 200 - Boolean, true if the task was updated.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /*  ?cardId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    /**
     * This function delete a task.
     * @route DELETE /api/task/delete
     * @group Task - Operations about task.
     * @param {integer} taskId
     * @param {integer} cardId.body.optional
     * @returns {boolean} 200 - Boolean, true if the task was updated.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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