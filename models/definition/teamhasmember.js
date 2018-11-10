/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Teamhasmember', {
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
        teamStatus: {
            type: DataTypes.INTEGER,
            field: 'team_status',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'teamhasmember',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Teamhasmember = model.Teamhasmember;
    const Member = model.Member;
    const Team = model.Team;

    Teamhasmember.belongsTo(Member, {
        as: 'Member',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Teamhasmember.belongsTo(Team, {
        as: 'Team',
        foreignKey: 'team_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
