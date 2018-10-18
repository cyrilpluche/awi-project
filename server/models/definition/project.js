/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Project', {
        projectId: {
            type: DataTypes.INTEGER,
            field: 'project_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        projectTitle: {
            type: DataTypes.STRING(250),
            field: 'project_title',
            allowNull: false
        },
        projectVisibility: {
            type: DataTypes.INTEGER,
            field: 'project_visibility',
            allowNull: false
        },
        projectStatus: {
            type: DataTypes.INTEGER,
            field: 'project_status',
            allowNull: false
        },
        projectDateTarget: {
            type: DataTypes.DATEONLY,
            field: 'project_date_target',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'project',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Project = model.Project;
    const Actiononproject = model.Actiononproject;
    const List = model.List;
    const Memberhaspermissionproject = model.Memberhaspermissionproject;
    const Memberhasproject = model.Memberhasproject;
    const Teamhasproject = model.Teamhasproject;
    const Action = model.Action;
    const Member = model.Member;
    const Permission = model.Permission;
    const Team = model.Team;

    Project.hasMany(Actiononproject, {
        as: 'ActiononprojectProject1Fks',
        foreignKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.hasMany(List, {
        as: 'ListProject0Fks',
        foreignKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.hasMany(Memberhaspermissionproject, {
        as: 'MemberhaspermissionprojectProject1Fks',
        foreignKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.hasMany(Memberhasproject, {
        as: 'MemberhasprojectProject0Fks',
        foreignKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.hasMany(Teamhasproject, {
        as: 'TeamhasprojectProject0Fks',
        foreignKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Action, {
        as: 'ActiononprojectActions',
        through: Actiononproject,
        foreignKey: 'project_id',
        otherKey: 'action_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(List, {
        as: 'ListListIdIsthefathers',
        through: List,
        foreignKey: 'project_id',
        otherKey: 'list_id_isthefather',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Member, {
        as: 'MemberhaspermissionprojectMembers',
        through: Memberhaspermissionproject,
        foreignKey: 'project_id',
        otherKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Permission, {
        as: 'MemberhaspermissionprojectPermissions',
        through: Memberhaspermissionproject,
        foreignKey: 'project_id',
        otherKey: 'permission_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Member, {
        as: 'MemberhasprojectMembers',
        through: Memberhasproject,
        foreignKey: 'project_id',
        otherKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Team, {
        as: 'TeamhasprojectTeams',
        through: Teamhasproject,
        foreignKey: 'project_id',
        otherKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
