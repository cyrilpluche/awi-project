const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
        ssl: true
    }
})

sequelize
    .authenticate()
    .then(() => {
        console.log('\x1b[32m', 'Connection has been established successfully.\n', '\x1b[0m');
    })
    .catch(err => {
        console.error('Unable to connect to the database:\n', err);
    });

const models = require('../models/index.js').init(sequelize)

module.exports = {
    sequelize,
    Sequelize,
    Team: models.Team,
    Member: models.Member,
    Project: models.Project,
    Permission: models.Permission,
    List: models.List,
    Card: models.Card,
    Cardhaslabel: models.Cardhaslabel,
    Action: models.Action,
    Task: models.Task,
    Attachment: models.Attachment,
    MemberHasProject: models.Memberhasproject,
    MemberHasCard: models.Memberhascard,
    MemberHasAction: models.Memberhasaction,
    MemberHasPermissionProject: models.Memberhaspermissionproject,
    Teamhasmember: models.Teamhasmember,
    Label: models.Label

};