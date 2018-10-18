require('dotenv').load();
var Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: false
})

var Member = require('../models/index.js').init(sequelize).Member;

module.exports = {

    /* =================

    /*  localhost:4200/api/member/create
     *
     *  req.body = {
     *      memberFirstname = firstname,
     *      memberLastname = lastname,
     *      memberPseudo = pseudo,
     *      memberEmail = email,
     *      memberPassword = password,
     *      memberPicture = url, (optional)
     *      memberStatus = status,
     *      memberOauthGithub = url (optional)
     *  }
     *
     *  return: Array with the Member object (size = 1).
     */
    create(req, res, next) {
        return Member
            .create(req.body)
            .then(member => res.status(201).send([member]))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/team/find_all
     *
     *  return: Array of team objects.
     */
    findAll(req, res, next) {
        return Team
            .findAll({ order : sequelize.col('teamId')})
            .then(teams => res.status(201).send(teams))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/team/find_one/2
     *
     *  return: Array with the team object (size = 1).
     */
    findOne(req, res, next) {
        return Team
            .findOne({
                where: {
                    teamId : req.params.id
                }
            })
            .then(teams => res.status(201).send([teams]))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/team/update/2
     *
     *  req.body = {
     *      teamName = name
     *  }
     *
     *  return: Array with a boolean. 1 = Updated, 0 = Not updated (size = 1).
     *
     *  Warning: If the id don't match, status 201 is returned with boolean = 0.
     */
    update(req, res, next) {
        return Team
            .update(req.body, {
                where: { teamId: req.params.id }
            })
            .then(isUpdated => {
                res.status(201).send(isUpdated)
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/delete/5
     *
     *  return: Array with a boolean. 1 = Updated, 0 = Not updated (size = 1).
     *
     *  Warning: If the id don't match, status 201 is returned with boolean = 0.
     */
    delete(req, res, next) {
        return Team
            .destroy({
                where: {
                    teamId: req.params.id
                }
            })
            .then(team => res.status(201).send([team]))
            .catch(error => res.status(400).send(error));
    }
}