/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Attachment', {
        attachmentId: {
            type: DataTypes.INTEGER,
            field: 'attachment_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        attachmentName: {
            type: DataTypes.STRING(250),
            field: 'attachment_name',
            allowNull: true
        },
        attachmentUrl: {
            type: DataTypes.STRING(250),
            field: 'attachment_url',
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
        tableName: 'attachment',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Attachment = model.Attachment;
    const Card = model.Card;

    Attachment.belongsTo(Card, {
        as: 'Card',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
