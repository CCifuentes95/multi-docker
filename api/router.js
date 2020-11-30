const express = require('express');
const router = express.Router();

//Postgres Client
const { pgClient } = require('./pgClient');


//Redis Client
const { redisClient, redisPublisher } = require('./redisClient');


router.get('/', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
});

router.post('/', (req, res) => {
    const index = req.body.index;

    if (parseInt(index) > 40) {
        return res.status(422).send('Index too high')
    }

    redisClient.hset('values', index, 'Nothing yet :(');
    redisPublisher.publish('insert', index);
    pgClient.query('insert into values(number) values($1)', [index]);

    res.send({ working: true })
});

router.get('/current', (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

module.exports = router;