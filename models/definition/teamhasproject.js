/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Teamhasproject', {
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
            onDelete: 'CASCADE'
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
            onDelete: 'CASCADE'
        },
        thpStatus: {
            type: DataTypes.INTEGER,
            field: 'thp_status',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'teamhasproject',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Teamhasproject = model.Teamhasproject;
    const Project = model.Project;
    const Team = model.Team;

    Teamhasproject.belongsTo(Project, {
        as: 'Project',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Teamhasproject.belongsTo(Team, {
        as: 'Team',
        foreignKey: 'team_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
