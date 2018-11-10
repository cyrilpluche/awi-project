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
    const Action = model.Action;
    const Memberhaspermissionteam = model.Memberhaspermissionteam;
    const Teamhasmember = model.Teamhasmember;
    const Teamhasproject = model.Teamhasproject;
    const Card = model.Card;
    const List = model.List;
    const Project = model.Project;
    const Member = model.Member;
    const Permission = model.Permission;

    Team.hasMany(Action, {
        as: 'ActionTeam2Fks',
        foreignKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.hasMany(Memberhaspermissionteam, {
        as: 'MemberhaspermissionteamTeamFks',
        foreignKey: 'team_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Team.hasMany(Teamhasmember, {
        as: 'HasmemberTeamFks',
        foreignKey: 'team_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Team.hasMany(Teamhasproject, {
        as: 'HasprojectTeam0Fks',
        foreignKey: 'team_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Card, {
        as: 'ActionCards',
        through: Action,
        foreignKey: 'team_id',
        otherKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(List, {
        as: 'ActionLists',
        through: Action,
        foreignKey: 'team_id',
        otherKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Project, {
        as: 'ActionProjects',
        through: Action,
        foreignKey: 'team_id',
        otherKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Member, {
        as: 'MemberhaspermissionteamMembers',
        through: Memberhaspermissionteam,
        foreignKey: 'team_id',
        otherKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Permission, {
        as: 'MemberhaspermissionteamPermissions',
        through: Memberhaspermissionteam,
        foreignKey: 'team_id',
        otherKey: 'permission_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Member, {
        as: 'TeamhasmemberMembers',
        through: Teamhasmember,
        foreignKey: 'team_id',
        otherKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Team.belongsToMany(Project, {
        as: 'TeamhasprojectProjects',
        through: Teamhasproject,
        foreignKey: 'team_id',
        otherKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
