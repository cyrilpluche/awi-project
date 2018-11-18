const helper = require('../helpers/helpersMethod');
const MemberHasProject = require('../config/db_connection').MemberHasProject
const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;

const Member = require('../config/db_connection').Member
const Project = require('../config/db_connection').Project
const Mhpp = require('../config/db_connection').MemberHasPermissionProject
const List = require('../config/db_connection').List
const Card = require('../config/db_connection').Card
const Permission = require('../config/db_connection').Permission

const memberFilter = ['memberId', 'memberFirstname', 'memberLastname', 'memberPseudo', 'memberEmail', 'memberStatus', 'memberPicture']

module.exports = {

    /* ================= MemberHasProject CONTROLLER ================= */


    /**
     * @typedef MemberHasProject - It represents the member of a project.
     * @property {integer} memberHasProjectId.required
     * @property {integer} projectId
     * @property {integer} memberhasprojectStatus
     * @property {boolean} projectIsFavorite
     */

    /**
     * This function create a new MemberHasProject.
     * @route POST /api/project/create_mhp
     * @group Project - Operations about project.
     * @param {integer} projectId
     * @param {integer} memberhasprojectStatus
     * @returns {MemberHasProject.model} 200 - A new MemberHasProject created.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find all the MemberHasProject matching.
     * @route GET /api/project/find_all_members
     * @group Project - Operations about project.
     * @param {integer} projectId.optional
     * @returns {Array.<MemberHasProject>} 200 - All the MemberHasProject matching.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findAll(req, res, next) {
        MemberHasProject
            .findAll({
                order : sequelize.col('memberId'),
                where: req.query,
                include: [{
                    attributes: memberFilter,
                    model: Member,
                    as: 'Member',
                    include: [{
                        model: Mhpp,
                        as: 'HaspermissionprojectMember1Fks',
                        where: req.query,
                        include: [{
                            model: Permission,
                            as: 'Permission'
                        }]
                    }]
                }]
            })
            .then(mhps => {
                req.body.result = mhps
                next()
            })
            .catch(error => res.status(400).send(error))
    },


    findAllForCard(req, res, next) {
        MemberHasProject
            .findAll({
                order : sequelize.col('memberId'),
                where: {
                    projectId: req.query.projectId,
                    memberhasprojectStatus: req.query.memberhasprojectStatus
                },
                include: [{
                    model: Member,
                    as: 'Member',
                    attributes: ['memberId', 'memberPseudo', 'memberFirstname', 'memberPicture']
                }]
            })
            .then(mhps => {
                req.body.result = mhps
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /*
     *  return: Array of Project objects containing the str query.
     */

    /**
     * This function find all the MemberHasProject matching the keywords.
     * @route GET /api/project/find_all_searchbar
     * @group Project - Operations about project.
     * @param {string} str - the keywords
     * @returns {Array.<MemberHasProject>} 200 - All the MemberHasProject matching the keywords.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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
                        },
                        projectStatus: 0
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

    /**
     * This function find all the MemberHasProject matching.
     * @param {integer} projectId.optional
     * @returns {Array.<MemberHasProject>} 200 - All the MemberHasProject matching.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findOne(req, res, next) {
        MemberHasProject
            .findOne({
                where: req.query,
                include: [
                    { model: Member, as: 'Member', attributes: memberFilter },
                    { model: Project, as: 'Project'},
                ]
            })
            .then(mhp => {
                req.body.result = mhp
                next()
            })
            .catch(error => res.status(400).send(error))
    },


    /**
     * This function update a MemberHasProject.
     * @route PUT /api/project/update_mhp
     * @group Project - Operations about project.
     * @param {integer} projectId.body
     * @param {integer} memberId.body
     * @param {integer} memberhasprojectStatus.body
     * @param {boolean} projectIsFavorite.body.optional
     * @returns {boolean} 200 - Boolean, true if the MemberHasProject was updated.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function delete a MemberHasProject .
     * @route DELETE /api/project/delete_mhp
     * @group Project - Operations about project.
     * @param {integer} projectId.body
     * @returns {boolean} 200 - Boolean, true if the MemberHasProject was deleted.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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