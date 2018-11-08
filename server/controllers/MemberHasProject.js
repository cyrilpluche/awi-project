const helper = require('../helpers/helpersMethod');
const MemberHasProject = require('../config/db_connection').MemberHasProject
const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;

const Member = require('../config/db_connection').Member
const Project = require('../config/db_connection').Project
const Mhpp = require('../config/db_connection').MemberHasPermissionProject
const List = require('../config/db_connection').List
const Card = require('../config/db_connection').Card

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      projectId: INT,
     *      memberId: INT,
     *      memberhasprojectStatus: INT,
     *      projectIsFavorite: Boolean (Optional)
     *  }
     *
     *  return: The object.
     */
    create(req, res, next) {
        MemberHasProject
            .create(req.body)
            .then(Mhp => {
                req.body.result = Mhp
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?projectId=id... (optional)
     *
     *  return: Array of mhp objects with given attributes of the query.
     */
    findAll(req, res, next) {
        MemberHasProject
            .findAll({
                order : sequelize.col('memberId'),
                where: req.query,
                include: [{
                    model: Member,
                    as: 'Member',
                    include: [{ model: Mhpp, as: 'HaspermissionprojectMember1Fks' }]
                }]
            })
            .then(mhps => {
                req.body.result = mhps
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     *  return: Array of Project objects containing the str query.
     */
    findAllSearchbar(req, res, next) {
        MemberHasProject
            .findAll({
                order : sequelize.col('project_id'),
                where: {
                    memberId: req.query.memberId
                },
                include: [{
                    model: Project,
                    as: 'Project',
                    where: {
                        projectTitle: {
                            [Sequelize.Op.or]: [
                                { [Sequelize.Op.like]: '%' + req.query.str + '%' },
                                { [Sequelize.Op.like]: '%' + req.query.str.charAt(0).toUpperCase() + req.query.str.slice(1) + '%' }
                            ]
                        }
                    },
                    attributes: [['project_id', 'id'], ['project_title', 'label']]
                }]
            })
            .then(projects => {
                let flatproject = helper.flatSearchProject(projects)
                req.body.result = flatproject
                next()
            })
            .catch(error => res.status(400).send(error));
    },

    /**  ?projectId=id... (optional)
     *
     *  return: MHP object with given attributes of the query.
     */
    findOne(req, res, next) {
        MemberHasProject
            .findOne({
                where: req.query,
                include: [
                    { model: Member, as: 'Member'},
                    { model: Project, as: 'Project'},
                ]
            })
            .then(mhp => {
                req.body.result = mhp
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?projectId=id... (optional)
     *
     *  req.body = {
     *      projectId: INT,
     *      memberId: INT,
     *      memberhasprojectStatus: INT,
     *      projectIsFavorite: Boolean (Optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        MemberHasProject
            .update(req.body, {
                where: req.query
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?projectId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        MemberHasProject
            .destroy({
                where: req.query
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    }
}