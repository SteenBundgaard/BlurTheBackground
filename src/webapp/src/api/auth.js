const express = require('express');
const passport = require('./passport');
const jwt = require('jsonwebtoken');
const logger = require('./logger');

var router = express.Router();

router.route('/')
    .post(function (req, res, next) {
        passport.authenticate('facebook-token', { session: false, scope : ['email'] }, function (err, user, info) {
            if (!user) {
                logger.info('Auhentication failed: ' + info);
                return res.send(401, 'User Not Authenticated');
            }

            const token = jwt.sign({
                id: user.id,
                name: user.name
            }, process.env.JWTSecretKey,
            {
                expiresIn: 60 * 15 
            });
            res.setHeader('x-auth-token', token);
            return res.status(200).send(JSON.stringify(req.user));
        })(req, res, next);
    });

module.exports = router;