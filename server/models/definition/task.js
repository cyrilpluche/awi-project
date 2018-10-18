/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Task', {
        taskId: {
            type: DataTypes.INTEGER,
            field: 'task_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        taskTitle: {
            type: DataTypes.STRING(250),
            field: 'task_title',
            allowNull: false
        },
        chtState: {
            type: DataTypes.BOOLEAN,
            field: 'cht_state',
            allowNull: false
        },
        cardId: {
            type: DataTypes.INTEGER,
            field: 'card_id',
            allowNull: false,
            references: {
                model: 'card',
                key: 'card_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'public',
        tableName: 'task',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Task = model.Task;
    const Card = model.Card;

    Task.belongsTo(Card, {
        as: 'Card',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
