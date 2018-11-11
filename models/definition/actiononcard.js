/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Actiononcard', {
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
        cardId: {
            type: DataTypes.INTEGER,
            field: 'card_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'card',
                key: 'card_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'public',
        tableName: 'actiononcard',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Actiononcard = model.Actiononcard;
    const Action = model.Action;
    const Card = model.Card;

    Actiononcard.belongsTo(Action, {
        as: 'Action',
        foreignKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Actiononcard.belongsTo(Card, {
        as: 'Card',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
