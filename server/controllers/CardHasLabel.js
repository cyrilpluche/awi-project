const CardHasLabel = require('../config/db_connection').Cardhaslabel
const sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      actionId: INT,
     *      memberId: INT,
     *      mhaStatus: INT,
     *  }
     *
     *  return: The object.
     */
    create(req, res, next) {
        CardHasLabel
            .create(req.body)
            .then(Chl => {
                req.body.result = Chl
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?actionId=id... (optional)
     *
     *  return: Array of MHA objects with given attributes of the query.
     */
    findAll(req, res, next) {
        CardHasLabel
            .findAll({
                order : sequelize.col('labelId'),
                where: req.query,
                include: [{ all: true }]
            })
            .then(chls => {
                req.body.result = chls
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?actionId=id... (optional)
     *
     *  req.body = {
     *      actionId: INT,
     *      memberId: INT,
     *      mhaStatus: INT,
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        CardHasLabel
            .update(req.body, {
                where: req.query
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?actionId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        CardHasLabel
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