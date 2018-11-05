const Member = require('../config/db_connection').Member;
var Project = require('../config/db_connection').Project;
const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;
const mw = require('../middlewares')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const qs = require('querystring');
const request = require('superagent');

module.exports = {

    /* ================= CRUD ================= */

    /*  localhost:4200/api/member/create
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
        if (!req.body.result) {
            Member
                .create(req.body)
                .then(member => {
                    member.memberPassword = null
                    req.body.result = member
                    next()
                })
                .catch(error => next(error));
        } else {
            res.status(400).send(['This email adress is already taken.', 'memberEmail'])
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
            .catch(error => next(error));
    },

    /*  localhost:4200/api/member/find_all --- ?memberId=id... (optional)
    *
    *  return: Array of member objects with given attributes.
    */
    findAll(req, res, next) {
        Member
            .findAll({
                order: sequelize.col('memberId'),
                where: req.query
            })
            .then(members => {
                req.body.result = members
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/member/find_one --- ?memberId=id... (optional)
     *
     *  return: Member object with given attributes.
     */
    findOne(req, res, next) {
        Member
            .findOne({where: req.query})
            .then(member => {
                req.body.result = member
                next()
            })
            .catch(error => next(error));
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
        Member
            .update(req.body, {
                where: req.query
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => next(error));
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
                    if (member.memberPassword === req.body.memberPassword) {
                        req.body.result = member
                        next()
                    }
                    else res.status(400).send('Email or password is incorrect.')
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
        Member
            .update({memberPassword: req.body.memberPassword}, {
                where: {memberEmail: req.body.memberEmail}
            })
            .then(isUpdated => {
                if (isUpdated[0] === 1) next()
                else res.status(400).send('No email found.')
            })
            .catch(error => next(error));
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

        // generate  "state" parameter
        const state = require('crypto').randomBytes(16).toString('base64')
        res.locals.github_state = state

        const githubAuthUrl =
            'https://github.com/login/oauth/authorize?' +
            qs.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                redirect_uri: process.env.SERVER_URL + ":" + process.env.PORT + "/api/member/github_callback",
                state: state,
                scope: 'user:email read:user'
            });


        const redirect = JSON.stringify(githubAuthUrl)

        req.body.result = redirect
        next()
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
        console.log(req.query);
        // ?code = 1823109312093
        const returnedState = req.query.state;
        const code = req.query.code;
        console.log("code ? " + code)

        if (!code) {
            return res.send({
                success: false,
                message: 'Error, no code'

            });
        }

        request
            .post('https://github.com/login/oauth/access_token')
            .send({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: code,
                redirect_uri: process.env.SERVER_URL + ":" + process.env.PORT + "/api/member/github_callback",
                state: returnedState
            })
            .set('Accept', 'application/json')
            .then(result => {
                //const data = result.body;
                //res.send(data)
                console.log('Your Access Token: ');
                console.log(result.body.access_token);
                req.access_token = result.body.access_token;
                console.log("body: \n", result.body)

                // Get the email
                request
                    .get('https://api.github.com/user/public_emails')
                    .set('Authorization', 'token ' + req.access_token)
                    .then(result => {
                        console.log("result: \n", result.body)
                        console.log("email: \n", result.body[0].email)
                        //console.log("pseudo: \n", result.body.login)
                        //console.log("nom: \n", result.body)

                        const email = result.body[0].email;

                        // Check is there is an existing user with this email
                        Member
                            .findOne({
                                where: {
                                    memberEmail: email,
                                    // TODO : rajouter isGithubAccount in BDa
                                    // memberStatus: {
                                    //     [Sequelize.Op.ne]: 0
                                    // }
                                }
                            })
                            .then(member => {
                                if (member) {

                                    // If the account is already link with github
                                    if (member.isLinkWithGithub) {

                                        req.body.result = member
                                        var payload = Object.assign({}, req.body.result.dataValues)
                                        payload.memberToken = jwt.sign(payload, process.env.JWT_SECRET, {
                                            expiresIn: 60 * 60 * 24 // expires in 24 hours
                                        });
                                        console.log("payload: ", payload)

                                        const redirect_url =
                                            process.env.SERVER_URL + ":" + process.env.CLIENT_PORT +
                                            '/login/' +
                                            member.memberEmail + "/" +
                                            payload.memberToken

                                        res.redirect(redirect_url);

                                    }
                                    // If the user is not yet link with github
                                    else {
                                        console.log("member \n", member)

                                        Member
                                            .update({memberIsLinkWithGithub: true}, {
                                                    where: {memberEmail: email}
                                                })

                                            .then(result => {
                                                if (result) { // if the member was updated

                                                    req.body.result = member
                                                    var payload = Object.assign({}, req.body.result.dataValues)
                                                    payload.memberToken = jwt.sign(payload, process.env.JWT_SECRET, {
                                                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                                                    });
                                                    console.log("payload: ", payload)

                                                    const redirect_url =
                                                        process.env.SERVER_URL + ":" + process.env.CLIENT_PORT +
                                                        '/login/' +
                                                        member.memberEmail + "/" +
                                                        payload.memberToken

                                                    res.redirect(redirect_url);

                                                }

                                            })
                                            .catch(error => next(error));
                                    }
                                }
                                // If there is no member with this email, we create it
                                else {

                                    // Get the pseudo, firstname and lastname
                                    request
                                        .get('https://api.github.com/user')
                                        .set('Authorization', 'token ' + req.access_token)
                                        .then(result => {

                                            const pseudo = result.body.login
                                            const fullname = result.body.name
                                            let firstname = " "
                                            let lastname = " "
                                            if (fullname != null) {
                                                firstname = fullname.split(' ').slice(0, -1).join(' ');
                                                lastname = fullname.split(' ').slice(-1).join(' ');
                                            }

                                            console.log("result: \n", result.body)
                                            console.log("pseudo: \n", result.body.login)
                                            //console.log("pseudo: \n", result.body.login)
                                            console.log("nom: \n", result.body.name)

                                            // Create the member
                                            Member
                                                .create({
                                                        memberEmail: email,
                                                        memberFirstname: firstname,
                                                        memberLastname: lastname,
                                                        memberPseudo: pseudo,
                                                        memberStatus: 1,
                                                        memberIsLinkWithGithub: true
                                                    
                                                })
                                                .then(member => {
                                                    if (member) {

                                                        req.body.result = member
                                                        var payload = Object.assign({}, req.body.result.dataValues)
                                                        payload.memberToken = jwt.sign(payload, process.env.JWT_SECRET, {
                                                            expiresIn: 60 * 60 * 24 // expires in 24 hours
                                                        });
                                                        console.log("payload: ", payload)

                                                        const redirect_url =
                                                            process.env.SERVER_URL + ":" + process.env.CLIENT_PORT +
                                                            '/login/' +
                                                            member.memberEmail + "/" +
                                                            payload.memberToken

                                                        res.redirect(redirect_url);

                                                    }
                                                    else res.status(400).send('The member was not created.')
                                                })
                                                .catch(error => next(error));

                                        })
                                        .catch(error => next(error));
                                }
                    })
                    .catch(error => next(error));

            })
    })
    .catch(error => next(error));

},


//console.log("First ? " + Db.state)
//console.log("second ? " +     returnedState)
// POST request
//if (Db.state === returnedState) {
// Remember from step 5 that we initialized
// If state matches up, send request to get access token
// the request module is used here to send the post request
// request
//     .post('https://github.com/login/oauth/access_token')
//     .send({
//         client_id: process.env.GITHUB_CLIENT_ID,
//         client_secret: process.env.GITHUB_CLIENT_SECRET,
//         code: code,
//         redirect_uri: process.env.SERVER_URL + ":" + process.env.PORT  + "/api/member/github_callback",
//         state: returnedState
//     })
//     .set('Accept', 'application/json')
//     .then(result => {
//         //const data = result.body;
//         //res.send(data)
//         console.log('Your Access Token: ');
//         console.log(result.body.access_token);
//         req.access_token = result.body.access_token;
//         console.log("body: \n", result.body)
//         request
//             .get('https://api.github.com/user/public_emails')
//             .set('Authorization', 'token ' + req.access_token)
//             .then( result => {
//                 console.log("result: \n", result.body)
//                 console.log("email: \n", result.body[0].email)
//                 //console.log("pseudo: \n", result.body.login)
//                     //console.log("nom: \n", result.body)
//
//                 const email = result.body[0].email;
//
//                 request
//                     .get('https://api.github.com/user')
//                     .set('Authorization', 'token ' + req.access_token)
//                     .then( result => {
//
//                         const pseudo = result.body.login
//                         const fullname = result.body.name
//                         let firstname = " "
//                         let lastname = " "
//                         if (name != null) {
//                             firstname = fullname.split(' ').slice(0, -1).join(' ');
//                             lastname = fullname.split(' ').slice(-1).join(' ');
//                         }
//
//                         console.log("result: \n", result.body)
//                         console.log("pseudo: \n", result.body.login)
//                         //console.log("pseudo: \n", result.body.login)
//                         console.log("nom: \n", result.body.name)
//
//                         // Check is there is an existing user with this email
//                         Member
//                             .findOne({
//                                 where: {
//                                     memberEmail: email,
//                                     // TODO : rajouter isGithubAccount in BDa
//                                     // memberStatus: {
//                                     //     [Sequelize.Op.ne]: 0
//                                     // }
//                                 }
//                             })
//                             .then(member => {
//                                 if (member) {
//
//                                     // If the account is already link with github
//
//                                     // If the user is not yet link with github
//                                     req.body.result = member
//                                     var payload = Object.assign({}, req.body.result.dataValues)
//                                     payload.memberToken = jwt.sign(payload, process.env.JWT_SECRET, {
//                                         expiresIn: 60 * 60 * 24 // expires in 24 hours
//                                     });
//                                     console.log("payload: ", payload)
//
//                                     const redirect_url =
//                                         'http://localhost:3000/login/' +
//                                         member.memberEmail + "/" +
//                                         payload.memberToken
//                                     res.redirect(redirect_url);
//
//                                     //next()
//
//                                 }
//                                 else res.status(400).send('There is no account with this email.')
//                             })
//                             .catch(error => next(error));
//
//
//
//                         result.send(
//                             "<p>You're logged in! Here's all your emails on GitHub: </p>" +
//                             result.body +
//                             '<p>Go back to <a href="/">log in page</a>.</p>'
//                         )
//                     })
//                     .catch(error => next(error));
//             })
//             .catch(error => next(error));
//
//
//                 // result.send(
//                 //     "<p>You're logged in! Here's all your emails on GitHub: </p>" +
//                 //     result.body +
//                 //     '<p>Go back to <a href="/">log in page</a>.</p>'
//                 // )
//     })
//     .catch(error => next(error));

// Redirects user to /user page so we can use
// the token to get some data.
//res.redirect('http://localhost:3000/home');


// }
// else {
//     // if state doesn't match up, something is wrong
//     // just redirect to homepage
//     res.redirect('/');
// }


}

