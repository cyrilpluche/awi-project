/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Memberhasaction', {
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
        },
        mhaStatus: {
            type: DataTypes.INTEGER,
            field: 'mha_status',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'memberhasaction',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Memberhasaction = model.Memberhasaction;
    const Action = model.Action;
    const Member = model.Member;

    Memberhasaction.belongsTo(Action, {
        as: 'Action',
        foreignKey: 'action_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Memberhasaction.belongsTo(Member, {
        as: 'Member',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
