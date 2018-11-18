const Mhpp = require('../config/db_connection').MemberHasPermissionProject
const sequelize = require('../config/db_connection').sequelize;
const Permission = require('../config/db_connection').Permission

module.exports = {

    /* ================= MemberHasPermissionProject CONTROLLER ================= */

    /**
     * @typedef MemberHasPermissionProject
     * @property {integer} memberHasPermissionProjectId.required
     * @property {integer} permissionId.required
     * @property {integer} projectId
     * @property {integer} memberId
     * @property {boolean} mhppState
     */

    /**
     * This function create a new member.
     * @route POST /api/permission/create_for_project
     * @group Permission - Operations about permission.
     * @param {integer} permissionId.required
     * @param {integer} projectId
     * @param {integer} memberId
     * @param {boolean} mhppState
     * @returns {string} 200 - A new MemberHasPermissionProject created.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    create(req, res, next) {
        Mhpp
            .create(req.body)
            .then(permission => {
                req.body.result = permission
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function find all the MemberHasPermissionProject matching.
     * @group Permission - Operations about permission.
     * @param {integer} permissionId.optional
     * @param {integer} projectId.optional
     * @param {integer} memberId.optional
     * @param {boolean} mhppState.optional
     * @returns {Array.<MemberHasPermissionProject>} 200 - A array of MemberHasPermissionProject.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findAll(req, res, next) {
        Mhpp
            .findAll({
                order : sequelize.col('memberId'),
                where: req.query,
                include: [{ model: Permission, as: 'Permission' }]
            })
            .then(mhpps => {
                req.body.result = mhpps
                next()
            })
            .catch(error => res.status(400).send(error))
    },


    findAllFromMembers(req, res, next) {
        let members = req.body.result
        let allPermissions = []

        for (let member of members) {
            Mhpp
                .findAll({
                    order : sequelize.col('memberId'),
                    where: {
                        projectId: req.query.projectId,
                        memberId: member.memberId
                    },
                    include: [{
                        model: Permission,
                        as: 'Permission'
                    }]
                })
                .then(mhpps => {
                    let memberPermissions = Object.assign( member.Member )
                    memberPermissions.dataValues.permissions = mhpps
                    allPermissions.push(memberPermissions)
                    if (members.indexOf(member) === members.length - 1) {
                        req.body.result = allPermissions
                        next()
                    }
                })
                .catch(error => res.status(400).send(error))
        }

    },

    /**
     * This function find the first MemberHasPermissionProject matching.
     * @group Permission - Operations about permission.
     * @param {integer} permissionId.optional
     * @param {integer} projectId.optional
     * @param {integer} memberId.optional
     * @returns {Permission.model} 200 - Permission object with given attributes of the query..
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findOne(req, res, next) {
        Mhpp
            .findOne({
                where: req.query
            })
            .then(mhpp => {
                req.body.result = mhpp
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function update a the permission of a project member.
     * @route PUT /api/permission/update_for_project
     * @group Permission - Operations about permission.
     * @param {integer} permissionId.optional
     * @param {integer} projectId.optional
     * @param {integer} memberId.optional
     * @param {integer} permissionId.body.optional
     * @param {integer} projectId.body.optional
     * @param {integer} memberId.body.optional
     * @returns {boolean} 200 - Boolean, true if the MemberHasPermissionProject was updated.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    update(req, res, next) {
        Mhpp
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
     * This function delete a MemberHasPermissionProject.
     * @route DELETE /api/permission/delete_for_project
     * @group Permission - Operations about permission.
     * @param {integer} MemberHasPermissionProjectId
     * @returns {boolean} 200 - Boolean, true if the MemberHasPermissionProject was deleted.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    delete(req, res, next) {
        Mhpp
            .destroy({
                where: req.query
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function create all permission (false) for a new member on project.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    initAll (req, res, next) {
        Mhpp
            .create({
                projectId: req.body.result.projectId,
                memberId: req.body.result.memberId,
                permissionId: 3,
                mhppState: false
            })
            .then(permission => {
                next()
            })
            .catch(error => res.status(400).send(error))
    }
}