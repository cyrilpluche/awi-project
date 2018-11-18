const sequelize = require('../config/db_connection').sequelize;

const Label = require('../config/db_connection').Label

module.exports = {

    /* ================= CRUD ================= */

    /*
     *  req.body = {
     *      labelColor: Integer,
     *      labelDescription: String,
     *      projectId: INT
     *  }
     *
     *  return: The Label object.
     */

    /**
     * @typedef Label
     * @property {integer} labelId.required
     * @property {string} labelColor.required
     * @property {integer} projectId.required
     */

    /**
     * This function create a new label.
     * @route POST /api/label/create
     * @group Label - Operations about labels.
     * @param {Label.model} label.body.required - the new label
     * @returns {Label.model} 200 - New label object
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    create(req, res, next) {
        Label
            .create(req.body)
            .then(label => {
                req.body.result = label
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    createForProject (req, res, next) {
        let labels = [
            '#f44336', '#2196f3', '#4caf50',
            '#ffc107', '#673ab7', '#ed4b82'
        ]
        for (let staticLabel of labels) {
            Label
                .create({
                    projectId: req.body.result.projectId,
                    labelColor: staticLabel
                })
                .then(label => {
                    if (labels.indexOf(staticLabel) === labels.length - 1) next()
                })
        }
    },

    /*  ?labelId=id... (optional)
     *
     *  return: Array of Label objects with given attributes of the query.
     */
    /**
     * This function find all the labels.
     * @route GET /api/label/find_all
     * @group Label - Operations about labels.
     * @param {integer} labelId.optional
     * @param {integer} projectId.optional
     * @returns {Array.<Label>} 200 - All the label matching.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findAll(req, res, next) {
        Label
            .findAll({
                order : sequelize.col('labelId'),
                where: req.query
            })
            .then(labels => {
                req.body.result = labels
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function find a label.
     * @route GET /api/label/find_one
     * @group Label - Operations about labels.
     * @param {integer} labelId.optional
     * @returns {Label.model} 200 - The first label matching.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findOne(req, res, next) {
        Label
            .findOne({
                where: req.query
            })
            .then(label => {
                req.body.result = label
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function find a label.
     * @route PUT /api/label/update
     * @group Label - Operations about labels.
     * @param {integer} labelId.optional
     * @param {integer} projectId.optional
     * @param {Label.model} label.body.required
     * @returns {boolean} 200 - Boolean, true if the label was updated.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    update(req, res, next) {
        Label
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
     * This function find a label.
     * @route DELETE /api/label/delete
     * @group Label - Operations about labels.
     * @param {integer} labelId.optional
     * @param {integer} projectId.optional
     * @returns {boolean} 200 - Boolean, true if the label was updated.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    delete(req, res, next) {
        Label
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