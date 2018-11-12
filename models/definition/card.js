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
        cardFather: {
            type: DataTypes.INTEGER,
            field: 'card_father',
            allowNull: true
        },
        cardChild: {
            type: DataTypes.INTEGER,
            field: 'card_child',
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
            onDelete: 'CASCADE'
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
    const Action = model.Action;
    const Attachment = model.Attachment;
    const Cardhaslabel = model.Cardhaslabel;
    const Memberhascard = model.Memberhascard;
    const Task = model.Task;
    const List = model.List;
    const Project = model.Project;
    const Team = model.Team;
    const Label = model.Label;
    const Member = model.Member;

    Card.hasMany(Action, {
        as: 'ActionCardFks',
        foreignKey: 'card_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.hasMany(Attachment, {
        as: 'AttachmentCardFks',
        foreignKey: 'card_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Card.hasMany(Cardhaslabel, {
        as: 'HaslabelCardFks',
        foreignKey: 'card_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Card.hasMany(Memberhascard, {
        as: 'MemberhascardCardFks',
        foreignKey: 'card_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Card.hasMany(Task, {
        as: 'TaskCardFks',
        foreignKey: 'card_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Card.belongsTo(List, {
        as: 'List',
        foreignKey: 'list_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Card.belongsToMany(List, {
        as: 'ActionLists',
        through: Action,
        foreignKey: 'card_id',
        otherKey: 'list_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.belongsToMany(Project, {
        as: 'ActionProjects',
        through: Action,
        foreignKey: 'card_id',
        otherKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.belongsToMany(Team, {
        as: 'ActionTeams',
        through: Action,
        foreignKey: 'card_id',
        otherKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Card.belongsToMany(Label, {
        as: 'CardhaslabelLabels',
        through: Cardhaslabel,
        foreignKey: 'card_id',
        otherKey: 'label_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Card.belongsToMany(Member, {
        as: 'MemberhascardMembers',
        through: Memberhascard,
        foreignKey: 'card_id',
        otherKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
