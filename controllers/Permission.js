const MemberHasAction = require('../config/db_connection').MemberHasAction
const sequelize = require('../config/db_connection').sequelize;

const Permission = require('../config/db_connection').Permission

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      permissionTitle: String,
     *      permissionDescription: Boolean,
     *  }
     *
     *  return: The Permission object.
     */
    create(req, res, next) {
        Permission
            .create(req.body)
            .then(permission => {
                req.body.result = permission
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?permissionId=id... (optional)
     *
     *  return: Array of Permission objects with given attributes of the query.
     */
    findAll(req, res, next) {
        Permission
            .findAll({
                order : sequelize.col('permissionId'),
                where: req.query
            })
            .then(permissions => {
                req.body.result = permissions
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?permissionId=id... (optional)
     *
     *
     *  return: Permission object with given attributes of the query.
     */
    findOne(req, res, next) {
        Permission
            .findOne({
                where: req.query
            })
            .then(permission => {
                req.body.result = permission
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?permissionId=id... (optional)
     *
     *  req.body = {
     *      permissionTitle: String,
     *      permissionDescription: Boolean,
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        Permission
            .update(req.body, {
                where: req.query
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?permissionId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Permission
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