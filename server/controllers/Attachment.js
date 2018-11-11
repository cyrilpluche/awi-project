const MemberHasAction = require('../config/db_connection').MemberHasAction
const sequelize = require('../config/db_connection').sequelize;

const Attachment = require('../config/db_connection').Attachment

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      attachmentName: String,
     *      attachmentUrl: Boolean
     *  }
     *
     *  return: The Attachment object.
     */
    create(req, res, next) {
        Attachment
            .create(req.body)
            .then(attachment => {
                req.body.result = attachment
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?attachmentId=id... (optional)
     *
     *  return: Array of Attachments objects with given attributes of the query.
     */
    findAll(req, res, next) {
        Attachment
            .findAll({
                order : sequelize.col('attachmentId'),
                where: req.query,
                include: [{ all: true }]
            })
            .then(attachments => {
                req.body.result = attachments
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?attachmentId=id... (optional)
     *
     *  return: Attachment object with given attributes of the query.
     */
    findOne(req, res, next) {
        Attachment
            .findOne({
                where: req.query,
                include: [{ all: true }]
            })
            .then(attachment => {
                req.body.result = attachment
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?attachmentId=id... (optional)
     *
     *  req.body = {
     *      attachmentName: String,
     *      attachmentUrl: Boolean
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        Attachment
            .update(req.body, {
                where: req.query
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?attachmentId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Attachment
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