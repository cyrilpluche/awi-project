/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Team', {
        teamId: {
            type: DataTypes.INTEGER,
            field: 'team_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        teamName: {
            type: DataTypes.STRING(250),
            field: 'team_name',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'team',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Team = model.Team;
    const Actiononteam = model.Actiononteam;
    const Memberhaspermissionteam = model.Memberhaspermissionteam;
    const Teamhasmember = model.Teamhasmember;
    const Teamhasproject = model.Teamhasproject;
    const Action = model.Action;
    const Member = model.Member;
    const Permission = model.Permission;
    const Project = model.Project;

    Team.hasMany(Actiononteam, {
        as: 'ActiononteamTeam1Fks',
        foreignKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.hasMany(Memberhaspermissionteam, {
        as: 'MemberhaspermissionteamTeam0Fks',
        foreignKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.hasMany(Teamhasmember, {
        as: 'HasmemberTeam0Fks',
        foreignKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.hasMany(Teamhasproject, {
        as: 'HasprojectTeam1Fks',
        foreignKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Action, {
        as: 'ActiononteamActions',
        through: Actiononteam,
        foreignKey: 'team_id',
        otherKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Member, {
        as: 'MemberhaspermissionteamMembers',
        through: Memberhaspermissionteam,
        foreignKey: 'team_id',
        otherKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Permission, {
        as: 'MemberhaspermissionteamPermissions',
        through: Memberhaspermissionteam,
        foreignKey: 'team_id',
        otherKey: 'permission_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Member, {
        as: 'TeamhasmemberMembers',
        through: Teamhasmember,
        foreignKey: 'team_id',
        otherKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Project, {
        as: 'TeamhasprojectProjects',
        through: Teamhasproject,
        foreignKey: 'team_id',
        otherKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
