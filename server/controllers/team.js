require('dotenv').load();
var Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: false
})

var Team = require('../models/index.js').init(sequelize).Team;

module.exports = {

    /*  localhost:4200/api/team/create
     *
     *  req.body = {
     *      teamName = name
     *  }
     */
    create(req, res) {
        return Team
            .create(req.body)
            .then(team => res.status(201).send(team))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/team/find_all */
    findAll(req, res) {
        return Team
            .findAll({ order : sequelize.col('teamId')})
            .then(teams => res.status(201).send(teams))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/team/update/2
     *
     *  req.body = {
     *      teamName = name
     *  }
     */
    update(req, res) {
        console.log(req.params.id)
        return Team
            .update(req.body, {
                where: { teamId: req.params.id }
            })
            .then(isUpdated => {
                res.status(201).send(isUpdated)
            })
            .catch(error => res.status(400).send(error));
    }
}