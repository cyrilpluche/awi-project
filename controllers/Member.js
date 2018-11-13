const bcrypt = require('bcrypt');
const Member = require('../config/db_connection').Member;
const Project = require('../config/db_connection').Project;
const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;
const mw = require('../middlewares')
const jwt = require('jsonwebtoken');
// const qs = require('querystring');
const request = require('superagent');
const memberFilter = ['memberId', 'memberFirstname', 'memberLastname', 'memberPseudo', 'memberEmail', 'memberStatus']

module.exports = {

    /* ================= CRUD ================= */

    /**  localhost:4200/api/member/create
     *
     *  req.body = {
     *      memberFirstname = firstname,
     *      memberLastname = lastname,
     *      memberPseudo = pseudo,
     *      memberEmail = email,
     *      memberPassword = password,
     *      memberPicture = url, (optional)
     *      memberStatus = status,
     *      memberOauthGithub = url (optional)
     *  }
     *
     *  return: A new token specific for the member created.
     */
    create(req, res, next) {
        bcrypt.hash(req.body.memberPassword, 10, (err, hash) => {
            if (err) res.status(400).send('Member:create:bcrypt | ' + err)
            else {
                req.body.memberPassword = hash
                Member
                    .create(req.body)
                    .then(member => {
                        member.memberPassword = null
                        req.body.result = member
                        next()
                    })
                    .catch(error => res.status(400).send('Member:create | ' + error));
            }
        });
    },

    createOrNext(req, res, next) {
        if (!req.body.result) {
            bcrypt.hash(req.body.memberPassword, 10, (err, hash) => {
                if (err) res.status(400).send(err)
                else {
                    req.body.memberPassword = hash
                    Member
                        .create(req.body)
                        .then(member => {
                            member.memberPassword = null
                            req.body.result = member
                            next()
                        })
                        .catch(error => res.status(400).send(error));
                }
            })
        } else {
            next()
        }

    },

    /*  localhost:4200/api/member/find_all/:idProject
     *
     *  return: Array of member objects with given attributes.
     */
    findAllProjectMember(req, res, next) {
        Member
            .findAll({
                as: 'MemberhasprojectProjects',
                include: [{
                    model: Project, as: 'MemberhasprojectProjects',
                    through: {
                        where: {projectId: req.params.id}
                    },
                    required: true
                }],

            })
            .then(members => {
                req.body.result = members
                next()
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/member/find_all --- ?memberId=id... (optional)
    *
    *  return: Array of member objects with given attributes.
    */
    findAll(req, res, next) {
        Member
            .findAll({
                attributes: memberFilter,
                order: sequelize.col('memberId'),
                where: req.query
            })
            .then(members => {
                req.body.result = members
                next()
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/member/find_one --- ?memberId=id... (optional)
     *
     *  return: Member object with given attributes.
     */
    findOne(req, res, next) {
        Member
            .findOne({
                attributes: memberFilter,
                where: req.query
            })
            .then(member => {
                req.body.result = member
                next()
            })
            .catch(error => res.status(400).send(error));
    },

    findOneUpdatePassword (req, res, next) {
        Member
            .findOne({
                where: { memberId: req.query.memberId }
            })
            .then(member => {
                bcrypt.compare(req.query.memberPassword, member.memberPassword, (err, res) => {
                    if (err) {
                        console.log('Member:findOneSignIn | ' + err)
                        next()
                    }
                    else {
                        try {
                            console.log(res)
                            if (res) {
                                req.body.result = member
                                next()
                            }
                            else res.status(400).send('Email or password is incorrect.')
                        } catch (err) {
                            res.status(400).send('Email or password is incorrect.')
                        }
                    }
                });
            })
            .catch(error => res.status(400).send(error));
    },

    findOneSignup (req, res, next) {
        Member
            .findOne({
                where: { memberEmail: req.query.memberEmail }
            })
            .then(member => {
                if (member) res.status(400).send(['This email adress is already taken.', 'memberEmail'])
                else {
                    Member
                        .findOne({
                            where: { memberPseudo: req.query.memberPseudo }
                        })
                        .then(member => {
                            if (member) res.status(400).send(['This pseudo is already taken.', 'memberPseudo'])
                            else {
                                next()
                            }
                        })
                        .catch(error => res.status(400).send(error));
                }
            })
            .catch(error => res.status(400).send(error));
    },

    findOneInvitation (req, res, next) {
        Member
            .findOne({
                where: { memberPseudo: req.body.memberPseudo }
            })
            .then(member => {
                console.log(member)
                if (member) res.status(400).send(['This pseudo is already taken.', 'memberPseudo'])
                else next()
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     *  return: Take the member with the decoded arguments
     */
    findOneForLog(req, res, next) {
        Member
            .findOne({
                where: {
                    [Sequelize.Op.or]: [
                        { memberEmail: req.decoded.memberEmail },
                        { memberPseudo: req.decoded.memberPseudo }
                    ]
                }
            })
            .then(member => {
                if (member) next()
                else {
                    res.status(400).send('Member:findOneForLog: Failed to decode token.')
                }
            })
            .catch(error => res.status(400).send('Member:findOneForLog | ' + error));
    },

    /*  localhost:4200/api/member/update/2
     *
     *  req.body = {
     *      memberFirstname = firstname, (optional)
     *      memberLastname = lastname, (optional)
     *      memberPseudo = pseudo, (optional)
     *      memberEmail = email, (optional)
     *      memberPassword = password, (optional)
     *      memberPicture = url, (optional)
     *      memberStatus = status, (optional)
     *      memberOauthGithub = url (optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        if (req.body.memberPassword) {
            bcrypt.hash(req.body.memberPassword, 10, (err, hash) => {
                if (err) res.status(400).send('Member:update | ' + err)
                else {
                    req.body.memberPassword = hash
                    Member
                        .update(req.body, {
                            where: req.query
                        })
                        .then(isUpdated => {
                            req.body.result = isUpdated[0] === 1
                            next()
                        })
                        .catch(error => res.status(400).send('Member:update | ' + error));
                }
            });
        } else {
            Member
                .update(req.body, {
                    where: req.query
                })
                .then(isUpdated => {
                    req.body.result = isUpdated[0] === 1
                    next()
                })
                .catch(error => res.status(400).send('Member:update | ' + error));
        }


    },

    /*  localhost:4200/api/member/delete/5
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Member
            .destroy({
                where: {
                    memberId: req.params.id
                }
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error));
    },

    /* ================= METHODS ================= */

    /*  localhost:4200/api/member/sign_in
     *
     *  req.body = {
     *      memberPseudo = memberEmail,
     *      memberPassword = password
     *  }
     *
     *  return: Find the user and connect him if credentials matched.
     */
    findOneSignIn(req, res, next) {
        Member
            .findOne({
                where: {
                    memberEmail: req.body.memberEmail,
                    memberStatus: {
                        [Sequelize.Op.ne]: 0
                    }
                }
            })
            .then(member => {
                if (member && member.memberEmail === req.body.memberEmail) {
                    try {
                        bcrypt.compare(req.body.memberPassword, member.memberPassword, (err, res) => {
                            if (err) console.log('Member:findOneSignIn | ' + err)
                            else {
                                console.log(res)
                                if (res) {
                                    member.memberPassword = null
                                    req.body.result = member
                                    next()
                                }
                                next()
                            }
                        });
                    } catch (err) {
                        res.status(400).send('Email or password is incorrect.')
                    }
                }
                else res.status(400).send('Email or password is incorrect.')
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/member/sign_in
     *
     *  return: A new token of the user.
     */
    sign(req, res, next) {
        next()
    },

    /*  localhost:4200/api/member/sign_up
     *
     *  return: The member decrypted with the token.
     */
    signIn(req, res, next) {
        try {
            if (req.decoded.memberStatus !== 0) {
                req.decoded.iat = null
                req.decoded.exp = null
                req.body.result = {member: req.decoded}
                next()
            } else {
                res.status(400).send('This account is not confirmed.')
            }

        } catch (err) {
            res.status(500).send(err)
        }
    },

    /*  localhost:4200/api/member/sign_up
     *
     *  return: The member decrypted with the token.
     */
    isFound(req, res, next) {
        if (req.body.result !== null) {
            req.body = {memberPassword: req.body.memberPassword}
            delete req.query['memberPassword']
            next()
        }
        else next('Wrong password')
    },

    validateAccount(req, res, next) {
        if (req.decoded) {
            req.query = {
                memberId: req.decoded.memberId,
                memberEmail: req.decoded.memberEmail
            }
            req.body = {
                memberStatus: 1
            }
            next()
        }
        else {
            res.status(400).send('Failed to decrypt the token')
        }
    },

    /*
     *  return: A boolean. true = Updated, false = Not updated.
     */
    resetPassword(req, res, next) {
        bcrypt.hash(req.body.memberPassword, 10, (err, hash) => {
            if (err) res.status(400).send('Member:resetPassword | ' + err)
            else {
                Member
                    .update({memberPassword: hash}, {
                        where: {memberEmail: req.body.memberEmail}
                    })
                    .then(isUpdated => {
                        if (isUpdated[0] === 1) next()
                        else res.status(400).send('No email found.')
                    })
                    .catch(error => next(error));
            }
        });
    },

    /*  localhost:4200/api/member/invitation_token?memberToken=token
     *
     *  return: Decrypt the token of an invitation and put it in the query.
     */
    tokenToQuery(req, res, next) {
        try {
            req.query = {memberEmail: req.decoded.memberEmail}
            next()
        } catch (err) {
            res.status(500).send('Informations missing from the token')
        }
    },

    /*  localhost:4200/api/member/invitation_token?memberToken=token
     *
     *  return: Check if the user exist for an invitation.
     */
    decodedToResult(req, res, next) {
        try {
            if (req.body.result) {
                // The user exist
                req.body.result = {
                    isExist: true,
                    projectId: req.decoded.projectId,
                    memberId: req.body.result.memberId,
                    memberEmail: req.body.result.memberEmail,
                    memberStatus: req.body.result.memberStatus,
                }
                next()
            } else {
                // The user don't exist
                req.body.result = {
                    isExist: false,
                    memberEmail: req.decoded.memberEmail,
                    projectId: req.decoded.projectId
                }
                next()
            }
        } catch (err) {
            res.status(500).send('Failed to check if the user exist')
        }
    },

    // -----------------------
    // -------------------------- GITHUB ----------------------------
    // -----------------------



    /**  localhost:4200/api/member/sign_in_with_github
     *
     *  return: a string, the github url authentification
     */
    sign_in_with_github(req, res, next) {
        const client_id = 'client_id=' + process.env.GITHUB_CLIENT_ID
        const githubAuthUrl = 'https://github.com/login/oauth/authorize?' + client_id

        req.body.result = JSON.stringify(githubAuthUrl)
        next()
    },

    github_redirection (req, res, next) {
        if (process.env.NODE_ENV === 'development') {
            res.redirect(process.env.SERVER_URL + ':' + process.env.CLIENT_PORT + '/github_verification/' + req.body.result.memberToken)
        } else {
            res.redirect(process.env.SERVER_URL + '/github_verification/' + req.body.result.memberToken)
        }
    },

    /**  localhost:4200/api/member/github_callback
     *
     *  this route is called after the success authentification of an user on github website.
     *   Return in body : a member
     *  3 cases :
     *  - the user already exist and he is not link with github : put isLinkWithGithub = true
     *  - the user already exist and he is link with github : we simply return the user
     *  - the user doesn't : we create the user with his info and isLinkWithGithub = true
     */
    github_callback(req, res, next) {
        const code = req.query.code;

        request
            .post('https://github.com/login/oauth/access_token')
            .send({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: code
            })
            .set('Accept', 'application/json')
            .then(result => {
                req.body.result = {
                    memberGithubToken: result.body.access_token,
                    memberGithubCode: code
                };
                next()
            })
            .catch(err => {
                res.status(400).send(err)
            })
    },

    github_get_user (req, res, next) {
        request
            .get('https://api.github.com/user')
            .set('Authorization', 'token ' + req.body.result.memberGithubToken)
            .then(user => {
                req.body.result.memberPseudo = user.body.login
                next()
            })
            .catch(err => {
                res.status(400).send(err)
            })
    },

    find_one_github (req, res, next) {
        let defaultData = {
            memberFirstname: 'unknow',
            memberLastname: 'unknow',
            memberPseudo: req.body.result.memberPseudo,
            memberStatus: 1,
            memberIsLinkWithGithub: true
        }
        Member
            .findOrCreate({where: {memberPseudo: req.body.result.memberPseudo}, defaults: defaultData})
            .then((user, created) => {
                req.body.result = user[0]
                next()
            })
            .catch(err => {
                res.status(400).send(err)
            })
    },

    cryptPasswordQuery (req, res, next) {
        if (req.query.memberPassword) {
            bcrypt.hash(req.query.memberPassword, 10, (err, hash) => {
                if (err) res.status(400).send('Member:create:bcrypt | ' + err)
                else {
                    req.query.memberPassword = hash
                    next()
                }
            })
        }
        else next()
    }

}

