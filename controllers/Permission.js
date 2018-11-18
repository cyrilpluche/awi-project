const MemberHasAction = require('../config/db_connection').MemberHasAction
const sequelize = require('../config/db_connection').sequelize;

const Permission = require('../config/db_connection').Permission

module.exports = {

    /* ================= Permission CONTROLLER ================= */

    /**
     * @typedef Permission
     * @property {integer} permissionId.required
     * @property {string} permissionTitle
     * @property {string} permissionDescription
     */

    /**
     * This function create a new Permission.
     * @route POST /api/permission/create
     * @group Permission - Operations about permission.
     * @param {string} permissionTitle
     * @parzm {string} permissionDescription
     * @returns {Permission.model} 200 - A new Permission created.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    create(req, res, next) {
        Permission
            .create(req.body)
            .then(permission => {
                req.body.result = permission
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function find all the Permissions.
     * @route GET /api/permission/find_all
     * @group Permission - Operations about permission.
     * @returns {Array.<Permission>} 200 - All the Permissions.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findAll(req, res, next) {
        Permission
            .findAll({
                order : sequelize.col('permissionId'),
                where: req.query
            })
            .then(permissions => {
                req.body.result = permissions
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function find a Permission.
     * @route GET /api/permission/find_one
     * @group Permission - Operations about permission.
     * @param {integer} permissionId.required
     * @returns {Array.<Permission>} 200 - The Permission found.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findOne(req, res, next) {
        Permission
            .findOne({
                where: req.query
            })
            .then(permission => {
                req.body.result = permission
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function update a Permission.
     * @route PUT /api/permission/update
     * @group Permission - Operations about permission.
     * @param {integer} permissionId.required
     * @param {string} permissionTitle.body.optional
     * @param {string} permissionDescription.body.optional
     * @returns {boolean} 200 - Boolean, true if the permission was updated.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    update(req, res, next) {
        Permission
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
     * This function delete a Permission.
     * @route DELETE /api/permission/update
     * @group Permission - Operations about permission.
     * @param {integer} permissionId.optional
     * @param {string} permissionDescription.optional
     * @returns {boolean} 200 - Boolean, true if the permission was deleted.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    delete(req, res, next) {
        Permission
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