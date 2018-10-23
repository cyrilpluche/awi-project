/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Member', {
        memberId: {
            type: DataTypes.INTEGER,
            field: 'member_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        memberFirstname: {
            type: DataTypes.STRING(50),
            field: 'member_firstname',
            allowNull: false
        },
        memberLastname: {
            type: DataTypes.STRING(50),
            field: 'member_lastname',
            allowNull: false
        },
        memberPseudo: {
            type: DataTypes.STRING(250),
            field: 'member_pseudo',
            allowNull: false
        },
        memberEmail: {
            type: DataTypes.STRING(50),
            field: 'member_email',
            allowNull: true
        },
        memberPassword: {
            type: DataTypes.STRING(50),
            field: 'member_password',
            allowNull: true
        },
        memberToken: {
            type: DataTypes.STRING(500),
            field: 'member_token',
            allowNull: true
        },
        memberPicture: {
            type: DataTypes.STRING(250),
            field: 'member_picture',
            allowNull: true
        },
        memberStatus: {
            type: DataTypes.INTEGER,
            field: 'member_status',
            allowNull: false
        },
        memberOauthGithub: {
            type: DataTypes.STRING(250),
            field: 'member_oauth_github',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'member',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Member = model.Member;
    const Action = model.Action;
    const Memberhaspermissionproject = model.Memberhaspermissionproject;
    const Memberhaspermissionteam = model.Memberhaspermissionteam;
    const Memberhasproject = model.Memberhasproject;
    const Teamhasmember = model.Teamhasmember;
    const Permission = model.Permission;
    const Project = model.Project;
    const Team = model.Team;

    Member.hasMany(Action, {
        as: 'ActionMember0Fks',
        foreignKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.hasMany(Memberhaspermissionproject, {
        as: 'HaspermissionprojectMember2Fks',
        foreignKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.hasMany(Memberhaspermissionteam, {
        as: 'HaspermissionteamMember2Fks',
        foreignKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.hasMany(Memberhasproject, {
        as: 'HasprojectMember1Fks',
        foreignKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.hasMany(Teamhasmember, {
        as: 'TeamhasmemberMember1Fks',
        foreignKey: 'member_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.belongsToMany(Permission, {
        as: 'MemberhaspermissionprojectPermissions',
        through: Memberhaspermissionproject,
        foreignKey: 'member_id',
        otherKey: 'permission_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.belongsToMany(Project, {
        as: 'MemberhaspermissionprojectProjects',
        through: Memberhaspermissionproject,
        foreignKey: 'member_id',
        otherKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.belongsToMany(Permission, {
        as: 'MemberhaspermissionteamPermissions',
        through: Memberhaspermissionteam,
        foreignKey: 'member_id',
        otherKey: 'permission_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.belongsToMany(Team, {
        as: 'MemberhaspermissionteamTeams',
        through: Memberhaspermissionteam,
        foreignKey: 'member_id',
        otherKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.belongsToMany(Project, {
        as: 'MemberhasprojectProjects',
        through: Memberhasproject,
        foreignKey: 'member_id',
        otherKey: 'project_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Member.belongsToMany(Team, {
        as: 'TeamhasmemberTeams',
        through: Teamhasmember,
        foreignKey: 'member_id',
        otherKey: 'team_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
