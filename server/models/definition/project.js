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
    const Action = model.Action;
    const Label = model.Label;
    const List = model.List;
    const Memberhaspermissionproject = model.Memberhaspermissionproject;
    const Memberhasproject = model.Memberhasproject;
    const Teamhasproject = model.Teamhasproject;
    const Card = model.Card;
    const Team = model.Team;
    const Member = model.Member;
    const Permission = model.Permission;

    Project.hasMany(Action, {
        as: 'ActionProject1Fks',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.hasMany(Label, {
        as: 'LabelProjectFks',
        foreignKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Project.hasMany(List, {
        as: 'ListProjectFks',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.hasMany(Memberhaspermissionproject, {
        as: 'MemberhaspermissionprojectProject0Fks',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.hasMany(Memberhasproject, {
        as: 'MemberhasprojectProjectFks',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.hasMany(Teamhasproject, {
        as: 'TeamhasprojectProjectFks',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Card, {
        as: 'ActionCards',
        through: Action,
        foreignKey: 'project_id',
        otherKey: 'card_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(List, {
        as: 'ActionLists',
        through: Action,
        foreignKey: 'project_id',
        otherKey: 'list_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Team, {
        as: 'ActionTeams',
        through: Action,
        foreignKey: 'project_id',
        otherKey: 'team_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Member, {
        as: 'MemberhaspermissionprojectMembers',
        through: Memberhaspermissionproject,
        foreignKey: 'project_id',
        otherKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Permission, {
        as: 'MemberhaspermissionprojectPermissions',
        through: Memberhaspermissionproject,
        foreignKey: 'project_id',
        otherKey: 'permission_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Member, {
        as: 'MemberhasprojectMembers',
        through: Memberhasproject,
        foreignKey: 'project_id',
        otherKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Project.belongsToMany(Team, {
        as: 'TeamhasprojectTeams',
        through: Teamhasproject,
        foreignKey: 'project_id',
        otherKey: 'team_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
