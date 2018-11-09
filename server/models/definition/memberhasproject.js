/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Memberhasproject', {
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
        memberhasprojectStatus: {
            type: DataTypes.INTEGER,
            field: 'memberhasproject_status',
            allowNull: false
        },
        projectIsFavorite: {
            type: DataTypes.BOOLEAN,
            field: 'project_is_favorite',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'memberhasproject',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Memberhasproject = model.Memberhasproject;
    const Member = model.Member;
    const Project = model.Project;

    Memberhasproject.belongsTo(Member, {
        as: 'Member',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Memberhasproject.belongsTo(Project, {
        as: 'Project',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
