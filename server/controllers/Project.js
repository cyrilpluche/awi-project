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
     *  return: Array with the Project object (size = 1).
     */
    create(req, res, next) {
        return Project
            .create(req.body)
            .then(project => res.status(201).send([project]))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/project/find_all
     *
     *  return: Array of Project objects.
     */
    findAll(req, res, next) {
        return Project
            .findAll({ order : sequelize.col('projectId')})
            .then(projects => res.status(201).send(projects))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/project/find_one/2
     *
     *  return: Array with the Project object (size = 1).
     */
    findOne(req, res, next) {
        return Project
            .findOne({
                where: {
                    projectId : req.params.id
                }
            })
            .then(projects => res.status(201).send([projects]))
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
     *  return: Array with a boolean. 1 = Updated, 0 = Not updated (size = 1).
     *
     *  Warning: If the id don't match, status 201 is returned with boolean = 0.
     */
    update(req, res, next) {
        return Project
            .update(req.body, {
                where: { projectId: req.params.id }
            })
            .then(isUpdated => {
                res.status(201).send(isUpdated)
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/project/delete/5
     *
     *  return: Array with a boolean. 1 = Updated, 0 = Not updated (size = 1).
     *
     *  Warning: If the id don't match, status 201 is returned with boolean = 0.
     */
    delete(req, res, next) {
        return Project
            .destroy({
                where: {
                    projectId: req.params.id
                }
            })
            .then(project => res.status(201).send([project]))
            .catch(error => res.status(400).send(error));
    }
}