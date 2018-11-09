/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Memberhaspermissionproject', {
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
        projectId: {
            type: DataTypes.INTEGER,
            field: 'project_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'project',
                key: 'project_id'
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
        mhppState: {
            type: DataTypes.BOOLEAN,
            field: 'mhpp_state',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'memberhaspermissionproject',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Memberhaspermissionproject = model.Memberhaspermissionproject;
    const Member = model.Member;
    const Permission = model.Permission;
    const Project = model.Project;

    Memberhaspermissionproject.belongsTo(Member, {
        as: 'Member',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Memberhaspermissionproject.belongsTo(Permission, {
        as: 'Permission',
        foreignKey: 'permission_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Memberhaspermissionproject.belongsTo(Project, {
        as: 'Project',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
