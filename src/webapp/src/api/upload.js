const { performance } = require('perf_hooks');

const express = require('express');
const logger = require('./logger');
const axios = require('axios');

function queue() {
    var self = this;
    this.promise = new Promise(function (resolve, reject) {
        self.resolve = resolve
    })

    this.enqueue = action => this.promise.then(r => {
        self.promise = new Promise(function (resolve, reject) {
            action(resolve);
        })
    });

    this.dequeue = () => this.resolve();
}
const uploadQueue = new queue()
uploadQueue.dequeue();

async function pollImageService() {
    let max = 60;
    while (max > 0) {
        await sleep(10000);
        max--;
        try {
            const result = await axios.get(imageService + '/processed');
            return { data: result.data };
        } catch (error) {       
        }
    }
    return Promise.reject('processing failed');
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

const router = express.Router();
const imageService = process.env.ImageService;

router.route('/')
    .post(function (req, res, next) {
        logger.info('uploading');
        const t0 = performance.now();
        uploadQueue.enqueue(dequeue => {
            const t1 = performance.now();
            logger.info(`processing (time in queue was ${t1 - t0})`);
            axios.post(imageService + '/unprocessed', req.body.image, { headers: { 'Content-Type': 'plain/text' }, params: { downscale: !req.authorized } })
                .then(serviceRes => pollImageService())
                .then(serviceRes => res.status(200).send({ image: 'data:image/jpg;base64,' + serviceRes.data }))
                .catch((error) => {
                    logger.error(JSON.stringify(error))
                    next(error);
                })
                .finally(() => {
                    dequeue();
                    const t2 = performance.now();
                    logger.info(`done (processing time was ${t2 - t1})`);
                });
        });
    });

export default router;