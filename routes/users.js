const router = require('express').Router();
const { STATUS } = require('../constants');
const {
    getAllUsers,
    getUserById,
    addNewUser,
    deleteUserById
} = require('../services/userServices');

router.get('/', (req, resp) => {
    const users = getAllUsers();

    resp
    .json(users);
});

router.get('/:userId', (req, resp) => {
    const user = getUserById(req.params.userId);

    resp
    .json(user);
});

router.post('/', (req, resp) => {
    const { username, email } = req.body;

    addNewUser(username, email);
    resp.send(STATUS.Created);
});

router.delete('/:userId', (req, resp) => {

    deleteUserById(req.params.userId);
    resp.send(STATUS.NoContent);
});


module.exports = {
    router
}
