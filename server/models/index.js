/* eslint global-require: "off" */
const model = {};
let initialized = false;

/**
 * Initializes sequelize models and their relations.
 * @param   {Object} sequelize  - Sequelize instance.
 * @returns {Object}            - Sequelize models.
 */
function init(sequelize) {
    delete module.exports.init; // Destroy itself to prevent repeated calls and clash with a model named 'init'.
    initialized = true;
    // Import model files and assign them to `model` object.
    model.Action = sequelize.import('./definition/action.js');
    model.Actiononcard = sequelize.import('./definition/actiononcard.js');
    model.Actiononlist = sequelize.import('./definition/actiononlist.js');
    model.Actiononproject = sequelize.import('./definition/actiononproject.js');
    model.Actiononteam = sequelize.import('./definition/actiononteam.js');
    model.Attachment = sequelize.import('./definition/attachment.js');
    model.Card = sequelize.import('./definition/card.js');
    model.Cardhaslabel = sequelize.import('./definition/cardhaslabel.js');
    model.Label = sequelize.import('./definition/label.js');
    model.List = sequelize.import('./definition/list.js');
    model.Member = sequelize.import('./definition/member.js');
    model.Memberhasaction = sequelize.import('./definition/memberhasaction.js');
    model.Memberhascard = sequelize.import('./definition/memberhascard.js');
    model.Memberhaspermissionproject = sequelize.import('./definition/memberhaspermissionproject.js');
    model.Memberhaspermissionteam = sequelize.import('./definition/memberhaspermissionteam.js');
    model.Memberhasproject = sequelize.import('./definition/memberhasproject.js');
    model.Permission = sequelize.import('./definition/permission.js');
    model.Project = sequelize.import('./definition/project.js');
    model.Task = sequelize.import('./definition/task.js');
    model.Team = sequelize.import('./definition/team.js');
    model.Teamhasmember = sequelize.import('./definition/teamhasmember.js');
    model.Teamhasproject = sequelize.import('./definition/teamhasproject.js');

    // All models are initialized. Now connect them with relations.
    require('./definition/action.js').initRelations();
    require('./definition/actiononcard.js').initRelations();
    require('./definition/actiononlist.js').initRelations();
    require('./definition/actiononproject.js').initRelations();
    require('./definition/actiononteam.js').initRelations();
    require('./definition/attachment.js').initRelations();
    require('./definition/card.js').initRelations();
    require('./definition/cardhaslabel.js').initRelations();
    require('./definition/label.js').initRelations();
    require('./definition/list.js').initRelations();
    require('./definition/member.js').initRelations();
    require('./definition/memberhasaction.js').initRelations();
    require('./definition/memberhascard.js').initRelations();
    require('./definition/memberhaspermissionproject.js').initRelations();
    require('./definition/memberhaspermissionteam.js').initRelations();
    require('./definition/memberhasproject.js').initRelations();
    require('./definition/permission.js').initRelations();
    require('./definition/project.js').initRelations();
    require('./definition/task.js').initRelations();
    require('./definition/team.js').initRelations();
    require('./definition/teamhasmember.js').initRelations();
    require('./definition/teamhasproject.js').initRelations();
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
