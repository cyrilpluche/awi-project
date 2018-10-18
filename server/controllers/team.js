require('dotenv').load();
var Sequelize = require('sequelize');
//var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, { dialect: 'postgres', logging: false });
const sequelize = new Sequelize('prello', 'postgres', 'postgres', {
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
        return Team
            .findAll()
            .then(teams => res.status(201).send(teams))
            .catch(error => res.status(400).send(error));
    }
}