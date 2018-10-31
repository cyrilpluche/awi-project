var Project = require('../config/db_connection').Project;
var sequelize = require('../config/db_connection').sequelize;
var Sequelize = require('../config/db_connection').Sequelize;

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
    }

}