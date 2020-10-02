const store = require('./store');
const express = require('express');
const router = express.Router();
const logger = require('./logger');

router.route('/')
    .get(function (req, res, next) {
        const processed = store.get(req.token);
        if (processed) {
            store.clear();
            logger.info(`processing done`)
            res.status(processed.status).send(processed);
        }
        else {
            logger.info(`processing not done`)
            res.sendStatus(204);
        }
    });

module.exports = router;