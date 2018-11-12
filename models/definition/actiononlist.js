/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Actiononlist', {
        actionId: {
            type: DataTypes.INTEGER,
            field: 'action_id',
            allowNull: false,
            primaryKey: true
        },
        listId: {
            type: DataTypes.INTEGER,
            field: 'list_id',
            allowNull: false,
            primaryKey: true
        }
    }, {
        schema: 'public',
        tableName: 'actiononlist',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
