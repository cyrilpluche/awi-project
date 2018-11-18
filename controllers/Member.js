const bcrypt = require('bcrypt');
const Member = require('../config/db_connection').Member;
const Project = require('../config/db_connection').Project;
const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;
const cloudinary = require('cloudinary');
const request = require('superagent');
const memberFilter = ['memberId', 'memberFirstname', 'memberLastname', 'memberPseudo', 'memberEmail', 'memberStatus', 'memberPicture']
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {

    /* ================= MEMBER CONTROLLER ================= */

    /**
     * @typedef Member
     * @property {integer} memberId.required
     * @property {string} memberFirstname
     * @property {string} memberLastname
     * @property {string} memberFirstname
     * @property {string} memberPseudo
     * @property {string} memberEmail
     * @property {string} memberPassword
     * @property {string} memberPicture
     * @property {integer} memberStatus
     * @property {boolean} memberIsLinkWithGithub
     */

    /**
     * This function create a new member.
     * @route POST /api/member/create
     * @group Member - Operations about members.
     * @param {string} memberFirstname
     * @param {string} memberLastname
     * @param {string} memberFirstname
     * @param {string} memberPseudo
     * @param {string} memberEmail
     * @param {string} memberPassword.optional
     * @param {string} memberPicture.optional
     * @param {integer} memberStatus
     * @param {boolean} memberIsLinkWithGithub.optional
     * @returns {string} 200 - A new token specific for the member created.
     * @returns {Error}  400 - Member:create | error message
     * @returns {Error}  500 - error
     *
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
            Member
                .create(req.body)
                .then(member => {
                    member.memberPassword = null
                    req.body.result = member
                    next()
                })
                .catch(error => res.status(400).send(error));
        } else {
            next()
        }

    },

    /**
     * This function find all the member of a project.
     * @route GET /api/member/find_all/:idProject
     * @group Member - Operations about members.
     * @returns {Array.<Member>} 200 - An array of the project members.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find all the member matching order by id.
     * @route GET /api/member/find_all/:idProject
     * @group Member - Operations about members.
     * @param {string} memberFirstname.optional
     * @param {string} memberLastname.optional
     * @param {string} memberFirstname.optional
     * @param {string} memberPseudo.optional
     * @param {string} memberEmail.optional
     * @param {integer} memberStatus
     * @param {boolean} memberIsLinkWithGithub.optional
     * @returns {Array.<Member>} 200 - An array of all the members matching.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find the first member matching.
     * @route GET /api/member/find_one
     * @group Member - Operations about members.
     * @param {integer} memberId.optional
     * @param {string} memberFirstname.optional
     * @param {string} memberLastname.optional
     * @param {string} memberFirstname.optional
     * @param {string} memberPseudo.optional
     * @param {string} memberEmail.optional
     * @param {integer} memberStatus
     * @returns {Array.<Member>} 200 - An array of all the members matching.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find the member and update his password.
     * @route GET /api/member/update_password
     * @group Member - Operations about members.
     * @param {integer} memberId.required
     * @param {password} memberPassword.required
     * @returns {Member.model} 200 - The member updated
     * @returns {Error}  400 - Member:findOneUpdatePassword | error message
     * @returns {Error}  500 - error
     *
     */
    findOneUpdatePassword (req, res, next) {
        Member
            .findOne({
                where: { memberId: req.query.memberId }
            })
            .then(member => {
                bcrypt.compare(req.query.memberPassword, member.memberPassword, (err, res) => {
                    if (err) {
                        console.log('Member:findOneUpdatePassword | ' + err)
                        next()
                    }
                    else {
                        try {
                            if (res) {
                                req.body.result = member
                                next()
                            }
                            else res.status(400).send('Password is incorrect.')
                        } catch (err) {
                            res.status(400).send('Member not found.')
                        }
                    }
                });
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     * This function find the member and update his status.
     * @route GET /api/member/sign_up
     * @group Member - Operations about members.
     * @param {string} memberFirstname
     * @param {string} memberLastname
     * @param {string} memberFirstname
     * @param {string} memberPseudo
     * @param {string} memberEmail
     * @param {string} memberPassword.optional
     * @param {string} memberPicture.optional
     * @param {integer} memberStatus
     * @param {boolean} memberIsLinkWithGithub.optional
     * @returns {Array.<Member>} 200 - An array of all the members matching.
     * @returns {Error}  400 - This email address is already taken.
     * @returns {Error}  400 - This pseudo is already taken.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findOneSignup (req, res, next) {
        Member
            .findOne({
                where: { memberEmail: req.query.memberEmail }
            })
            .then(member => {
                if (member) res.status(400).send(['This email address is already taken.', 'memberEmail'])
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

    /**
     * This function find a member invited.
     * @route GET /api/member/find_one_invitation
     * @group Member - Operations about members.
     * @param {string} memberPseudo
     * @returns {Member} 200 - The member matching
     * @returns {Error}  400 - This pseudo is already taken.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findOneInvitation (req, res, next) {
        Member
            .findOne({
                where: { memberPseudo: req.body.memberPseudo }
            })
            .then(member => {
                if (member) res.status(400).send(['This pseudo is already taken.', 'memberPseudo'])
                else next()
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     * body:
     * memberEmail
     * memberPassword
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

    /**
     * This function update a member.
     * @route PUT /api/member/update
     * @group Member - Operations about members.
     * @param {Member.model} member.required
     * @returns {boolean} 200 - Boolean, true if the member was updated.
     * @returns {Error}  400 - Member:update | error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function delete a member.
     * @route DELETE /api/member/delete/:id
     * @group Member - Operations about members.
     * @returns {boolean} 200 - Boolean, true if the member was deleted.
     * @returns {Error}  500 - error
     *
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


    /**
     * This function find the user and connect him if credentials matched.
     * @route POST /api/member/sign_in
     * @group Member - Operations about members.
     * @param {string} memberPseudo.body.required
     * @param {string} memberPassword.body.required
     * @returns {Member.model} 200 - The member find.
     * @returns {Error}  400 - Member:findOneSignIn | error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function return a member decrypted with the token.
     * @route GET /api/member/is_logged
     * @group Member - Operations about members.
     * @param {Member.model} member.body.required
     * @returns {Member.model} 200 - The member find.
     * @returns {Error}  400 - This account is not confirmed.
     * @returns {Error}  500 - error
     *
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

    /*  body:
     *  Member
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

    /**
     * This function return a member decrypted with the token.
     * @route GET /api/member/validate_account
     * @group Member - Operations about members.
     * @param {Member.model} member.body.required
     * @returns {Error}  400 - Failed to decrypt the token.
     * @returns {Error}  500 - error
     *
     */
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
            res.status(400).send('Failed to decrypt the token.')
        }
    },

   /**
     * This function find the user and connect him if credentials matched.
     * @route POST /api/member/password_forgotten
     * @group Member - Operations about members.
     * @param {string} memberEmail.body.required
     * @returns {boolean} 200 - Boolean, true is the password was updated.
     * @returns {Error}  400 - Member:resetPassword | error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function decrypt the token of an invitation and put it in the query.
     * @route GET /api/member/decrypt_invitation
     * @group Member - Operations about members.
     * @returns {Error}  500 - Information missing from the token
     *
     */
    tokenToQuery(req, res, next) {
        try {
            req.query = {memberEmail: req.decoded.memberEmail}
            next()
        } catch (err) {
            res.status(500).send('Information missing from the token')
        }
    },

    /**
     * This function check if the user exist for an invitation.
     * @route GET /api/member/decrypt_invitationn
     * @group Member - Operations about members.
     * @returns {Error}  500 - Information missing from the token
     *
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


    /**
     * This function redirecy the user on GitHub to connect.
     * @route GET /api/member/sign_in_with_github
     * @group Member - Operations about members.
     * @returns {string} 200 -  The github url authentification.
     * @returns {Error}  500 - Information missing from the token
     *
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

    /*  localhost:4200/api/member/github_callback
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

    /*
     * Get the user info from github
     */
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

    /*
     * Req: member
     * search if the member already exist. If not, create him.
     * Return: put the user in the req.body
     */
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

    storeProfilePicture (req, res, next) {
        let picture = req.files.image
        cloudinary.v2.uploader.upload_stream(
            {
                public_id: "profile_pictures/" + req.query.memberId,
                transformation: [
                    {width: 250, crop: "scale"},
                    {quality: "auto"}
                ]
            },
            function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    Member
                        .update(
                            {memberPicture: result.url},
                            {where: req.query}
                        )
                        .then(Member => {
                            req.body.result = true
                            next()
                        })
                        .catch((error) => res.status(400).send(error));
                }
            }).end(picture.data)
    }

}

