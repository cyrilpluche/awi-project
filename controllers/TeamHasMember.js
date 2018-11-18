const helper = require('../helpers/helpersMethod');
const Team = require('../config/db_connection').Team;
const Teamhasmember = require('../config/db_connection').Teamhasmember
const sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* ================= TeamHasMember CONTROLLER ================= */

    /**
     * @typedef TeamHasMember
     * @property {integer} teamHasMember.required
     * @property {integer} teamId.required
     * @property {integer} memberId.required
     * @property {integer} teamStatus.required
     *
     */

    /**
     * This function create a new TeamHasMember.
     * @route POST /api/team/create_thm
     * @group Team - Operations about team.
     * @param {integer} teamId.required
     * @param {integer} memberId.required
     * @property {integer} teamStatus
     * @returns {TeamHasMember.model} 200 - A new TeamHasMember created.
     * @returns {Error}  500 - error
     *
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