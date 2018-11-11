/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Memberhaspermissionteam', {
        teamId: {
            type: DataTypes.INTEGER,
            field: 'team_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'team',
                key: 'team_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'CASCADE'
        },
        permissionId: {
            type: DataTypes.INTEGER,
            field: 'permission_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'permission',
                key: 'permission_id'
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
        mhptState: {
            type: DataTypes.BOOLEAN,
            field: 'mhpt_state',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'memberhaspermissionteam',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Memberhaspermissionteam = model.Memberhaspermissionteam;
    const Member = model.Member;
    const Permission = model.Permission;
    const Team = model.Team;

    Memberhaspermissionteam.belongsTo(Member, {
        as: 'Member',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Memberhaspermissionteam.belongsTo(Permission, {
        as: 'Permission',
        foreignKey: 'permission_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Memberhaspermissionteam.belongsTo(Team, {
        as: 'Team',
        foreignKey: 'team_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
