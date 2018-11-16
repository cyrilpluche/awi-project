const Team = require('./Team');
const Member = require('./Member');

const Project = require('./Project');
const List = require('./List');
const Label = require('./Label');
const Card = require('./Card');
const Task = require('./Task');
const Attachment = require('./Attachment');

const MemberHasProject = require('./MemberHasProject');
const MemberHasCard = require('./MemberHasCard');
const MemberHasAction = require('./MemberHasAction');
const MemberHasPermissionProject = require('./MemberHasPermissionProject');

const TeamHasMember = require('./TeamHasMember');

const CardHasLabel = require('./CardHasLabel');

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
    MemberHasCard,
    MemberHasAction,
    MemberHasPermissionProject,

    TeamHasMember,

    CardHasLabel,

    Action,
    Permission,
    End
};