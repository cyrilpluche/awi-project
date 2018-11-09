const sequelize = require('../config/db_connection').sequelize;

const Label = require('../config/db_connection').Label

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      labelColor: Integer,
     *      labelDescription: String,
     *      projectId: INT
     *  }
     *
     *  return: The Label object.
     */
    create(req, res, next) {
        Label
            .create(req.body)
            .then(label => {
                req.body.result = label
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?labelId=id... (optional)
     *
     *  return: Array of Label objects with given attributes of the query.
     */
    findAll(req, res, next) {
        Label
            .findAll({
                order : sequelize.col('labelId'),
                where: req.query
            })
            .then(labels => {
                req.body.result = labels
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?labelId=id... (optional)
     *
     *  return: Label object with given attributes of the query.
     */
    findOne(req, res, next) {
        Label
            .findOne({
                where: req.query
            })
            .then(label => {
                req.body.result = label
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?labelId=id... (optional)
     *
     *  req.body = {
     *      labelColor: Integer,
     *      labelDescription: String
     *      projectId: INT
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        Label
            .update(req.body, {
                where: req.query
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?labelId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Label
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