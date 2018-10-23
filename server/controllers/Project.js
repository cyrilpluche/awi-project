var Project = require('../config/db_connection').Project;
var sequelize = require('../config/db_connection').sequelize;

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
            .then(project => res.status(201).send(project))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/project/find_all
     *
     *  return: Array of Project objects.
     */
    findAll(req, res, next) {
        Project
            .findAll({ order : sequelize.col('projectId')})
            .then(projects => res.status(201).send(projects))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/project/find_one/2
     *
     *  return: Project object with the given id.
     */
    findOne(req, res, next) {
        Project
            .findOne({
                where: {
                    projectId : req.params.id
                }
            })
            .then(project => res.status(201).send(project))
            .catch(error => res.status(400).send(error));
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
                res.status(201).send(isUpdated[0] === 1)
            })
            .catch(error => res.status(400).send(error));
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
            .then(isDeleted => res.status(201).send(isDeleted === 1))
            .catch(error => res.status(400).send(error));
    }
}