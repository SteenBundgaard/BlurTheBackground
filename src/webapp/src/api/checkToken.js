const logger = require('./logger');

const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWTSecretKey, (err, decoded) => {
            if (err) {
                req.authorized = false;
            } else {
                req.authorized = true;
                logger.info(decoded.name);
            }     

            next();
        });
    } else {
        res.status(401).send();
    }
}

module.exports = checkToken;