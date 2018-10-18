require('dotenv').load();
var Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
})

var Team = require('../models/index.js').init(sequelize).Team;

module.exports = {
    create(req, res) {
        return Team
            .create(req.body)
            .then(team => res.status(201).send(team))
            .catch(error => res.status(400).send(error));
    },

    findAll(req, res) {
        console.log(process.env.DB_HOSTNAME)
        return Team
            .findAll()
            .then(teams => res.status(201).send(teams))
            .catch(error => res.status(400).send(error));
    }
}