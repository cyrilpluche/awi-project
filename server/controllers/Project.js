// import Member from "../../client/src/services/Member.service";
const helper = require('../helpers/helpersMethod');
const Project = require('../config/db_connection').Project;
const Member = require('../config/db_connection').Member;
const MemberHasProject = require('../config/db_connection').Memberhasproject
const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;

module.exports = {

    /* =================

    /*  localhost:4200/api/project/create
     *
     *  req.body = {
     *      projectTitle = project title,
     *      projectVisibility = 1,
     *      projectStatus = 2,
     *      projectDateTarget = 01/01/2018 (optional)
     *  }
     *
     *  return: The Project object.
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

    /*  localhost:4200/api/project/find_all --- ?projectTitle=title... (optional)
     *
     *  return: Array of Project objects with given attributes.
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

    /*  localhost:4200/api/project/find_one --- ?projectTitle=title... (optional)
     *
     *  return: Project object with given attributes.
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

    /*  localhost:4200/api/project/find_one/:id 
     *
     *  return: Project object with given attributes.
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

    /*  localhost:4200/api/project/update/2
     *
     *  req.body = {
     *      projectTitle = project title, (optional)
     *      projectVisibility = 1, (optional)
     *      projectStatus = 2, (optional)
     *      projectDateTarget = 01/01/2018 (optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
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
     * 127.0.0.1:4200/api/project/update_memberhasProject?memberId=1&projectId=2&projectIsFavorite=false
     * update a memberhasProject ligne by setting favorite to favorite
     * @param req
     * @param res
     * @param next
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

    /*  localhost:4200/api/project/delete/5
     *
     *  return: A boolean. true = deleted, false = no deleted.
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

    /*  localhost:4200/api/project/find_all_searchbar?str=customStr. (optional)
     *
     *  return: Array of Project objects with given attributes.
     */
    findAllSearchbar(req, res, next) {
        Project
            .findAll({
                attributes: [['project_id', 'id'], ['project_title', 'label']],
                order : sequelize.col('project_id'),
                where: {
                    projectTitle: { [Sequelize.Op.like]: '%' + req.query.str + '%'}
                }
            })
            .then(projects => {
                req.body.result = projects
                next()
            })
            .catch(error => res.status(400).send(error));
    },


    /**
     * find all project that the member participate
     * @param req
     * @param res
     * @param next
     */
    findAllProjectMember (req, res, next) {
        MemberHasProject.findAll(
            {
                where: {member_id: req.params.member},
                include: [
                    {
                        model: Project,
                        as: 'Project'
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
    }

}