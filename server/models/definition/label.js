/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Label', {
        labelId: {
            type: DataTypes.INTEGER,
            field: 'label_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        labelColor: {
            type: DataTypes.INTEGER,
            field: 'label_color',
            allowNull: false
        },
        labelDescription: {
            type: DataTypes.STRING(250),
            field: 'label_description',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'label',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Label = model.Label;
    const Cardhaslabel = model.Cardhaslabel;
    const Card = model.Card;

    Label.hasMany(Cardhaslabel, {
        as: 'CardhaslabelLabel1Fks',
        foreignKey: 'label_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Label.belongsToMany(Card, {
        as: 'CardhaslabelCards',
        through: Cardhaslabel,
        foreignKey: 'label_id',
        otherKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
