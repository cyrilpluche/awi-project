const Team = require('./Team');
const Member = require('./Member');

const Project = require('./Project');
const List = require('./List');
const Label = require('./Label');
const Card = require('./Card');
const Task = require('./Task');
const Attachment = require('./Attachment');

const MemberHasProject = require('./MemberHasProject');
const MemberHasAction = require('./MemberHasAction');
const MemberHasPermissionProject = require('./MemberHasPermissionProject');

const Action = require('./Action');
const Permission = require('./Permission');

const End = require('./Endpoint');

module.exports = {
    Team,
    Member,

    Project,
    List,
    Label,
    Card,
    Task,
    Attachment,

    MemberHasProject,
    MemberHasAction,
    MemberHasPermissionProject,

    Action,
    Permission,
    End
};