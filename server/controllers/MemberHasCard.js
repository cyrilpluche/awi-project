const MemberHasCard = require('../config/db_connection').MemberHasCard
const sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      cardId: INT,
     *      memberId: INT
     *  }
     *
     *  return: The MHC object.
     */
    create(req, res, next) {
        MemberHasCard
            .create(req.body)
            .then(mhc => {
                req.body.result = mhc
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  return: Array of MHC objects with given attributes of the query.
     */
    findAll(req, res, next) {
        MemberHasCard
            .findAll({
                order : sequelize.col('taskId'),
                where: req.query,
                include: [{ all: true }]
            })
            .then(mhcs => {
                req.body.result = mhcs
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  return: MHC object with given attributes of the query.
     */
    findOne(req, res, next) {
        MemberHasCard
            .findOne({
                where: req.query,
                include: [{ all: true }]
            })
            .then(mhc => {
                req.body.result = mhc
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  req.body = {
     *      cardId: INT, (optional)
     *      memberId: INT (optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        MemberHasCard
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
        MemberHasCard
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