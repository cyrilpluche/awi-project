/*var Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: false
})

var Team = require('../models/index.js').init(sequelize).Team;*/

var Team = require('../config/db_connection').Team;
var sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* ================= CRUD ================= */

    /*  localhost:4200/api/team/create
     *
     *  req.body = {
     *      teamName = name
     *  }
     *
     *  return: The Team object.
     */
    create(req, res, next) {
        Team
            .create(req.body)
            .then(team => res.status(201).send(team))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/team/find_all
     *
     *  return: Array of team objects.
     */
    findAll(req, res, next) {
        Team
            .findAll({ order : sequelize.col('teamId')})
            .then(teams => res.status(201).send(teams))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/team/find_one/2
     *
     *  return: Team object with the given id.
     */
    findOne(req, res, next) {
        Team
            .findOne({
                where: {
                    teamId : req.params.id
                }
            })
            .then(team => res.status(201).send(team))
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
        Team
            .update(req.body, {
                where: { teamId: req.params.id }
            })
            .then(isUpdated => {
                res.status(201).send(isUpdated[0] === 1)
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/member/delete/5
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Team
            .destroy({
                where: {
                    teamId: req.params.id
                }
            })
            .then(isDeleted => res.status(201).send(isDeleted === 1))
            .catch(error => res.status(400).send(error));
    }
}