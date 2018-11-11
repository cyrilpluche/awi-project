/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Actiononproject', {
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
        projectId: {
            type: DataTypes.INTEGER,
            field: 'project_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'project',
                key: 'project_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'public',
        tableName: 'actiononproject',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Actiononproject = model.Actiononproject;
    const Action = model.Action;
    const Project = model.Project;

    Actiononproject.belongsTo(Action, {
        as: 'Action',
        foreignKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Actiononproject.belongsTo(Project, {
        as: 'Project',
        foreignKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
