const router = require('express').Router();

router.get('/', (req, resp) => {
    resp.send('get users');
});

router.get('/:userId', (req, resp) => {
    resp.send('get user');
});

router.post('/', (req, resp) => {
    resp.send(201, 'post user');
});

router.delete('/:userId', (req, resp) => {
    resp.send(204);
});

module.exports = {
    router
}
