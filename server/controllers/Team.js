/*const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: false
})

const Team = require('../models/Dashboard.action.js').init(sequelize).Team;*/
const helper = require('../helpers/helpersMethod');
const Team = require('../config/db_connection').Team;
const Teamhasmember = require('../config/db_connection').Teamhasmember
const sequelize = require('../config/db_connection').sequelize;

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
            .then(team => {
                req.body.result = team
                next()
            })
            .catch(error => next(error))
    },

    /*  localhost:4200/api/team/find_all --- ?teamName=name... (optional)
     *
     *  return: Array of team objects with given attributes.
     */
    findAll(req, res, next) {
        Team
            .findAll({
                order : sequelize.col('teamId'),
                where: req.query
            })
            .then(teams => {
                req.body.result = teams
                next()
            })
            .catch(error => next(error));
    },

    findAllTeamMember (req, res, next) {
        Teamhasmember.findAll({
            where: {member_id: req.params.member},
            include: [
                {
                    model: Team,
                    as: 'Team'

                }
            ]
        })
            .then(result => {
                let teams = [];

                for (let i = 0; i < result.length; i++){
                    teams.push(
                        helper.flatTeams(result[i])
                    )
                }
                res.send(teams)
            })
    },


    /*  localhost:4200/api/team/find_one --- ?teamName=name... (optional)
     *
     *  return: Team object with given attributes.
     */
    findOne(req, res, next) {
        Team
            .findOne({ where: req.query })
            .then(team => {
                req.body.result = team
                next()
            })
            .catch(error => next(error));
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
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => next(error))
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
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error));
    }
}