/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Permission', {
        permissionId: {
            type: DataTypes.INTEGER,
            field: 'permission_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        permissionTitle: {
            type: DataTypes.STRING(250),
            field: 'permission_title',
            allowNull: false
        },
        permissionDescription: {
            type: DataTypes.STRING(500),
            field: 'permission_description',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'permission',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Permission = model.Permission;
    const Memberhaspermissionproject = model.Memberhaspermissionproject;
    const Memberhaspermissionteam = model.Memberhaspermissionteam;
    const Member = model.Member;
    const Project = model.Project;
    const Team = model.Team;

    Permission.hasMany(Memberhaspermissionproject, {
        as: 'MemberhaspermissionprojectPermission0Fks',
        foreignKey: 'permission_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Permission.hasMany(Memberhaspermissionteam, {
        as: 'MemberhaspermissionteamPermission1Fks',
        foreignKey: 'permission_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Permission.belongsToMany(Member, {
        as: 'MemberhaspermissionprojectMembers',
        through: Memberhaspermissionproject,
        foreignKey: 'permission_id',
        otherKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Permission.belongsToMany(Project, {
        as: 'MemberhaspermissionprojectProjects',
        through: Memberhaspermissionproject,
        foreignKey: 'permission_id',
        otherKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Permission.belongsToMany(Member, {
        as: 'MemberhaspermissionteamMembers',
        through: Memberhaspermissionteam,
        foreignKey: 'permission_id',
        otherKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Permission.belongsToMany(Team, {
        as: 'MemberhaspermissionteamTeams',
        through: Memberhaspermissionteam,
        foreignKey: 'permission_id',
        otherKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
