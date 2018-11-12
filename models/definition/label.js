/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Label', {
        labelId: {
            type: DataTypes.INTEGER,
            field: 'label_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        labelColor: {
            type: DataTypes.STRING(50),
            field: 'label_color',
            allowNull: false
        },
        labelDescription: {
            type: DataTypes.STRING(250),
            field: 'label_description',
            allowNull: true
        },
        projectId: {
            type: DataTypes.INTEGER,
            field: 'project_id',
            allowNull: false,
            references: {
                model: 'project',
                key: 'project_id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'CASCADE'
        }
    }, {
        schema: 'public',
        tableName: 'label',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Label = model.Label;
    const Cardhaslabel = model.Cardhaslabel;
    const Project = model.Project;
    const Card = model.Card;

    Label.hasMany(Cardhaslabel, {
        as: 'CardhaslabelLabel0Fks',
        foreignKey: 'label_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Label.belongsTo(Project, {
        as: 'Project',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

    Label.belongsToMany(Card, {
        as: 'CardhaslabelCards',
        through: Cardhaslabel,
        foreignKey: 'label_id',
        otherKey: 'card_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });

};
