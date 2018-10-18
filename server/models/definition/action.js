/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Action', {
        actionId: {
            type: DataTypes.INTEGER,
            field: 'action_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        actionType: {
            type: DataTypes.INTEGER,
            field: 'action_type',
            allowNull: false
        },
        actionDescription: {
            type: DataTypes.STRING(250),
            field: 'action_description',
            allowNull: false
        },
        memberId: {
            type: DataTypes.INTEGER,
            field: 'member_id',
            allowNull: false,
            references: {
                model: 'member',
                key: 'member_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'public',
        tableName: 'action',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Action = model.Action;
    const Actiononcard = model.Actiononcard;
    const Actiononlist = model.Actiononlist;
    const Actiononproject = model.Actiononproject;
    const Actiononteam = model.Actiononteam;
    const Member = model.Member;
    const Card = model.Card;
    const List = model.List;
    const Project = model.Project;
    const Team = model.Team;

    Action.hasMany(Actiononcard, {
        as: 'OncardAction0Fks',
        foreignKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.hasMany(Actiononlist, {
        as: 'OnlistAction0Fks',
        foreignKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.hasMany(Actiononproject, {
        as: 'OnprojectAction0Fks',
        foreignKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.hasMany(Actiononteam, {
        as: 'OnteamAction0Fks',
        foreignKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.belongsTo(Member, {
        as: 'Member',
        foreignKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.belongsToMany(Card, {
        as: 'ActiononcardCards',
        through: Actiononcard,
        foreignKey: 'action_id',
        otherKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.belongsToMany(List, {
        as: 'ActiononlistLists',
        through: Actiononlist,
        foreignKey: 'action_id',
        otherKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.belongsToMany(Project, {
        as: 'ActiononprojectProjects',
        through: Actiononproject,
        foreignKey: 'action_id',
        otherKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.belongsToMany(Team, {
        as: 'ActiononteamTeams',
        through: Actiononteam,
        foreignKey: 'action_id',
        otherKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
