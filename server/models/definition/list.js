/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('List', {
        listId: {
            type: DataTypes.INTEGER,
            field: 'list_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        listTitle: {
            type: DataTypes.STRING(250),
            field: 'list_title',
            allowNull: false
        },
        listStatus: {
            type: DataTypes.INTEGER,
            field: 'list_status',
            allowNull: false
        },
        listFather: {
            type: DataTypes.INTEGER,
            field: 'list_father',
            allowNull: true
        },
        listChild: {
            type: DataTypes.INTEGER,
            field: 'list_child',
            allowNull: true
        },
        projectId: {
            type: DataTypes.INTEGER,
            field: 'project_id',
            allowNull: false,
            references: {
                model: 'project',
                key: 'project_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'CASCADE'
        }
    }, {
        schema: 'public',
        tableName: 'list',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const List = model.List;
    const Action = model.Action;
    const Card = model.Card;
    const Project = model.Project;
    const Team = model.Team;

    List.hasMany(Action, {
        as: 'ActionList0Fks',
        foreignKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.hasMany(Card, {
        as: 'CardListFks',
        foreignKey: 'list_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    List.belongsTo(Project, {
        as: 'Project',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    List.belongsToMany(Card, {
        as: 'ActionCards',
        through: Action,
        foreignKey: 'list_id',
        otherKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.belongsToMany(Project, {
        as: 'ActionProjects',
        through: Action,
        foreignKey: 'list_id',
        otherKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.belongsToMany(Team, {
        as: 'ActionTeams',
        through: Action,
        foreignKey: 'list_id',
        otherKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
