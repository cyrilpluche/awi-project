// import Member from "../../client/src/services/Member.service";
const helper = require('../helpers/helpersMethod');
const Project = require('../config/db_connection').Project;
const List = require('../config/db_connection').List;
const Card = require('../config/db_connection').Card;
const CardHasLabel = require('../config/db_connection').Cardhaslabel;
const Label = require('../config/db_connection').Label;
const Member = require('../config/db_connection').Member;

const MemberHasCard = require('../config/db_connection').MemberHasCard
const MemberHasProject = require('../config/db_connection').MemberHasProject

const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;

module.exports = {

    /* ================= Project CONTROLLER ================== */


    /**
     * @typedef Project
     * @property {integer} projectId.required
     * @property {string} projectTitle
     * @property {string} permissionDescription
     * @property {integer} projectStatus
     * @property {date} projectDateTarget.optional
     *
     */

    /**
     * This function create a new Project.
     * @route POST /api/project/create
     * @group Project - Operations about project.
     * @param {string} projectTitle
     * @param {string} permissionDescription
     * @param {integer} projectStatus
     * @param {date} projectDateTarget.optional
     * @returns {Project.model} 200 - A new Project created.
     * @returns {Error}  500 - error
     *
     */
    create(req, res, next) {
        Project
            .create(req.body)
            .then(projects => {
                req.body.result = projects
                next()
            })
            .catch(error => next(error))
    },

    /**
     * This function create a new MemberHasProject.
     * @route POST /api/project/createMemberHasProject
     * @group Project - Operations about project.
     * @param {integer} projectId
     * @param {integer} memberhasprojectStatus
     * @returns {MemberHasProject.model} 200 - A new MemberHasProject created.
     * @returns {Error}  500 - error
     *
     */
    createMemberHasProject (req, res, next) {
        MemberHasProject.create(req.body)
            .then(mhp => res.send(mhp))
    },

    /**
     * This function find all the projects matching.
     * @route GET /api/project/find_all
     * @group Project - Operations about project.
     * @param {string} projectTitle.optional
     * @param {integer} projectStatus.optional
     * @param {date} projectDateTarget.optional
     * @returns {Array.<Project>} 200 - All the projects matching.
     * @returns {Error}  500 - error
     *
     */
    findAll(req, res, next) {
        Project
            .findAll({
                order : sequelize.col('projectId'),
                where: req.query
            })
            .then(projects => {
                req.body.result = projects
                next()
            })
            .catch(error => next(error));
    },


    /**
     * This function find the first project matching.
     * @route GET /api/project/find_one
     * @group Project - Operations about project.
     * @param {string} projectTitle.optional
     * @param {integer} projectStatus.optional
     * @param {date} projectDateTarget.optional
     * @returns {Project.model} 200 - the project matching.
     * @returns {Error}  500 - error
     *
     */
    findOne(req, res, next) {
        Project
            .findOne({ where: req.query })
            .then(project => {
                req.body.result = project
                next()
            })
            .catch(error => next(error));
    },


    /**
     * This function find a project by id .
     * @route GET /api/project/find_one/:id
     * @group Project - Operations about project.
     * @returns {Project.model} 200 - the project found.
     * @returns {Error}  500 - error
     *
     */
    findProjectInfo(req, res, next) {
        Project
            .findAll({
                where :{ projectId: req.params.id }
            })
            .then(project => {
                req.body.result = project
                next()
            })
            .catch(error => next(error));
    },

    /**
     * This function update a project.
     * @route PUT /api/project/update/:id
     * @group Project - Operations about project.
     * @param {string} projectTitle.body.optional
     * @param {string} projectVisibility.body.optional
     * @param {integer} projectStatus.body.optional
     * @param {date} projectDateTarget.body.optional
     * @returns {boolean} 200 - Boolean, true if the project was updated.
     * @returns {Error}  500 - error
     *
     */
    update(req, res, next) {
        Project
            .update(req.body, {
                where: { projectId: req.params.id }
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
    },

    /**
     * This function update a MemberHasProject.
     * @route PUT /api/project/update_memberHasProject
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
    updateMemberHasProject(req, res, next) {
        let updateField = {};

        if (req.query.memberHasProjectStatus !== undefined &&
            req.query.memberHasProjectStatus != null)
            updateField.memberhasprojectStatus = req.query.memberHasProjectStatus;

        if (req.query.projectIsFavorite !== undefined && req.query.projectIsFavorite != null)
            updateField.projectIsFavorite = req.query.projectIsFavorite;

        MemberHasProject.update(updateField, {
            where: {
                projectId: req.query.projectId,
                memberId: req.query.memberId,
            }
        }).then(r => {
            if (r == null) throw 'Error'
            else res.send(r)
        })
            .catch(e => res.status(400).send(e))
    },

    /**
     * This function delete a project.
     * @route PUT /api/project/delete/:id
     * @group Project - Operations about project.
     * @returns {boolean} 200 - Boolean, true if the project was deleted.
     * @returns {Error}  500 - error
     *
     */
    delete(req, res, next) {
        Project
            .destroy({
                where: {
                    projectId: req.params.id
                }
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error));
    },

    /* ================ CUSTOM METHODS =============== */


    /**
     * This function find all the projects matching the keyword or memberId.
     * @route GET /api/project/find_all_searchbar
     * @group Project - Operations about project.
     * @param {string} str.optional
     * @param {integer} memberId.optional
     * @returns {Array.<Project>} 200 - All the projects matching.
     * @returns {Error}  500 - error
     *
     */
    findAllSearchbar(req, res, next) {
        Project
            .findAll({
                attributes: [['project_id', 'id'], ['project_title', 'label']],
                order : sequelize.col('project_id'),
                where: {
                    projectTitle: {
                        [Sequelize.Op.or]: [
                            { [Sequelize.Op.like]: '%' + req.query.str + '%' },
                            { [Sequelize.Op.like]: '%' + req.query.str.charAt(0).toUpperCase() + req.query.str.slice(1) + '%' }
                        ]
                    }
                }
            })
            .then(projects => {
                req.body.result = projects
                next()
            })
            .catch(error => res.status(400).send(error));
    },



    /**
     * This function find all the MemberHasProject matching (all the project of a member).
     * @route GET /api/project/find_all_member/:member
     * @group Project - Operations about project.
     * @returns {Array.<MemberHasProject>} 200 - All the MemberHasProject matching.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findAllProjectMember (req, res, next) {
        MemberHasProject.findAll(
            {
                where: {
                    member_id: req.params.member,
                    memberhasprojectStatus: 1
                },
                include: [
                    {
                        model: Project,
                        as: 'Project',
                        include: [
                            {
                                model: MemberHasProject,
                                as: 'MemberhasprojectProjectFks',
                                where: { memberhasprojectStatus: 1 }
                            }
                        ]
                    }
                ]
            }
        ).then(result => {
            let projects = [];
            for (let i = 0; i < result.length; i++){
                projects.push(
                    helper.flatProjects(result[i])
                )
            }

            res.send(projects)
        })
            .catch(e =>res.status(400).send(e) )
    },

    /**
     * This function find a specific member of a project.
     * @route GET /api/project/member_has_project
     * @group Project - Operations about project.
     * @param {integer} projectId.optional
     * @returns {Array.<MemberHasProject>} 200 - All the MemberHasProject matching.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findMemberHasProject(req, res, next){
        MemberHasProject.findOne(
            {
                where: req.query
            }
        ).then(result => {
            if(result) res.send(true)
            else res.send(false)
        })
            .catch(e =>res.status(400).send(e) )
    },

    /**
     * This function find all lists and cards of a project.
     * @route GET /api/project/find_all_lists_cards
     * @group Project - Operations about project.
     * @param {integer} projectId.optional
     * @returns {Array} 200 - All lists and cards of a project.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findAllListsCards (req, res, next) {
        List.findAll(
            {
                where: req.query,
                include: [
                    {
                        model: Card,
                        as: 'CardListFks' ,
                        include: [
                            { all: true },

                            {
                                model: CardHasLabel,
                                as: 'HaslabelCardFks',
                                include: [{ model: Label, as: 'Label'}]
                            },

                            {
                                model: MemberHasCard,
                                as: 'MemberhascardCardFks',
                                include: [{ model: Member, as: 'Member', attribute: ['memberPicture']}]
                            }
                        ]
                    }
                ]
            }
        ).then(listsCards => {
            req.body.result = helper.computeListOrder(listsCards)
            next()
        })
            .catch(e =>res.status(400).send(e))
    }
}
