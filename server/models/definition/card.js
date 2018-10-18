/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Card', {
        cardId: {
            type: DataTypes.INTEGER,
            field: 'card_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cardTitle: {
            type: DataTypes.STRING(250),
            field: 'card_title',
            allowNull: false
        },
        cardDescription: {
            type: DataTypes.STRING(500),
            field: 'card_description',
            allowNull: true
        },
        cardStatus: {
            type: DataTypes.INTEGER,
            field: 'card_status',
            allowNull: false
        },
        cardDateTarget: {
            type: DataTypes.DATEONLY,
            field: 'card_date_target',
            allowNull: true
        },
        cardDateEnd: {
            type: DataTypes.DATEONLY,
            field: 'card_date_end',
            allowNull: true
        },
        listId: {
            type: DataTypes.INTEGER,
            field: 'list_id',
            allowNull: false,
            references: {
                model: 'list',
                key: 'list_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        cardIdIsthefather: {
            type: DataTypes.INTEGER,
            field: 'card_id_isthefather',
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
        tableName: 'card',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Card = model.Card;
    const Actiononcard = model.Actiononcard;
    const Attachment = model.Attachment;
    const Cardhaslabel = model.Cardhaslabel;
    const Task = model.Task;
    const List = model.List;
    const Action = model.Action;
    const Label = model.Label;

    Card.hasMany(Actiononcard, {
        as: 'ActiononcardCard1Fks',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.hasMany(Attachment, {
        as: 'AttachmentCard0Fks',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.hasMany(Card, {
        as: 'Card1Fks',
        foreignKey: 'card_id_isthefather',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.hasMany(Cardhaslabel, {
        as: 'HaslabelCard0Fks',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.hasMany(Task, {
        as: 'TaskCard0Fks',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.belongsTo(Card, {
        as: 'RelatedCardIdIsthefather',
        foreignKey: 'card_id_isthefather',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.belongsTo(List, {
        as: 'List',
        foreignKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.belongsToMany(Action, {
        as: 'ActiononcardActions',
        through: Actiononcard,
        foreignKey: 'card_id',
        otherKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.belongsToMany(List, {
        as: 'CardLists',
        through: Card,
        foreignKey: 'card_id_isthefather',
        otherKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.belongsToMany(Label, {
        as: 'CardhaslabelLabels',
        through: Cardhaslabel,
        foreignKey: 'card_id',
        otherKey: 'label_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
