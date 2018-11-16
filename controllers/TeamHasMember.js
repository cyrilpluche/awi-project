const helper = require('../helpers/helpersMethod');
const Team = require('../config/db_connection').Team;
const Teamhasmember = require('../config/db_connection').Teamhasmember
const sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      teamId: INT,
     *      memberId: INT,
     *      teamStatus: INT
     *  }
     *
     *  return: The TeamHasMember object.
     */
    create(req, res, next) {
        Teamhasmember
            .create(req.body)
            .then(thm => {
                req.body.result = thm
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /*  localhost:4200/api/team/find_all --- ?teamName=name... (optional)
     *
     *  return: Array of team objects with given attributes.
     */
    findAll(req, res, next) {
        Teamhasmember
            .findAll({
                order : sequelize.col('teamId'),
                where: req.query
            })
            .then(thms => {
                req.body.result = thms
                next()
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/team/find_one --- ?teamName=name... (optional)
     *
     *  return: Team object with given attributes.
     */
    findOne(req, res, next) {
        Teamhasmember
            .findOne({ where: req.query })
            .then(thm => {
                req.body.result = thm
                next()
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/team/update/2
     *
     *  req.body = {
     *      teamName = name
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        Teamhasmember
            .update(req.body, {
                where: { teamId: req.params.id }
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /*  localhost:4200/api/member/delete/5
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Teamhasmember
            .destroy({
                where: {
                    teamId: req.params.id
                }
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => res.status(400).send(error));
    }
}