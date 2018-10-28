var Action = require('../config/db_connection').Action;
var sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* =================

    /*  localhost:4200/api/action/create
     *
     *  req.body = {
     *      actionType: Int,
     *      actionTitle: String,
     *      actionDescription: String
     *  }
     *
     *  return: New Action object.
     */
    create(req, res, next) {
        Action
            .create(req.body)
            .then(action => {
                req.body.result = action
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/action/find_all --- ?actionTitle=title... (optional)
     *
     *  return: Array of Action objects with given attributes.
     */
    findAll(req, res, next) {
        Action
            .findAll({
                order : sequelize.col('actionId'),
                where: req.query
            })
            .then(actions => {
                req.body.result = actions
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/action/find_one --- ?actionTitle=title... (optional)
     *
     *  return: Action object with given attributes.
     */
    findOne(req, res, next) {
        Action
            .findOne({ where: req.query })
            .then(action => {
                req.body.result = action
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/action/update/:id
     *
     *  req.body = {
     *      actionType: Int, (optional)
     *      actionTitle: String, (optional
     *      actionDescription: String (optional),
     *      memberId: Int (optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        Action
            .update(req.body, {
                where: { actionId: req.params.id }
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/action/delete/:id
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Action
            .destroy({
                where: {
                    actionId: req.params.id
                }
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error))
    }
}