const router = require('express').Router();
const controller = require('../controllers/users');

const { validateNewUserData, validateUserId } = require('../middleware/validators')

router.get('/', controller.getAllUsers);

router.get('/:userId', validateUserId, controller.getUserById);

router.post('/', validateNewUserData, controller.addNewUser);

router.delete('/:userId', validateUserId, controller.deleteUserById);

module.exports = {
    router
}
