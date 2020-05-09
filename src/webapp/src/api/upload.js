const express = require('express');
const logger = require('./logger');

var router = express.Router();

router.route('/')
    .post(function (req, res, next) {
        logger.info('uploading');
        return res.status(200);
    });

module.exports = router;