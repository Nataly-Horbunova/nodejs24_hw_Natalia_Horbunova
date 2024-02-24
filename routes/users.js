const router = require('express').Router();
const { STATUS } = require('../constants');
const {
    getAllUsers,
    getUserById,
    addNewUser,
    deleteUserById
} = require('../services/userServices');

const { validateNewUserData, validateUserId } = require('../middleware/validators')

router.get('/', (_req, resp) => {
    const users = getAllUsers();
    resp.json(users);
});

router.get('/:userId', validateUserId, (req, resp) => {
    const user = getUserById(req.params.userId);

    if(user) {
        resp.json(user);
    } else {
        resp.send(STATUS.NotFound, { error: `User is not found` })
    }
});

router.post('/', validateNewUserData, (req, resp) => {
    const { username, email } = req.body;
    const newUser = addNewUser(username, email);
    resp.send(STATUS.Created, newUser);
});

router.delete('/:userId', validateUserId, (req, resp) => {
    const user = getUserById(req.params.userId);

    if(user) {
        deleteUserById(req.params.userId);
        resp.send(STATUS.NoContent);
    } else {
        resp.send(STATUS.NotFound, { error: `User is not found` });
    }
});

module.exports = {
    router
}
