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
        actionTitle: {
            type: DataTypes.STRING(50),
            field: 'action_title',
            allowNull: false
        },
        actionDescription: {
            type: DataTypes.STRING(250),
            field: 'action_description',
            allowNull: false
        },
        actionDateCreation: {
            type: DataTypes.DATEONLY,
            field: 'action_date_creation',
            allowNull: false
        },
        cardId: {
            type: DataTypes.INTEGER,
            field: 'card_id',
            allowNull: true,
            references: {
                model: 'card',
                key: 'card_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        listId: {
            type: DataTypes.INTEGER,
            field: 'list_id',
            allowNull: true,
            references: {
                model: 'list',
                key: 'list_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        projectId: {
            type: DataTypes.INTEGER,
            field: 'project_id',
            allowNull: true,
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
            allowNull: true,
            references: {
                model: 'team',
                key: 'team_id'
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
    const Memberhasaction = model.Memberhasaction;
    const Card = model.Card;
    const List = model.List;
    const Project = model.Project;
    const Team = model.Team;
    const Member = model.Member;

    Action.hasMany(Memberhasaction, {
        as: 'MemberhasactionActionFks',
        foreignKey: 'action_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Action.belongsTo(Card, {
        as: 'Card',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.belongsTo(List, {
        as: 'List',
        foreignKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.belongsTo(Project, {
        as: 'Project',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Action.belongsTo(Team, {
        as: 'Team',
        foreignKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Action.belongsToMany(Member, {
        as: 'MemberhasactionMembers',
        through: Memberhasaction,
        foreignKey: 'action_id',
        otherKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
