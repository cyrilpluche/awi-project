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
        projectId: {
            type: DataTypes.INTEGER,
            field: 'project_id',
            allowNull: false,
            references: {
                model: 'project',
                key: 'project_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        listIdIsthefather: {
            type: DataTypes.INTEGER,
            field: 'list_id_isthefather',
            allowNull: false,
            references: {
                model: 'list',
                key: 'list_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
    const Actiononlist = model.Actiononlist;
    const Card = model.Card;
    const Project = model.Project;
    const Action = model.Action;

    List.hasMany(Actiononlist, {
        as: 'ActiononlistList1Fks',
        foreignKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.hasMany(Card, {
        as: 'CardList0Fks',
        foreignKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.hasMany(List, {
        as: 'List1Fks',
        foreignKey: 'list_id_isthefather',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.belongsTo(List, {
        as: 'RelatedListIdIsthefather',
        foreignKey: 'list_id_isthefather',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.belongsTo(Project, {
        as: 'Project',
        foreignKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.belongsToMany(Action, {
        as: 'ActiononlistActions',
        through: Actiononlist,
        foreignKey: 'list_id',
        otherKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.belongsToMany(Card, {
        as: 'CardCardIdIsthefathers',
        through: Card,
        foreignKey: 'list_id',
        otherKey: 'card_id_isthefather',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    List.belongsToMany(Project, {
        as: 'ListProjects',
        through: List,
        foreignKey: 'list_id_isthefather',
        otherKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
