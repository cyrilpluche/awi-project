/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Memberhascard', {
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
            onDelete: 'CASCADE'
        },
        memberId: {
            type: DataTypes.INTEGER,
            field: 'member_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'member',
                key: 'member_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'CASCADE'
        }
    }, {
        schema: 'public',
        tableName: 'memberhascard',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Memberhascard = model.Memberhascard;
    const Card = model.Card;
    const Member = model.Member;

    Memberhascard.belongsTo(Card, {
        as: 'Card',
        foreignKey: 'card_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Memberhascard.belongsTo(Member, {
        as: 'Member',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
