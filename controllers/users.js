const {storage} = require('config');

const services = require(`../services/users_${storage.type}`);
const { STATUS } = require('../constants');

function getAllUsers(_req, resp) {
    const users = services.getAllUsers();
    resp.json(users);
}

function getUserById(req, resp) {
    const user = services.getUserById(req.params.userId);

    if(user) {
        resp.json(user);
    } else {
        resp.send(STATUS.NotFound, { error: `User is not found` })
    }
}

function addNewUser(req, resp){
    const { username, email } = req.body;
    const newUser = services.addNewUser(username, email);

    resp.send(STATUS.Created, newUser);
}

function deleteUserById(req, resp){
    const user = services.getUserById(req.params.userId);

    if(user) {
        services.deleteUserById(req.params.userId);
        resp.send(STATUS.NoContent);
    } else {
        resp.send(STATUS.NotFound, { error: `User is not found` });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    deleteUserById
}