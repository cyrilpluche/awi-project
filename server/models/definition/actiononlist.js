/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Actiononlist', {
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
        listId: {
            type: DataTypes.INTEGER,
            field: 'list_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'list',
                key: 'list_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'public',
        tableName: 'actiononlist',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Actiononlist = model.Actiononlist;
    const Action = model.Action;
    const List = model.List;

    Actiononlist.belongsTo(Action, {
        as: 'Action',
        foreignKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Actiononlist.belongsTo(List, {
        as: 'List',
        foreignKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
