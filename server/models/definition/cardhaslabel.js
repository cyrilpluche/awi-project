/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Cardhaslabel', {
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
        },
        labelId: {
            type: DataTypes.INTEGER,
            field: 'label_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'label',
                key: 'label_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'public',
        tableName: 'cardhaslabel',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Cardhaslabel = model.Cardhaslabel;
    const Card = model.Card;
    const Label = model.Label;

    Cardhaslabel.belongsTo(Card, {
        as: 'Card',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Cardhaslabel.belongsTo(Label, {
        as: 'Label',
        foreignKey: 'label_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
