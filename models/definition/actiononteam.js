/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Actiononteam', {
        actionId: {
            type: DataTypes.INTEGER,
            field: 'action_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'action',
                key: 'action_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        teamId: {
            type: DataTypes.INTEGER,
            field: 'team_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'team',
                key: 'team_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'public',
        tableName: 'actiononteam',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Actiononteam = model.Actiononteam;
    const Action = model.Action;
    const Team = model.Team;

    Actiononteam.belongsTo(Action, {
        as: 'Action',
        foreignKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Actiononteam.belongsTo(Team, {
        as: 'Team',
        foreignKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
