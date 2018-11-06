const Mhpp = require('../config/db_connection').MemberHasPermissionProject
const sequelize = require('../config/db_connection').sequelize;
const Permission = require('../config/db_connection').Permission

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      permissionId: INT,
     *      projectId: INT,
     *      memberId: INT,
     *      mhppState: BOOL
     *  }
     *
     *  return: The MHPP object.
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

    /**  ?permissionId=id... (optional)
     *
     *  return: Array of MHPP objects with given attributes of the query.
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
                    include: [{ model: Permission, as: 'Permission' }]
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

    /**  ?permissionId=id... (optional)
     *
     *
     *  return: Permission object with given attributes of the query.
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

    /**  ?permissionId=id... (optional)
     *
     *  req.body = {
     *      permissionId: INT, (optional)
     *      projectId: INT, (optional)
     *      memberId: INT, (optional)
     *      mhhpState: BOOL (optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
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

    /**  ?permissionId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
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
    }
}