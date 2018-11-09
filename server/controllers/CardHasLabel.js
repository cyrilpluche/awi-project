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